const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { authenticateToken, checkRole } = require('../middleware/auth');

router.get('/assessment', authenticateToken, checkRole('student'), assessmentController.assessmentPage);
router.post('/assessment', authenticateToken, checkRole('student'), assessmentController.submitAssessment);
router.get('/results', authenticateToken, assessmentController.resultsPage);
router.get('/history', authenticateToken, checkRole('student'), assessmentController.assessmentHistory);

module.exports = router;
