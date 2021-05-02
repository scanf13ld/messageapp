// models/Message.js

const mongoose = require('mongoose');

const GroupMessagesSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  group_id: {
	type: mongoose.Schema.Types.ObjectId,
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

module.exports = GroupMessage = mongoose.model('groupmessages', GroupMessagesSchema);
