import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Dropdown, Menu} from 'semantic-ui-react';

class Header extends Component {
  state = {
    userStatus: false,
    name: ''
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
  handleprofile() {}

  render() {
    return (
      <div>
        {this.state.userStatus ? (
          <div>
            <Menu fixed="top" inverted >
              <Container>
                {/* <img
                  src={
                    'https://cdn0.iconfinder.com/data/icons/seo-and-marketing-line-color-vol-2/62/user__replace__employee__transfer__avatar-512.png'
                  }
                  alt="Logo"
                  style={{width: '10px', height: '10px',top: '10px'}}
                /> */}
                <Menu.Item as={Link} to="/" header>
                  Employee HUB
                </Menu.Item>
                <div
                  style={{
                    margintop:'50px',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    right: '50px'
                  }}
                >
                  <Menu.Item as={Link} to="/details">
                    Details
                  </Menu.Item>
                  <Dropdown
                    onClick={() => this.handleprofile()}
                    item
                    simple
                    text={this.state.name}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => this.handleClearToken()}
                        as={Link}
                        to="/signIn"
                      >
                        Sign Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Container>
            </Menu>
          </div>
        ) : (
          <div>
            <Menu fixed="top" inverted>
              <Container>
                <Menu.Item as={Link} to="/" header>
                  Employee HUB
                </Menu.Item>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    right: '50px'
                  }}
                >
                  <Menu.Item as={Link} to="/signIn">
                    SignIn
                  </Menu.Item>
                  <Menu.Item as={Link} to="/about">
                    About
                  </Menu.Item>
                </div>
              </Container>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
