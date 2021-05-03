// src/components/NewConversation.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


import { Checkbox } from 'react-input-checkbox';


import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

const mongoose = require('mongoose');

class NewConversation extends Component {
	
  
  
  constructor() {
    super();
    this.state = {
      user1: '',
      user2:'',
      last_msg:'',
      creation: '',
	  encrypted: false
    };
  }
  
  handleCheckbox = (e) => {
    //e.preventDefault();
    this.setState({encrypted: !this.state.encrypted});
  } 

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
	const { user } = this.props.auth; 
	console.log(user);
	
    const data = {
      user1: user.username,
      user2: this.state.user2,
	  last_msg: this.state.last_msg,
      creation: this.state.creation,
	  encrypted: this.state.encrypted
      
    };
	
    axios
      .post('http://localhost:8082/api/messages/conversation/', data)
      .then(res => {
        this.setState({
			user1: '',
			user2:'',
			last_msg:'',
			creation: '',
			encrypted: false
        })
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log("Error in New Conversation!");
		
      })
	  this.props.history.push('/dashboard');
	  window.location.reload();
	
  };

  render() {
	  
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="col s12">
          
		  
            <div className="col s12">
              <br />
              <Link to="/dashboard" className="btn btn-small blue">
                  Back
			  </Link>
				<h1 className="display-4 text-center">New Conversation</h1>
				<p className="lead text-center">
					Create new conversation
				</p>
            </div>
			
            <div className="col-s12 center-align"> 
                <form noValidate onSubmit={this.onSubmit}>
               
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='user2'
                    className='form-control'
                    value={this.state.user2}
                    onChange={this.onChange}
                  />
                </div>
				
				<p>Encrypted?</p>      
				<Checkbox
					theme='bootstrap-checkbox'
					value={this.state.encrypted}
					onChange={this.handleCheckbox}
					>  
				&nbsp;</Checkbox>
				
							

				<br/>
                <input
                    type="submit"
                    className="btn btn-large blue"
                />
              </form>
          </div>
          
        </div>
      </div>
    );
  }
}

NewConversation.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {  }
)(withRouter(NewConversation));

//export default NewConversation;
