import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';
import '../style.css';

class Header extends Component {
  state = {
    userStatus: false,
    name: '',
    showmenu: false
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        userStatus: true
      });
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
              name: data.data.fullName
            });
          }
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
    this.setState({
      showmenu: true
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
                      <Link to="/">
                        <strong>Home</strong>
                      </Link>

                      <Link to="/details">
                        <strong>Details</strong>
                      </Link>

                      <div>
                        <Link onClick={() => this.handleprofile()}>
                          <strong>{this.state.name}</strong>
                        </Link>

                        <div>
                          {this.state.showmenu ? (
                            <div className="nav">
                              <Link to="/profile">
                                {' '}
                                <strong>Profile</strong>
                              </Link>

                              <Link
                                onClick={() => this.handleClearToken()}
                                to="/signIn"
                              >
                                <strong>Sign Out</strong>
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <strong>
                        {' '}
                        <Link to="/">Home</Link>
                      </strong>
                      <strong>
                        {' '}
                        <Link to="/signIn">SignIn</Link>
                      </strong>
                      <strong>
                        {' '}
                        <Link to="/about">About</Link>
                      </strong>
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
