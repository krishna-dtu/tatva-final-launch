const mongoose = require('mongoose');

const subjectUserSchema = new mongoose.Schema({
  subject: {
    type: String,
    ref: 'Subject',
    required: true
  },
//  answers: {
//   type: [mongoose.Schema.Types.Mixed],  // Accept any type of data inside the array
//   default: []
// },
  solved : {
    type : Number,
    default : 0
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

subjectUserSchema.index({ phone: 1, subject: 1 }, { unique: true });

const subjectUser = mongoose.model('subjectUser', subjectUserSchema);
module.exports = subjectUser;
