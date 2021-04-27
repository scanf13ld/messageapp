import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MessageBubble from './MessageBubble';

let lh = 'http://ec2-3-141-13-226.us-east-2.compute.amazonaws.com:8082'

class ShowMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    axios
      .get(lh + '/api/messages')
      .then(res => {
        this.setState({
          messages: res.data
        })
      })
      .catch(err =>{
        console.log('Error from showLogin');
      })
  };


  render() {

    return (
      <div className="showLogin">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br/>
              <h2 className="display-4 text-center">Existing Users:</h2>
            </div>

            <div className="col-md-11">
            <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='username'
                    name='username'
                    className='form-control'
                    value={this.state.user1}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='password'
                    name='password'
                    className='form-control'
                    value={this.state.user2}
                    onChange={this.onChange}
                  />
                </div>


                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                    name="Login"
                />
              </form>
              <br />
              <br />
              <hr />

              
            </div>

            <div className="col-md-12">
              <br/>
              <h2 className="display-4 text-center">New Users:</h2>
            </div>

            <div className="col-md-11">
            <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='username'
                    name='new-username'
                    className='form-control'
                    value={this.state.user1}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='password'
                    name='new-password'
                    className='form-control'
                    value={this.state.user2}
                    onChange={this.onChange}
                  />
                </div>


                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                    name="Register"
                />
              </form>
              <br />
              <br />
              <hr />
              
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default ShowMessageList;
