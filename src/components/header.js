import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Dropdown, Menu,Image} from 'semantic-ui-react';
import logo from "../images/logo.png";

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
            <Menu fixed="top" inverted style={{ height: '50px'}} >
              <Container>
             
                <Menu.Item as={Link} to="/" header style={{ left: '-75px'}}>
                <Image src={logo} style={{width: '80px', height: '52px'}} />
                  Employee HUB
                </Menu.Item>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    right: '30px',
                    height: '50px',
                    fontSize:'18px'
                  }}
                >
                  <Menu.Item as={Link} to="/details" style={{fontSize:'18px'}}>
                    Details
                  </Menu.Item>
                  <Dropdown
                    onClick={() => this.handleprofile()}
                    item
                    simple
                    text={this.state.name}
                    
                  >
                    <Dropdown.Menu >
                      <Dropdown.Item as={Link} to="/profile">
                      My account
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
            <Menu fixed="top" inverted style={{ height: '50px'}}>
              <Container>
                <Menu.Item as={Link} to="/" header style={{ left: '-75px'}}>
                <Image src={logo} style={{width: '80px', height: '52px'}} />
                  Employee HUB
                </Menu.Item>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    right: '30px',
                    height: '50px',
                    fontSize:'18px'
                  }}
                >
                  <Menu.Item as={Link} to="/signIn" style={{fontSize:'18px'}}>
                    SignIn
                  </Menu.Item>
                  {/* <Menu.Item as={Link} to="/about">
                    About
                  </Menu.Item> */}
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
