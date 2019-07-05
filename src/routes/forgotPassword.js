import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }
  handleChangephone(event) {
    this.setState({
      phone: event.target.value
    });
  }
  async handleSubmit(event) {
    const data = {
      phone: this.state.phone
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
        this.props.history.push('/passwordOtpVal',{phone: this.state.phone});
      });
  }
  render() {
    return (
      <div>
        <Row center="xs">
          <Col xs={3}>
          <Row center="xs">
              <Col>
                <h1>Forgot Password</h1>
              </Col>
            </Row>
            <input
              type="tel"
              name="phone"
              value={this.state.phone}
              onChange={event => this.handleChangephone(event)}
              placeholder="Enter your Mobile Number"
            />
            <br />
            <br />
            <button className="button" onClick={() => this.handleSubmit()}>
              Submit
            </button>
            <br />
            <br />
            <Link to="/signIn">SignIn</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ForgotPassword;
