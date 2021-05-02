// src/actions/authActions.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

// Acknowledgements to blog.bitsrc.io
 
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
		
      const { token } = res.data; // save to localStorage
	  
      localStorage.setItem("jwtToken", token); // set token to localStorage
    
      setAuthToken(token);   // set token to auth header
      
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


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  
  localStorage.removeItem("jwtToken"); // remove token from local storage
  
  setAuthToken(false); // remove auth header for future requests
  
  dispatch(setCurrentUser({}));// set current user to empt
};