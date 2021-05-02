// src/components/EditGroupName.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';



class EditGroupName extends Component {
  constructor() {
    super();
    this.state = {
	  group_id: '',
      name: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
	  
	  
	  
    e.preventDefault();
	
	
	
	
    const data = {
	  group_id: this.props.group_id,
      name: this.state.name
    };
	
	
	console.log("this.props.group_id: "+ this.props.group_id);
	console.log("data: "+ data.name);
	
	
    axios
      .put('http://localhost:8082/api/messages/group/'+this.props.group_id, data)
      .then(res => {
        this.setState({
		  group_id: '',
		  name: ''
        })
        this.props.history.push('/');
		//window.location.reload();
		
      })
      .catch(err => {
        console.log("Error in editing group name!");
		//window.location.reload();
      })
	  
  };

  render() {
    return (
      <div className="container valign-wrapper">
        <div className="container">
          <div className="row">			
            <div className="col s12 center-align">
              <form noValidate onSubmit={this.onSubmit}>
                
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='New group name'
                    name='name'
                    className='form-control'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>

				<div className="inline-btn">
                <input
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable light-blue accent-3"
					value="Change"
                />
				</div>
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditGroupName;
