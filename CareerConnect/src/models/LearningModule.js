const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema({
  careerPath: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  content: {
    type: String,
    required: true,
  },
  resources: [
    {
      title: String,
      link: String,
      type: String, // video, article, course, etc.
    },
  ],
  tasks: [
    {
      title: String,
      description: String,
      difficulty: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LearningModule', learningModuleSchema);
