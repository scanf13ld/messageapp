// models/Users.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true,
  },
  create_time: {
    type: String,
    default: Date.now,
  }
});

module.exports = Users = mongoose.model('users', UsersSchema);
