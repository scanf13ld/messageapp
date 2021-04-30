import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class NewMessage extends Component {
  constructor() {
    super();
    this.state = {
      user1: '',
      user2:'',
      message:'',
      send_time:'',
	  conversation_id:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      user1: this.props.user1,
      user2: this.props.user2,
      message: this.state.message,
      send_time: this.state.send_time,
	  conversation_id : this.props.conv_id
    };

    axios
      .post('http://localhost:8082/api/messages', data)
      .then(res => {
        this.setState({
          user1: '',
          user2:'',
          message:'',
          send_time:'',
		  conversation_id:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in New Message!");
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

export default NewMessage;
