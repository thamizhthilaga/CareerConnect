const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
const { authenticateToken, checkRole } = require('../middleware/auth');

router.get('/home', authenticateToken, generalController.homePage);
router.get('/student-dashboard', authenticateToken, checkRole('student'), generalController.studentDashboard);
router.get('/mentor-dashboard', authenticateToken, checkRole('mentor'), generalController.mentorDashboard);
router.get('/profile', authenticateToken, generalController.profile);
router.post('/profile', authenticateToken, generalController.updateProfile);

module.exports = router;
