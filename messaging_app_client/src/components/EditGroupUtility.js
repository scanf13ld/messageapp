// src/components/EditGroupUtility.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import NewGroupMember from './NewGroupMember';
import EditGroupName from './EditGroupName';



class EditGroupUtility extends Component {
  constructor() {
    super();
    this.state = {
      showing: false
    };
  }


  render() {
	const { showing } = this.state;
	console.log("EditGroupUtility: groupname= "+ this.props.groupname);
    return (
	<div className="col s12 center-align">
		<button className="btn btn-large waves-effect waves-light hoverable light-blue accent-3" onClick={() => this.setState({ showing: !showing })}>Edit Group</button>
		
		{ showing ? (
			<React.Fragment>
			<NewGroupMember groupname= {this.props.groupname} group_id={this.props.group_id}/>
			<EditGroupName group_id={this.props.group_id}/>
			</React.Fragment>
			 ):( <p></p> )
		}
	</div>
     
    );
  }
}

export default EditGroupUtility;
