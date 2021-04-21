// models/Conversations.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationsSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  last_content: {
    type: String,
    required: true,
  },
  send_time: {
    type: String,
    required: true,
    default: Date.now,
  }
});

module.exports = Conversations = mongoose.model('conversations', ConversationsSchema);
