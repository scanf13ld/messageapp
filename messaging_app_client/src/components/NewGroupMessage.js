import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

var aes256 = require("aes256");

var key = "ouhpr2h39hpawdnloi1h2neddwqd12";

const DoEncrypt = (text) => {
  var encrypted = aes256.encrypt(key, text);
  return encrypted;
};



class NewGroupMessage extends Component {
  constructor() {
    super();
    this.state = {
      from: '',
      group_id: '',
      message: '',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
	
	

    const data = {
      from: this.props.from,
      group_id: this.props.group_id,
      message: this.state.message,
      send_time: this.state.send_time,
    };
	
	if (this.props.encrypted){
		
		data.message = DoEncrypt(data.message);
		console.log(data.maessage);
	}

    axios
	  .post('http://localhost:8082/api/messages/groupmessage/', data)
	  .then(res => {
		this.setState({
		  from: '',
		  group_id: '',
		  message: '',
		})
		this.props.history.push('/');
		//window.location.reload();
		
	  })
	  .catch(err => {
		console.log("Error in New Message!");
		window.location.reload();
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
                    placeholder='Message'
                    name='message'
                    className='form-control'
                    value={this.state.message}
                    onChange={this.onChange}
                  />
                </div>


                <input
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
					value="Send"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewGroupMessage;
