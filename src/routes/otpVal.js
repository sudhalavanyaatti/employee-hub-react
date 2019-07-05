import React, {Component} from 'react';
//import {Row, Col} from 'react-flexbox-grid';

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      phone: ''
    };
  }

  // componentDidMount() {
  //   console.log('props', this.props);
  //   const {state} = this.props.location;
  //   if (state !== undefined) {
  //     this.props.history.push('/otpVal');
  //     this.setState({
  //       phone: state.phone
  //     });
  //   }
  //   this.props.history.push('/signup');
  // }

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
    console.log('phone otp', data);
    await fetch('http://localhost:3001/validate-otp', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        this.props.history.push('/signIn');
      });
  }

  render() {
    return (
      <div>
        <input
          type="tel"
          name="otp"
          maxLength="6"
          minLength="6"
          value={this.state.otp}
          onChange={event => this.handleChangeNumber(event)}
          placeholder="Enter your OTP"
        />

        <button className="button" onClick={() => this.handleSubmit()}>
          Submit
        </button>
      </div>
    );
  }
}

export default Otp;
