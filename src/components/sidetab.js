import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import logo from "../images/default.jpg";

import '../style.css';
 class Tab extends Component {
  render() {
    return (
      <div class="sidenav">
      {/* <img src={logo} alt="logo" className="pic1" /> */}
  <Link to="/updateNumber"><strong>Update Number</strong></Link>
  <Link to="/newPassword"><strong>Update Password</strong></Link>
  <Link to="/update-details"><strong>Update Profile</strong></Link>
</div>

    )
  }
}
export default Tab;