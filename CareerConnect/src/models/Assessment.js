const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: {
    question1: String, // Interests
    question2: String, // Preferred skill type
    question3: String, // Work style
    question4: String, // Strength areas
  },
  recommendedCareer: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assessment', assessmentSchema);
