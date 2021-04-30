// models/Conversations.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationsSchema = new Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  last_msg: {
    type: String,
  },
  creation: {
    type: Date,
    default: Date.now,
  },
  encrypted: {
	type: Boolean,
	default: false
  }
});

module.exports = Conversations = mongoose.model('conversations', ConversationsSchema);
