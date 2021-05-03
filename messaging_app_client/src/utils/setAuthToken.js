// src/utils/setAuthToken.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

// Acknowledgements to https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token; // apply authorization token to every request if logged in
  } 
  else {
	delete axios.defaults.headers.common["Authorization"]; // delete auth header
  }
};

export default setAuthToken;