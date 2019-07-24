import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import logo from "../images/default.jpg";

import '../style.css';
 class Tab extends Component {
  state = {
    id: ''
  };
  componentDidMount() {
      const data = {
        token: localStorage.getItem('token')
      };
      fetch('http://localhost:3001/profile', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.setState({
              id: data.data._id
            });
          }
        });
      }
  
  render() {
    return (
      <div class="sidenav">
  <Link to={{pathname: '/resetPassword',state: { id: this.state.id }}}><strong>Reset Password</strong></Link>
  <Link to={{pathname: '/update-details',state: { id: this.state.id }}}><strong>Update Profile</strong></Link>
</div>

    )
  }
}
export default Tab;