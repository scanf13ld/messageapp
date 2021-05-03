// src/actions/login.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

// Acknowledgements to https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) { // check username
    errors.username = "Username field required";
  } 

  if (Validator.isEmpty(data.password)) { // check password
    errors.password = "Password field required";
  }
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};
