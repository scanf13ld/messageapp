// src/reducers/index.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

// Acknowledgements to https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82

import { combineReducers } from "redux";
import authReducers from "./authReducers";

export default combineReducers({
  auth: authReducers,
});