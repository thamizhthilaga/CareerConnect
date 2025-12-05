const CommunityPost = require('../models/CommunityPost');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Assessment = require('../models/Assessment');

// Community forum page
exports.communityPage = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    let filter = {};

    // If mentor, show only questions related to their specialization
    const user = await User.findById(req.user.id);
    if (user.role === 'mentor' && user.specialization) {
      filter.careerPath = user.specialization;
    }

    const posts = await CommunityPost.find(filter)
      .populate('studentId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const totalPosts = await CommunityPost.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    res.render('community/forum', {
      title: 'Community Forum - CareerConnect',
      posts,
      currentPage: page,
      totalPages,
      user,
      isMentor: user.role === 'mentor',
      isStudent: user.role === 'student',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading community forum',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Ask question page
exports.askQuestionPage = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });

    res.render('community/ask-question', {
      title: 'Ask a Question - CareerConnect',
      careerPath: assessment?.recommendedCareer || '',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading question form',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Submit question
exports.submitQuestion = async (req, res) => {
  try {
    const { title, description, careerPath } = req.body;

    if (!title || !description || !careerPath) {
      return res.status(400).render('error', { 
        title: '400 - Bad Request',
        message: 'All fields are required',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const post = new CommunityPost({
      studentId: req.user.id,
      careerPath,
      title,
      description,
    });

    await post.save();

    res.redirect(`/community/post/${post._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error submitting question',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Post detail page
exports.postDetail = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await CommunityPost.findByIdAndUpdate(
      postId,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('studentId', 'fullName email');

    if (!post) {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Post not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const user = await User.findById(req.user.id);

    res.render('community/post-detail', {
      title: `${post.title} - CareerConnect`,
      post,
      user,
      isMentor: user.role === 'mentor',
      isStudent: user.role === 'student',
      isAuthor: post.studentId._id.toString() === req.user.id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading post',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).render('error', { 
        title: '400 - Bad Request',
        message: 'Comment cannot be empty',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const user = await User.findById(req.user.id);
    const post = await CommunityPost.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            authorId: req.user.id,
            authorName: user.fullName,
            authorRole: user.role,
            content,
          },
        },
      },
      { new: true }
    );

    // Create notification for post author
    if (post.studentId.toString() !== req.user.id) {
      const notification = new Notification({
        recipientId: post.studentId,
        senderId: req.user.id,
        type: 'comment',
        title: `New reply to your question`,
        message: `${user.fullName} replied to "${post.title}"`,
        relatedId: post._id,
      });
      await notification.save();
    }

    res.redirect(`/community/post/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error adding comment',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Mentor profile
exports.mentorProfile = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await User.findById(mentorId);

    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Mentor not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const answersCount = await CommunityPost.aggregate([
      {
        $match: { careerPath: mentor.specialization },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $size: '$comments',
            },
          },
        },
      },
    ]);

    res.render('community/mentor-profile', {
      title: `${mentor.fullName}'s Profile - CareerConnect`,
      mentor,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor',
      answersCount: answersCount.length > 0 ? answersCount[0].total : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading mentor profile',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Get notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error loading notifications' });
  }
};

// Mark notification as read
exports.markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating notification' });
  }
};
