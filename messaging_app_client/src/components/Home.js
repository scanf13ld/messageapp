// src/components/Home.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>MessageApp</b><br/>
            </h4>
            <p className="flow-text grey-text">
              talk to your friends
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                className="btn blue"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                className="btn white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
