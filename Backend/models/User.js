const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    default: 0
  },
  coins: {
    type: Number,
    default: 100
  },
  badges: {
    type: [String],
    default: []
  },
  subject: {
    type: [String],
    default: ["M_Q","S_Q","E_Q"]
  },
  level: {
    type: Number,
    default: 1
  },
  exp: {
    type: Number,
    default: 0
  },
  achievement: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    default: []
  }],
  avatar: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Avatar',
    default: []
  }],
  language: { type: String, default: 'en' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

