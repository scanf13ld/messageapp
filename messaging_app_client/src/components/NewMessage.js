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
      send_time:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      user1: this.state.user1,
      user2: this.state.user2,
      message: this.state.message,
      send_time: this.state.send_time
    };

    axios
      .post('http://localhost:8082/api/messages', data)
      .then(res => {
        this.setState({
          user1: '',
          user2:'',
          message:'',
          send_time:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in New Message!");
      })
  };

  render() {
    return (
      <div className="CreateMessage">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Conversation List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">New Message</h1>
              <p className="lead text-center">
                  Create new message
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='User 1'
                    name='user1'
                    className='form-control'
                    value={this.state.user1}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='User 2'
                    name='user2'
                    className='form-control'
                    value={this.state.user2}
                    onChange={this.onChange}
                  />
                </div>

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
                    className="btn btn-outline-warning btn-block mt-4"
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
