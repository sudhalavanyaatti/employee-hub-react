import React, {Component} from 'react';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from '../components/sidebar';
import {Button} from 'semantic-ui-react';
import '../App.css';
import '../style.css';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      profilePic: '',
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
            profilePic: data.data.profilePic
          });
        }
      });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleChangeCity(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleChangeState(event) {
    this.setState({
      state: event.target.value
    });
  }
  handleChangeZip(event) {
    this.setState({
      zip: event.target.value
    });
  }
  handleChangeUmobile(event) {
    this.setState({
      umobile: event.target.value
    });
  }
  handleChangeotp(event) {
    this.setState({
      otp: event.target.value
    });
  }
  handleChangeCpassword(event) {
    this.setState({
      curpassword: event.target.value
    },()=>{
    
    const data = {
  
      password: this.state.curpassword
     
    };
    console.log('pass',data)
    fetch('http://localhost:3001/dec-password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          decpassword: data.data
        });
      });
    });
    
  }
  handleChangeNpassword(event) {
    this.setState({
      newpassword: event.target.value
    });
  }
  handleChangeConfirmPass(event) {
    this.setState({
      conpassword: event.target.value
    });
  }

  handleAddress(data) {
    data = {
      id: this.state.id,
      city: this.Capitalize(this.state.city),
      state: this.Capitalize(this.state.state),
      zip: this.state.zip
    };
    fetch('http://localhost:3001/update-details', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
  }
  handleNumber(data) {
    data = {
      phone: this.state.umobile
    };
    fetch('http://localhost:3001/update-number', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.response.success) {
          this.Otp();
        } else alert('Enter valid number');
      });
  }
  handleOtp(data) {
    data = {
      id: this.state.id,
      phone: this.state.umobile,
      otp: this.state.otp
    };
    fetch('http://localhost:3001/updateNumber-OtpVal', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.response.success) {
          alert('enter Valid OTP');
        } else {
          this.props.history.push('/profile');
        }
      });
  }
  handleResendOtp(data) {
    data = {
      phone: this.state.umobile
    };
    fetch('http://localhost:3001/resend-otp', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
  }
  handlePassword(data) {
    console.log('svd', this.state.decpassword);
    console.log('wfe', this.state.password);
    if (this.state.decpassword === this.state.password) {
      data = {
        newPassword: this.state.newpassword,
        confirmPassword: this.state.conpassword,
        phone: this.state.phone
      };
      if (this.state.newpassword === this.state.conpassword) {
        fetch('http://localhost:3001/update-password', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(res => res.json())
          .then(data => {
            alert('Password Updated successfully...!');
            this.props.history.push('/profile');
          });
      } else alert('Enter Same Password');
    } else alert('Enter Correct Password');
  }
  
  address() {
    return (
      <div className="p-page">
        <h2>Address</h2>
        <input
          type="text"
          value={this.state.city}
          onChange={event => this.handleChangeCity(event)}
          placeholder="City"
        />
        <input
          type="text"
          value={this.state.state}
          onChange={event => this.handleChangeState(event)}
          placeholder="State"
        />
        <input
          type="tel"
          value={this.state.zip}
          onChange={event => this.handleChangeZip(event)}
          placeholder="Zip"
          minLength="6"
          maxLength="6"
        />
        <button type="submit" onClick={() => this.handleAddress()}>
          Save
        </button>
      </div>
    );
  }
  number() {
    return (
      <div className="p-page">
        <h2>Updare Mobile Number</h2>
        <input
          type="tel"
          maxLength="10"
          minLength="10"
          value={this.state.umobile}
          onChange={event => this.handleChangeUmobile(event)}
          placeholder="Mobile Number"
        />
        <button type="submit" onClick={() => this.handleNumber()}>
          Submit
        </button>
      </div>
    );
  }
  Otp() {
    console.log('dhcb db');
    return (
      <div className="p-page">
        <h2>Enter your Otp</h2>
        <input
          type="tel"
          maxLength="6"
          minLength="6"
          value={this.state.otp}
          onChange={event => this.handleChangeotp(event)}
          placeholder="OTP"
        />
        <button type="submit" onClick={() => this.handleOtp()}>
          Submit
        </button>
        <button type="submit" onClick={() => this.handleResendOtp()}>
          Resend OTP
        </button>
      </div> 
    );
  }
  password() {
    return (
      <div className="p-page">
        <h2>Reset Password</h2>
        <input
          type="password"
          value={this.state.currentpassword}
          onChange={event => this.handleChangeCpassword(event)}
          placeholder="Current Password"
        />
        <input
          type="password"
          value={this.state.newpassword}
          onChange={event => this.handleChangeNpassword(event)}
          placeholder="New Password"
        />
        <input
          type="text"
          value={this.state.confirmpassword}
          onChange={event => this.handleChangeConfirmPass(event)}
          placeholder="Confirm Password"
        />
        <button type="submit" onClick={() => this.handlePassword()}>
          Update
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="profilebg" align="center">
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
            height="180"
            width="180"
          />

          <div className="P-name">{this.state.name}</div>
          <div>
            <Button.Group vertical className="sidenav">
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'account'
                  })
                }
              >
                Account
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'address'
                  })
                }
              >
                Address
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'number'
                  })
                }
              >
                Update Mobile Number
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    displayContent: 'password'
                  })
                }
              >
                Reset Password
              </Button>
            </Button.Group>
          </div>
        </div>
        {this.state.displayContent === 'account' ? (
          <div>{this.renderAccount()}</div>
        ) : (
          <div />
        )}
        {this.state.displayContent === 'address' ? (
          <div>{this.address()}</div>
        ) : (
          <div />
        )}
        {this.state.displayContent === 'number' ? (
          <div>{this.number()}</div>
        ) : (
          <div />
        )}
        {this.state.displayContent === 'password' ? (
          <div>{this.password()}</div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Profile;
