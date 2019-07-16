import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';
import '../style.css';
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
                    <Menu className="bm-menu">
    
                      <Link  className="bm-item-list" to="/">Home</Link>
                      <Link className="bm-item-list" onClick={() => this.handleprofile()} to="/profile">Profile</Link>
                      <Link className="bm-item-list" to="/details">Details</Link>
                      <Link className="bm-item-list"
                        onClick={() => this.handleClearToken()}
                        to="/signIn"
                      >
                        Sign Out
                      </Link>
      
                    </Menu>
                  ) : (
                     <Menu className="bm-menu">
                        
                      <Link className="bm-item-list" to="/">Home</Link>
                      <Link className="bm-item-list"  to="/signIn">SignIn</Link>
                      <Link className="bm-item-list" to="/about">About</Link>
                  
                     </Menu>
                  )}
                </div>
  
      );
   }
};

export default SideBar;

