const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const { authenticateToken, checkRole } = require('../middleware/auth');

router.get('/path', authenticateToken, checkRole('student'), learningController.learningPage);
router.get('/module/:moduleId', authenticateToken, learningController.moduleDetail);
router.get('/roadmap', authenticateToken, checkRole('student'), learningController.roadmapPage);

module.exports = router;
