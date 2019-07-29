import React, {Component} from 'react';
import axios from 'axios';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from '../components/sidebar';
import Account from '../components/account';
import Address from '../components/address';
import Number from '../components/updatenumber';
import Password from '../components/resetpassword';
import {Button, Divider, Icon} from 'semantic-ui-react';
import {Row, Col} from 'react-flexbox-grid';
import '../App.css';
import '../style.css';
class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      id: '',
      name: '',
      profilePic: '',
      uploadpic: '',
      displayContent: 'account',
    };
  }
  componentDidMount () {
    // const data = {
    //   token: localStorage.getItem('token')
    // };
    fetch ('http://localhost:3002/profile', {
      method: 'get',
      headers: {
        'Authentication-Token': localStorage.getItem ('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then (res => res.json ())
      .then (data => {
        if (data) {
          this.setState ({
            id: data.data._id,
            name: data.data.fullName,
            profilePic: data.data.profilePic,
          });
        }
      });
  }
  onChangeUploadpic (event) {
    this.setState (
      {
        uploadpic: event.target.files[0],
      },
      () => {
        const data = new FormData ();
        data.append ('profilePic', this.state.uploadpic);
        data.append ('id', this.state.id);
        axios
          .post ('http://localhost:3002/update-photo', data, {})
          .then (data => {
            if (data) {
              this.setState ({
                profilePic: data.data.data.profilePic,
              });
              window.location.reload ();
            }
          });
      }
    );
  }
  
  render () {
    return (
      <div className="profilebg" align="center" id="page-container">
        {/* <div className="header"> */}
        <div className="mobile-only">
          <SideBar />
        </div>
        <div className="desktop-only">
          <Header />
        </div>
        <Row style={{paddingTop: '10%', paddingBottom: '6%'}}>
          <Col lg={6} xs={12} sm={6} md={6}>
            <div style={{flexDirection: 'column'}}>
              <Col>
                <div>
                  <img
                    className="img-circle"
                    src={`${'http://localhost:3002' + this.state.profilePic}`}
                    alt="profile"
                    height="150"
                    width="150"
                  />
                  {/* <Row lg={5} xs={12} sm={6} md={6}> */}
                  <div className="img-upld">
                    <input
                      type="file"
                      className="img-upload"
                      onChange={event => this.onChangeUploadpic (event)}
                    />
                  </div>
                  {/* </Row> */}
                  <div style={{fontSize: '20px'}}>{this.state.name}</div>
                </div>
              </Col>
              <Col>
                <div>
                  <Button.Group vertical className="sidenav">
                    <Button
                      onClick={() =>
                        this.setState ({
                          displayContent: 'account',
                        })}
                      icon
                      labelPosition="right"
                    >
                      Account
                      <Icon name="angle double right" />
                    </Button>
                    <Divider fitted />
                    <Button
                      onClick={() =>
                        this.setState ({
                          displayContent: 'address',
                        })}
                      icon
                      labelPosition="right"
                    >
                      Address
                      <Icon name="angle double right" />
                    </Button>
                    <Divider fitted />
                    <Button
                      onClick={() =>
                        this.setState ({
                          displayContent: 'number',
                        })}
                      icon
                      labelPosition="right"
                    >
                      Update Mobile Number
                      <Icon name="angle double right" />
                    </Button>
                    <Divider fitted />
                    <Button
                      onClick={() =>
                        this.setState ({
                          displayContent: 'password',
                        })}
                      icon
                      labelPosition="right"
                    >
                      Reset Password
                      <Icon name="angle double right" />
                    </Button>
                  </Button.Group>
                </div>
              </Col>
            </div>
          </Col>
          <Col lg={4} xs={12} sm={6} md={6}>
            <div>
              {this.state.displayContent === 'account'
                ? <div>
                    <Account />
                  </div>
                : <div />}
              {this.state.displayContent === 'address'
                ? <div>
                    <Address />
                  </div>
                : <div />}
              {this.state.displayContent === 'number'
                ? <div>
                    <Number />
                  </div>
                : <div />}
              {this.state.displayContent === 'password'
                ? <div>
                    <Password />
                  </div>
                : <div />}
            </div>
          </Col>
        </Row>
        <Bottom />
      </div>
    );
  }
}

export default Profile;
