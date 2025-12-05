const Resume = require('../models/Resume');
const Assessment = require('../models/Assessment');
const { getCareerDetails } = require('../utils/helpers');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Resume list page
exports.resumeListPage = async (req, res) => {
  try {
    const resumes = await Resume.find({ studentId: req.user.id }).sort({ updatedAt: -1 });

    res.render('resume/resume-list', {
      title: 'My Resumes - CareerConnect',
      resumes,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading resumes',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Create resume page
exports.createResumePage = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ studentId: req.user.id }).sort({ createdAt: -1 });

    res.render('resume/resume-builder', {
      title: 'Create Resume - CareerConnect',
      resume: null,
      careerPath: assessment?.recommendedCareer || '',
      careerDetails: assessment ? getCareerDetails(assessment.recommendedCareer) : null,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor',
      isEdit: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading resume builder',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Save resume
exports.saveResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { personalInfo, education, experience, skills, projects, certifications, careerPath } = req.body;

    let resume;

    if (resumeId && resumeId !== 'new') {
      resume = await Resume.findByIdAndUpdate(
        resumeId,
        {
          personalInfo,
          education,
          experience,
          skills,
          projects,
          certifications,
          careerPath,
          updatedAt: new Date(),
        },
        { new: true }
      );
    } else {
      resume = new Resume({
        studentId: req.user.id,
        careerPath,
        personalInfo,
        education,
        experience,
        skills,
        projects,
        certifications,
      });
      await resume.save();
    }

    res.json({ success: true, resumeId: resume._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving resume' });
  }
};

// View resume
exports.viewResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);

    if (!resume || resume.studentId.toString() !== req.user.id) {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Resume not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    res.render('resume/resume-view', {
      title: `Resume - CareerConnect`,
      resume,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { 
      title: '500 - Server Error',
      message: 'Error loading resume',
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  }
};

// Edit resume
exports.editResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);

    if (!resume || resume.studentId.toString() !== req.user.id) {
      return res.status(404).render('error', { 
        title: '404 - Not Found',
        message: 'Resume not found',
        user: req.user || null,
        isStudent: req.user?.role === 'student',
        isMentor: req.user?.role === 'mentor'
      });
    }

    const careerDetails = getCareerDetails(resume.careerPath);

    res.render('resume/resume-builder', {
      title: 'Edit Resume - CareerConnect',
      resume,
      careerPath: resume.careerPath,
      careerDetails,
      isEdit: true,
      user: req.user || null,
      isStudent: req.user?.role === 'student',
      isMentor: req.user?.role === 'mentor'
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading resume' });
  }
};

// Download resume as PDF
exports.downloadResumePDF = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);

    if (!resume || resume.studentId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const doc = new PDFDocument();
    const filename = `resume_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../../public/resumes', filename);

    // Ensure directory exists
    const dir = path.join(__dirname, '../../public/resumes');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add content to PDF
    doc.fontSize(20).text(resume.personalInfo.fullName, { align: 'center' });
    doc.fontSize(11);
    doc.text(`Email: ${resume.personalInfo.email} | Phone: ${resume.personalInfo.phone}`, {
      align: 'center',
    });
    doc.text(`Location: ${resume.personalInfo.location}`, { align: 'center' });
    doc.moveDown();

    if (resume.personalInfo.summary) {
      doc.fontSize(14).text('PROFESSIONAL SUMMARY');
      doc.fontSize(11).text(resume.personalInfo.summary);
      doc.moveDown();
    }

    if (resume.experience.length > 0) {
      doc.fontSize(14).text('EXPERIENCE');
      resume.experience.forEach((exp) => {
        doc.fontSize(12).text(exp.jobTitle, { underline: true });
        doc.fontSize(11).text(`${exp.company} | ${new Date(exp.startDate).getFullYear()} - ${new Date(exp.endDate).getFullYear()}`);
        doc.text(exp.description);
        doc.moveDown();
      });
    }

    if (resume.education.length > 0) {
      doc.fontSize(14).text('EDUCATION');
      resume.education.forEach((edu) => {
        doc.fontSize(12).text(`${edu.degree} in ${edu.field}`, { underline: true });
        doc.fontSize(11).text(edu.institution);
        doc.moveDown();
      });
    }

    if (resume.skills.length > 0) {
      doc.fontSize(14).text('SKILLS');
      doc.fontSize(11).text(resume.skills.join(', '));
      doc.moveDown();
    }

    if (resume.projects.length > 0) {
      doc.fontSize(14).text('PROJECTS');
      resume.projects.forEach((proj) => {
        doc.fontSize(12).text(proj.title, { underline: true });
        doc.fontSize(11).text(proj.description);
        if (proj.link) doc.text(`Link: ${proj.link}`);
        doc.moveDown();
      });
    }

    doc.end();

    stream.on('finish', () => {
      res.download(filePath, `resume.pdf`, () => {
        // Delete file after download
        fs.unlink(filePath, (err) => {
          if (err) console.error(err);
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);

    if (!resume || resume.studentId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    await Resume.findByIdAndDelete(resumeId);

    res.json({ success: true, message: 'Resume deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting resume' });
  }
};
