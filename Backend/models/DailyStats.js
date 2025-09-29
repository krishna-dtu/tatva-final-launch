const mongoose = require('mongoose');

const dailyStatsSchema = new mongoose.Schema({
  phoneNo: {
    type: String,
    required: true,
    unique: true
  },
  solved: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DailyStats', dailyStatsSchema);
