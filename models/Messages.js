// models/Message.js

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user1: {
    type: String,
    required: true
  },
  user2: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  send_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);
