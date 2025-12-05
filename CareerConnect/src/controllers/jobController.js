const Job = require('../models/Job');
const Assessment = require('../models/Assessment');
const User = require('../models/User');

// Jobs page
exports.jobsPage = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });
    let filter = {};

    if (assessment) {
      filter.careerPath = assessment.recommendedCareer;
    }

    const jobs = await Job.find(filter).limit(limit).skip(skip).sort({ postedAt: -1 });

    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limit);

    const user = await User.findById(req.user.id);
    const savedJobIds = user.savedJobs || [];

    res.render('jobs/jobs-list', {
      title: 'Job Opportunities - CareerConnect',
      jobs,
      currentPage: page,
      totalPages,
      recommendedCareer: assessment?.recommendedCareer || 'All Careers',
      savedJobIds: savedJobIds.map((id) => id.toString()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading jobs',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Job detail page
exports.jobDetail = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Job not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const user = await User.findById(req.user.id);
    const isSaved = user.savedJobs?.includes(jobId);

    res.render('jobs/job-detail', {
      title: `${job.title} at ${job.company} - CareerConnect`,
      job,
      isSaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading job',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Save job
exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user.savedJobs) {
      user.savedJobs = [];
    }

    if (user.savedJobs.includes(jobId)) {
      user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    await Job.findByIdAndUpdate(jobId, {
      $addToSet: { savedBy: req.user.id },
    });

    res.json({ success: true, message: 'Job saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving job' });
  }
};

// Saved jobs page
exports.savedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobIds = user.savedJobs || [];

    const jobs = await Job.find({ _id: { $in: jobIds } });

    res.render('jobs/saved-jobs', {
      title: 'Saved Jobs - CareerConnect',
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading saved jobs',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};
