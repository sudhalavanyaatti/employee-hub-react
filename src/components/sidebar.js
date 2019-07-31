import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';
import logo from "../images/logo.png";
import '../style.css';
import '../App.css';
class SideBar extends Component {

  state = {
    userStatus: false
  };
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        userStatus: true
      });
    }
  }
  handleClearToken() {
    localStorage.clear();
    this.setState({
      userStatus: false
    });
  }
  handleprofile() {
    
  }

   render(){
    return (
               <div>
                  {this.state.userStatus ? (
                    <div>
                    <Menu className="bm-menu">
                    <img src={logo} style={{position:'absolute',top:'10px',left:'60px', width: '70px', height: '75px'}} alt="logo"/>
                      <Link  className="bm-item-list" to="/">Home</Link>
                      <Link className="bm-item-list" onClick={() => this.handleprofile()} to="/profile">My Account</Link>
                      <Link className="bm-item-list" to="/details">Details</Link>
                      <Link className="bm-item-list"
                        onClick={() => this.handleClearToken()}
                        to="/signIn"
                      >
                        Sign Out
                      </Link>
      
                    </Menu>
                    </div>
                  ) : (
                    <div>
                     <Menu className="bm-menu">
                     <img src={logo} style={{position:'absolute',top:'10px',left:'35px', width: '70px', height: '75px'}} alt="logo"/>
                      <Link className="bm-item-list" to="/">Home</Link>
                      <Link className="bm-item-list"  to="/signIn">SignIn</Link>
                     </Menu>
                     </div>
                  )}
                </div>
  
      );
   }
};

export default SideBar;

