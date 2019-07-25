import React, {Component} from 'react';
import { withRouter } from 'react-router';
import '../App.css';
import '../style.css';
class Number extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      umobile: '',
      otp: '',
      otpView: false
    };
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
          this.setState({
            otpView: true
          });
        } else alert('Enter valid number');
      });
  }
  Otp() {
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
        <button type="submit" className="bstyle" onClick={() => this.handleOtp()}>
          Submit
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" className="bstyle" onClick={() => this.handleResendOtp()}>
          Resend
        </button>
        
      </div>
    );
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
            window.location.reload();
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
        if(response)
        window.location.reload();
      });
  }
  render() {
    return (
      <div>
        {!this.state.otpView ? (
          <div className="p-page">
          
            <h2><strong>Update Mobile Number</strong></h2>
            
            <input
              type="tel"
              maxLength="10"
              minLength="10"
              value={this.state.umobile}
              onChange={event => this.handleChangeUmobile(event)}
              placeholder="Mobile Number"
            />
            <button type="submit" className="bstyle" onClick={() => this.handleNumber()}>
              Submit
            </button>
          </div>
        ) : (
          <div>{this.Otp()}</div>
        )}
      </div>
    );
  }
}
export default withRouter(Number);
