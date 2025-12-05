const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { authenticateToken, checkRole } = require('../middleware/auth');

router.get('/', authenticateToken, checkRole('student'), resumeController.resumeListPage);
router.get('/create', authenticateToken, checkRole('student'), resumeController.createResumePage);
router.post('/save/:resumeId', authenticateToken, checkRole('student'), resumeController.saveResume);
router.get('/view/:resumeId', authenticateToken, checkRole('student'), resumeController.viewResume);
router.get('/edit/:resumeId', authenticateToken, checkRole('student'), resumeController.editResume);
router.post('/delete/:resumeId', authenticateToken, checkRole('student'), resumeController.deleteResume);
router.get('/download/:resumeId', authenticateToken, checkRole('student'), resumeController.downloadResumePDF);

module.exports = router;
