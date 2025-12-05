const LearningModule = require('../models/LearningModule');
const Assessment = require('../models/Assessment');
const { getCareerDetails } = require('../utils/helpers');

// Learning page
exports.learningPage = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });

    if (!assessment) {
      return res.status(400).render('error', {
        message: 'Please complete the assessment first',
      });
    }

    const career = assessment.recommendedCareer;
    const careerDetails = getCareerDetails(career);
    const modules = await LearningModule.find({ careerPath: career });

    res.render('learning/learning-path', {
      title: 'Learning Path - CareerConnect',
      career: careerDetails,
      modules,
      careerPath: career,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading learning path',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Module detail page
exports.moduleDetail = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await LearningModule.findById(moduleId);

    if (!module) {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Module not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    res.render('learning/module-detail', {
      title: `${module.title} - CareerConnect`,
      module,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading module',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Roadmap page
exports.roadmapPage = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });

    if (!assessment) {
      return res.status(400).render('error', {
        message: 'Please complete the assessment first',
      });
    }

    const careerDetails = getCareerDetails(assessment.recommendedCareer);

    res.render('learning/roadmap', {
      title: 'Career Roadmap - CareerConnect',
      career: careerDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading roadmap',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};
