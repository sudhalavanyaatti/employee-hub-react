import React, { Component } from "react";
//import {Row, Col} from 'react-flexbox-grid';

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ""
    };
  }
  handleChangeNumber(event) {
    this.setState({
      otp: event.target.value
    });
  }
  handleSubmit(event) {
    
  }
  render() {
    return (
      <div className="text1">
        <input
          type="tel"
          name="otp"
          maxLength="6"
          minLength="6"
          value={this.state.otp}
          onChange={event => this.handleChangeNumber(event)}
          placeholder="Enter your OTP"
        />
        <br />
        <br />
        <button className="button" onClick={() => this.handleSubmit()}>
          Submit
        </button>
      </div>
    );
  }
}

export default Otp;
