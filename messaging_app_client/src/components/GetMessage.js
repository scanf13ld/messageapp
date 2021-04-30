import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class getMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/messages/message/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
          message: res.data
        })
      })
      .catch(err => {
        console.log("Error from GetMessage");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/messages/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form GetMessage_deleteClick");
      })
  };


  render() {

    const message = this.state.message;
    let MessageItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>User 1</td>
            <td>{ message.user1 }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>User 2</td>
            <td>{ message.user2 }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Message</td>
            <td>{ message.message }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Time Sent</td>
            <td>{ message.time_sent }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Message List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Messages's Record</h1>
              <p className="lead text-center">
                  View Messages's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { MessageItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,message._id)}>Delete Message</button><br />
            </div>


          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}

        </div>
      </div>
    );
  }
}

export default getMessage;
