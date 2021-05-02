// models/Groups.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
	type: String,
    required: true,
  },
  creation: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Groups = mongoose.model('groups', GroupsSchema);
