const mongoose = require('mongoose');

const subjectUserSchema = new mongoose.Schema({
  subject: {
    type: String,
    ref: 'Subject',
    required: true
  },
  answers: {
    type: [String],
    default: []
  },
  phone: {
    type: String,
    required: true,
    default: 0
  },
  chapterCompleted: {
    type: Boolean,
    default : false
  },
  correct : {
    type : Number,
    default : 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const subjectUser = mongoose.model('subjectUser', subjectUserSchema);
module.exports = subjectUser;
