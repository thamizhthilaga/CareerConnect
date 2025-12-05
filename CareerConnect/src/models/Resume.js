const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  careerPath: {
    type: String,
    required: true,
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
  },
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      institution: String,
      field: String,
      graduationDate: Date,
    },
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      link: String,
    },
  ],
  certifications: [
    {
      title: String,
      issuer: String,
      date: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
