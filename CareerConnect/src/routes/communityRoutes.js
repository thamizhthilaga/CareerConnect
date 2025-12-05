const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { authenticateToken, checkAnyRole } = require('../middleware/auth');

router.get('/', authenticateToken, communityController.communityPage);
router.get('/ask', authenticateToken, checkAnyRole(['student']), communityController.askQuestionPage);
router.post('/ask', authenticateToken, checkAnyRole(['student']), communityController.submitQuestion);
router.get('/post/:postId', authenticateToken, communityController.postDetail);
router.post('/post/:postId/comment', authenticateToken, communityController.addComment);
router.get('/mentor/:mentorId', authenticateToken, communityController.mentorProfile);
router.get('/notifications', authenticateToken, communityController.getNotifications);
router.post('/notifications/:notificationId/read', authenticateToken, communityController.markNotificationRead);

module.exports = router;
