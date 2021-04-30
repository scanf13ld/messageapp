// routes/apis/users.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/Users");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
User.findOne({ username: req.body.username }).then(user => { //look in database for username
    if (user) {
      return res.status(400).json({ username: "username already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => { // Hash password before saving in database
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  
	const { errors, isValid } = validateLoginInput(req.body); // Form validation

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username }).then(user => {
 
    if (!user) {
      return res.status(404).json({ usernamenotfound: "username not found" });
    }
	
    bcrypt.compare(password, user.password).then(isMatch => { //if password matches
      if (isMatch) { //finds user
       
        
        const payload = {
          id: user.id,
          name: user.name,
		  username: user.username
        };

        jwt.sign( 
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
