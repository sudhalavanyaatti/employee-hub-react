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

  render() {
    return (
      <div className="navbar">
        <Row>
          <Col xs={12} className="col">
            <Row end="xs">
              <Col xs={4} className="col">
                <div>
                  {this.state.userStatus ? (
                    <div>
                      <Link to="/">Home</Link>
                      <Link to="/profile">Profile</Link>
                      <Link to="/about">About</Link>
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
