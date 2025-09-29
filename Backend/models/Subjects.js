const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  total_question: {
    type: Number,
    default: 0,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});


const Subject = mongoose.model('Subject', courseSchema);
module.exports = Subject;

