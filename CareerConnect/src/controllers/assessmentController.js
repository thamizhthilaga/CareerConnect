const Assessment = require('../models/Assessment');
const { calculateCareerMatch, getCareerDetails } = require('../utils/helpers');

// Assessment page
exports.assessmentPage = (req, res) => {
  res.render('assessment/assessment', {
    title: 'Career Assessment - CareerConnect',
    user: req.user || null,
    isStudent: req.user?.role === 'student',
    isMentor: req.user?.role === 'mentor'
  });
};

// Submit assessment
exports.submitAssessment = async (req, res) => {
  try {
    const { question1, question2, question3, question4 } = req.body;

    const answers = [question1, question2, question3, question4];
    const recommendedCareer = calculateCareerMatch(answers);

    // Check if assessment already exists
    let assessment = await Assessment.findOne({ studentId: req.user.id });

    if (assessment) {
      // Update existing assessment
      assessment.answers = { question1, question2, question3, question4 };
      assessment.recommendedCareer = recommendedCareer;
      assessment.completedAt = new Date();
      await assessment.save();
    } else {
      // Create new assessment
      assessment = new Assessment({
        studentId: req.user.id,
        answers: { question1, question2, question3, question4 },
        recommendedCareer,
      });
      await assessment.save();
    }

    res.redirect(`/assessment/results?career=${encodeURIComponent(recommendedCareer)}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error submitting assessment',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Results page
exports.resultsPage = async (req, res) => {
  try {
    const career = req.query.career;

    if (!career) {
      return res.status(400).render('error', { 
        title: '400 - Bad Request',
        message: 'Career not specified',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const careerDetails = getCareerDetails(career);

    if (!careerDetails) {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Career not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });

    res.render('assessment/results', {
      title: 'Assessment Results - CareerConnect',
      career: careerDetails,
      assessment,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading results',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Get assessment history
exports.assessmentHistory = async (req, res) => {
  try {
    const assessments = await Assessment.find({ studentId: req.user.id }).sort({ createdAt: -1 });

    res.render('assessment/history', {
      title: 'Assessment History - CareerConnect',
      assessments,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading assessment history',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};
