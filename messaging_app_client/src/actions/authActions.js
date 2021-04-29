// src/actions/authActions.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

export const registerUser = (userData, history) => dispatch => { // Register User
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const loginUser = userData => dispatch => { // login - get user token
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // save to localStorage
	  // set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
    
      setAuthToken(token);   // set token to Auth header
      
      const decoded = jwt_decode(token); // decode token to get user data
     
      dispatch(setCurrentUser(decoded));  // set current user
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// user loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};