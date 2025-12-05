const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateToken, checkRole } = require('../middleware/auth');

router.get('/', authenticateToken, checkRole('student'), jobController.jobsPage);
router.get('/job/:jobId', authenticateToken, jobController.jobDetail);
router.post('/save', authenticateToken, checkRole('student'), jobController.saveJob);
router.get('/saved', authenticateToken, checkRole('student'), jobController.savedJobs);

module.exports = router;
