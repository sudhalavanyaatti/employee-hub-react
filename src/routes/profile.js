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
import '../App.css';
import '../style.css';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      profilePic: '',
      uploadpic: '',
      displayContent: 'account'
    };
  }
  componentDidMount() {
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
            id: data.data._id,
            name: data.data.fullName,
            profilePic: data.data.profilePic
          });
        }
      });
  }
  onChangeUploadpic(event) {
    this.setState(
      {
        uploadpic: event.target.files[0]
      },
      () => {
        const data = new FormData();
        data.append('profilePic', this.state.uploadpic);
        data.append('id', this.state.id);
        axios
          .post('http://localhost:3001/update-photo', data, {})
          .then(data => {
            if (data) {
              this.setState({
                profilePic: data.data.data.profilePic
              });
              window.location.reload();
            }
          });
      }
    );
  }
  render() {
    return (
      <div className="profilebg" align="center" id="page-container">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
          <Bottom />
        </div>
        <div>
          <img
            className="img-circle"
            src={`${this.state.profilePic}`}
            alt="profile"
            height="150"
            width="150"
            border="0"
          />
          <div className="img-upld">
            <input
              type="file"
              className="img-upload"
              onChange={event => this.onChangeUploadpic(event)}
            />
          </div>
          <div className="P-name">{this.state.name}</div>
          <div>
            <Button.Group vertical className="sidenav">
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'account'
                  })
                }
                icon
                labelPosition="right"
              >
                Account
                <Icon name="angle right" />
              </Button>
              <Divider fitted />
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'address'
                  })
                }
                icon
                labelPosition="right"
              >
                Address
                <Icon name="angle right" />
              </Button>
              <Divider fitted />
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'number'
                  })
                }
                icon
                labelPosition="right"
              >
                Update Mobile Number
                <Icon name="angle right" />
              </Button>
              <Divider fitted />
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'password'
                  })
                }
                icon
                labelPosition="right"
              >
                Reset Password
                <Icon name="angle right" />
              </Button>
            </Button.Group>
          </div>
        </div>
        {this.state.displayContent === 'account' ? (
          <div>
            <Account />
          </div>
        ) : (
          <div />
        )}
        {this.state.displayContent === 'address' ? (
          <div>
            <Address />
          </div>
        ) : (
          <div />
        )}
        {this.state.displayContent === 'number' ? (
          <div>
            <Number />
          </div>
        ) : (
          <div />
        )}
        {this.state.displayContent === 'password' ? (
          <div>
            <Password />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Profile;
