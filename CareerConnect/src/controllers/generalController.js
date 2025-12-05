const User = require('../models/User');
const Assessment = require('../models/Assessment');
const CommunityPost = require('../models/CommunityPost');
const Job = require('../models/Job');
const Notification = require('../models/Notification');

// Home page
exports.homePage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let assessment = null;
    let recommendedCareer = null;

    if (user.role === 'student') {
      assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });
      if (assessment) {
        recommendedCareer = assessment.recommendedCareer;
      }
    }

    res.render('home', {
      title: 'Home - CareerConnect',
      user,
      recommendedCareer,
      isStudent: user.role === 'student',
      isMentor: user.role === 'mentor',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading home page',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Student dashboard
exports.studentDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });

    let stats = {
      assessmentsTaken: 0,
      questionsAsked: 0,
      jobsSaved: 0,
      resumesCreated: 0,
    };

    if (assessment) {
      stats.assessmentsTaken = await Assessment.countDocuments({ studentId: req.user.id });
    }

    stats.questionsAsked = await CommunityPost.countDocuments({ studentId: req.user.id });
    stats.jobsSaved = user.savedJobs ? user.savedJobs.length : 0;

    res.render('dashboard/student-dashboard', {
      title: 'Student Dashboard',
      user,
      assessment,
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading dashboard',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Mentor dashboard
exports.mentorDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const mentorSpecialization = user.specialization;

    const questionsCount = await CommunityPost.countDocuments({ careerPath: mentorSpecialization });
    const answersCount = await CommunityPost.aggregate([
      {
        $match: { careerPath: mentorSpecialization },
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

    const unreadNotifications = await Notification.countDocuments({
      recipientId: req.user.id,
      read: false,
    });

    const stats = {
      questionsForSpecialization: questionsCount,
      answersGiven: answersCount.length > 0 ? answersCount[0].total : 0,
      unreadNotifications,
    };

    res.render('dashboard/mentor-dashboard', {
      title: 'Mentor Dashboard',
      user,
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading dashboard',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Profile page
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.render('profile', {
      title: 'Profile - CareerConnect',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading profile',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, bio, specialization, yearsOfExperience } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        bio,
        specialization,
        yearsOfExperience,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error updating profile',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};
