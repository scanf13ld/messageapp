// src/reducers/errorReducers.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

// Acknowledgements to blog.bitsrc.io

import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}