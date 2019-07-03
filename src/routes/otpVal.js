import React, {Component} from 'react';
//import {Row, Col} from 'react-flexbox-grid';
class Otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          otp: '',
        };
      }
    handleChangeNumber(event) {
        this.setState({
          Number: event.target.value
        });
      }
      handleSubmit(event) {
        event.preventDefault();
      }
  render() {
    return (
        <div className="text1">
        <form onSubmit={event => this.handleSubmit(event)}>
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
        <button className="button">Submit</button>
      </form>
      </div>
    );
  }
}

export default Otp;
