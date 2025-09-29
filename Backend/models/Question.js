const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
    ref: 'Course',
  },
  question : {
    type : String,
  },
  options: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
  explanation: {
    type: String,
  },

});

// Compound unique index on id + subject_id
questionSchema.index({ id: 1, subject_id: 1 }, { unique: true });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;