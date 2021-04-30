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
  },
  conversation_id: {
	type: mongoose.Schema.Types.ObjectId,
	required: true
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);
