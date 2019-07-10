import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import "../App.css";

class NumberVal extends Component {
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
        this.props.history.push('/otpVal', {phone: this.state.phone});
      });
  }
  render() {
    return (
      <div className="phnobg">
        <Header />
        <Row center="xs">
          <Col xs={3}>
            <Row center="xs">
              <Col>
                <h1>Enter Your Mobile Number</h1>
              </Col>
            </Row>
            <input
              type="tel"
              name="phone"
              value={this.state.phone}
              onChange={event => this.handleChangephone(event)}
              placeholder="Mobile Number"
            />
            <br />
            <br />
            <button className="button" onClick={() => this.handleSubmit()}>
              Submit
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NumberVal;
