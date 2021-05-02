import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GroupSlide from './GroupSlide';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ShowGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
	
	this.onDeleteClick = this.onDeleteClick.bind(this);
	this.getUpdatedGroups = this.getUpdatedGroups.bind(this);
	
  }
  
  onDeleteClick(id) {
	
	console.log("Clicked");
	
	axios.all
	([
		axios
		  .delete('http://localhost:8082/api/messages/group/'+id)
		  .then(res => {
			this.props.history.push("/");
		  })
		  .catch(err => {
			console.log("Error form ShowConversationList_deleteClick_group");
			
		}),
		axios
		  .delete('http://localhost:8082/api/messages/group/messages/'+id)
		  .then(res => {
			this.props.history.push("/");
		  })
		  .catch(err => {
			console.log("Error form ShowConversationList_deleteClick_messages");
			
		}),
		axios
		  .delete('http://localhost:8082/api/messages/group/members/'+id)
		  .then(res => {
			this.props.history.push("/");
		  })
		  .catch(err => {
			console.log("Error form ShowConversationList_deleteClick_members");	
		})
	]).then(axios.spread((data1, data2, data3) => {
	// output of req.
	console.log('data1', data1, 'data2', data2, 'data3', data3)
	}));
	  
	  
	  
   };
  //window.location.reload();
  componentDidMount() {
	const { user } = this.props.auth; 
	//console.log(this.props.match.params.id);
	var request = {
		params: {
			user1: user.username
		}
	}
    axios
      .get('http://localhost:8082/api/messages/groups/'+user.username, request)
      .then(res => {
        this.setState({
          groups: res.data,
		  
        })
      })
      .catch(err =>{
        console.log('Error from ShowGroupsList');
      })
  };
  
  getUpdatedGroups() {
	const { user } = this.props.auth; 
	//console.log(this.props.match.params.id);
	var request = {
		params: {
			user1: user.username
		}
	}
    axios
      .get('http://localhost:8082/api/messages/groups/'+user.username, request)
      .then(res => {
        this.setState({
          groups: res.data,
		  
        })
      })
      .catch(err =>{
        console.log('Error from ShowGroupsList');
      })
  };
  
  
	


  render() {
	const { user } = this.props.auth; 
	let fn = this.onDeleteClick;
	
	
	 
	
    const groups = this.state.groups;
    console.log("Print groups: " + groups);
    let groupList;
	//console.log("User: "+user.username);
    if(!groups) {
      groupList = "there is no groups record!";
    } else {
	 console.log(groups.length);
	  if (groups.length > 0){
		    
		  	groupList = groups.map(function(group, k){
			
				let name = group.name;
				console.log("ShowGroupList: "+name);
			
				return <GroupSlide onDeleteClick={fn} group = {group} name={name} key={k}  />
			});
	  }
	  
      
    }

    return (

          <div className="row">
                {groupList}
          </div>
        
      
    );
  }
}

ShowGroupList.propTypes = {

  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {  }
)(ShowGroupList);

//export default ShowConversationList;
