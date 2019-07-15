import React, {Component} from 'react';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';
import "../App.css";

class PassOtpValidation extends Component {
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
    console.log('otp', data);
    await fetch('http://localhost:3001/password-OtpVal', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.response.success) {
          alert('enter Valid OTP');
        } else {
          this.props.history.push('/newPassword', {
            phone: this.props.location.state.phone
          });
        }
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
      <div className="passwordbg">
        <Header />
        <div className="col-md-4 col-md-offset-4" >
        <MDBContainer>  
        <h1><br/><strong>Password OTP</strong></h1>
        <MDBRow>
             <MDBCol md="9">
             <MDBInput
                 type="tel"
                 name="otp"
                 maxLength="6"
                 minLength="6"
                 value={this.state.otp}
                 onChange={event => this.handleChangeNumber(event)}
                 label="6 Digits OTP"
                 icon="comment"
                 id="materialFormRegisterotpEx"              
              >
              </MDBInput>
             </MDBCol>
           </MDBRow>
           <MDBBtn  gradient="blue" type="submit"  onClick={() => this.handleSubmit()}>
                Submit
              </MDBBtn>  
              <MDBBtn  gradient="blue" type="submit"  onClick={() => this.handleSubmitresend()}>
                Resend OTP
              </MDBBtn>          
        </MDBContainer>
        </div>
      </div>
    );
  }
}

export default PassOtpValidation;
