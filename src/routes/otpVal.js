import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";
import Header from '../components/header';


class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      phone: ''
    };
  }
  handleChangeNumber(event) {
    this.setState({
      otp: event.target.value
    });
  }
  async handleSubmit(event) {
    const data = {
      otp: this.state.otp,
      phone: this.props.location.state.phone
    };
    //console.log('phone otp', data);
    await fetch("http://localhost:3001/validate-otp", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if(!response.response.success)
        alert('Enter valid OTP');
        else
        this.props.history.push('/signIn');
      });
  }
  async handleSubmitresend(event) {
    const data = {
      phone: this.props.location.state.phone
    };
    //console.log('phone otp', data);
    await fetch('http://localhost:3001/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        //this.props.history.push('/passwordOtpVal',{phone: this.state.phone});
      });
  }
  render() {
    return (
      <div>
        <Header />
        <Row center="xs">
          <Col xs={3} className="col">
          <Row center="xs">
              <Col>
                <h1>Enter your OTP</h1>
              </Col>
            </Row>
            <input
              type="tel"
              name="otp"
              maxLength="6"
              minLength="6"
              value={this.state.otp}
              onChange={event => this.handleChangeNumber(event)}
              placeholder="6 Digits OTP"
            />
            <br />
            <br />
            <button className="button" onClick={() => this.handleSubmit()}>
              Submit
            </button>
            <button className="button" onClick={() => this.handleSubmitresend()}>
              Resend OTP
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Otp;
