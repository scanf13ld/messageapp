// src/reducers/index.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
});