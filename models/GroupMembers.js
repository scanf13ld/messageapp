// models/Conversations.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupMembersSchema = new Schema({
  group_id: {
	type: mongoose.Schema.Types.ObjectId,
	required: true
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
});

module.exports = GroupMembers = mongoose.model('groupmembers', GroupMembersSchema);
