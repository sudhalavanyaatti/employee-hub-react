import React, {Component} from 'react';
import { SocialIcon } from 'react-social-icons';
//import {Link} from 'react-router-dom';
//import {Row, Col} from 'react-flexbox-grid';
import '../style.css';
//import name from "../images/name1.png";

class Bottom extends Component {
  render() {
    return ( 
         
      <div className="btmnavbar">
      <div id="footer">
      <h6 >&copy; 2019 EmployeeHub.All Rights Reserved.</h6>
      </div>
       <div id="hdr">
       <SocialIcon url="http://facebook.com"   style={{  height: 25, width: 25 }} />
       <SocialIcon url="http://twitter.com"  style={{ height: 25, width: 25 }} />
       <SocialIcon url="http://googleplus.com" style={{ height: 25, width: 25 }} />
       <SocialIcon url="http://linkedin.com" style={{ height: 25, width: 25}} />
       </div>
      </div>
    

    );
  }
}

export default Bottom;
