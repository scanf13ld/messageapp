// src/components/NewGroup.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

const mongoose = require('mongoose');

class NewGroup extends Component {
	
  
  
  constructor() {
    super();
    this.state = {
      name: '',
	  owner: '',
      creation: ''
    };
  }
  
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
	const { user } = this.props.auth; 
	console.log(user);
	
    const data = {
      name: this.state.name,
	  owner: user.username,
      creation: this.state.creation
    };
	
    axios
      .post('http://localhost:8082/api/messages/group/', data)
      .then(res => {
        this.setState({
			name: '',
			creation: ''
        })
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log("Error in New Group!");
		
      })
	  //window.location.reload();
	
  };

  render() {
	  
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="col s12">
          
		  
            <div className="col s12">
              <br />
              <Link to="/dashboard" className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                  Back
			  </Link>
				<h1 className="display-4 text-center">New Group</h1>
				<p className="lead text-center">
					Create new group
				</p>
            </div>
			
            <div className="col-s12 center-align"> 
                <form noValidate onSubmit={this.onSubmit}>
               
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Group name'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
				
				
				
							

				<br/>
                <input
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                />
              </form>
          </div>
          
        </div>
      </div>
    );
  }
}

NewGroup.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {  }
)(withRouter(NewGroup));

//export default NewConversation;
