// validation/register.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

// Acknowledgements to blog.bitsrc.io

const Validator = require("validator");

const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.username)) {  // check username
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) { // check password
    errors.password = "Password field is required";
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
