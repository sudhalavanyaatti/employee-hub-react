import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';
import '../style.css';

class Header extends Component {
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

  render() {
    return (
      <div className="navbar">
        <Row>
          <Col xs={12} className="col">
            <Row end="xs">
            <Col xs={7} className="col">
            <img height="55" align="left" alt="logo" src="https://m.media-amazon.com/images/S/aplus-media/vc/a712e702-60df-4c8a-9123-70b7e85b7794._CR0,0,300,300_PT0_SX300__.png"/>   
               <h4 align="left"  ><strong>EMPLOYEEHUB</strong></h4>
              </Col>
              <Col xs={4} className="col">
                <div>
                  {this.state.userStatus ? (
                    <div>
                       
                      <Link to="/">Home</Link>
                      <Link onClick={() => this.handleprofile()} to="/profile">Profile</Link>
                      <Link to="/details">Details</Link>
                      <Link
                        onClick={() => this.handleClearToken()}
                        to="/signIn"
                      >
                        Sign Out
                      </Link>
                    </div>
                  ) : (
                    <div>
                     

                      <Link to="/">Home</Link>
                      <Link to="/signIn">SignIn</Link>
                      <Link to="/about">About</Link>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
