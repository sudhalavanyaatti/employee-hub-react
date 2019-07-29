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
      // const data = {
      //   token: localStorage.getItem('token')
      // };
      fetch('http://localhost:3002/profile', {
        method: 'get',
        headers: {
           'Authentication-Token' :localStorage.getItem ('token'),
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
            <Menu id="headbg"fixed="top" inverted style={{ height: '50px' }} >
              <Container>
             
                <Menu.Item as={Link} to="/" header style={{ left: '-100px',color: 'white'}}>
                <Image src={logo} style={{width: '70px', height: '75px'}} />
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
                  <Menu.Item  as={Link} to="/details" id='dtext' style={{fontSize:'18px',color: 'white'}}>
                 Details
                  </Menu.Item>
                  <Dropdown
                    onClick={() => this.handleprofile()}
                    item
                    simple
                    text={this.state.name}
                    style={{color: 'white'}}
                    id='dtext'
                  >
                    <Dropdown.Menu >
                      <Dropdown.Item  as={Link} to="/profile" >
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
            <Menu id="headbg" fixed="top" inverted style={{ height: '50px'}}>
              <Container>
                <Menu.Item as={Link} to="/" header style={{ left: '-100px',color: 'white'}}>
                <Image src={logo} style={{width: '70px', height: '75px'}} />
                  Employee HUB
                </Menu.Item>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    right: '10px',
                    height: '50px',
                    fontSize:'18px'
                  }}
                >
                  <Menu.Item as={Link} to="/signIn" style={{fontSize:'18px',color: 'white'}}>
                    SignIn
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
