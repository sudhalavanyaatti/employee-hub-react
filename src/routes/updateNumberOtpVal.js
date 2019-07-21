import React, {Component} from 'react';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from "../components/sidebar";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';
import "../App.css";

class Number_OtpValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      phone: '',
      id:''
    };
  }
  handleChangeNumber(event) {
    this.setState({
      otp: event.target.value
    });
  }
   handleSubmit(data) {
     data = {
      otp: this.state.otp,
      phone: this.props.location.state.phone,
      id:this.props.location.state.id
    };
    console.log('otp', data);
     fetch('http://localhost:3001/updateNumber-OtpVal', {
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
          this.props.history.push('/profile');
        }
      });
  }
   handleSubmitresend(data) {
    data = {
      phone: this.props.location.state.phone
    };
    //console.log('phone otp', data);
     fetch('http://localhost:3001/resend-otp', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
  }
  render() {
    return (
      <div className="passwordbg">
            <div className="header">
          <div className="mobile-only">
             <SideBar/>
          </div>
          <div className="desktop-only">
               <Header/>
          </div>
          <Bottom/>
        </div>
        <div className="col-md-4 col-md-offset-4" >
        <MDBContainer>  
        <h1 align="center"><br/><br/><strong>Update Mobile OTP</strong></h1>
        <MDBRow>
             <MDBCol md="11">
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
           <div align="center">
              <MDBBtn  gradient="blue" type="submit"  onClick={() => this.handleSubmit()}>
                Submit
              </MDBBtn>  
              <MDBBtn  gradient="blue" type="submit"  onClick={() => this.handleSubmitresend()}>
                Resend OTP
              </MDBBtn>      
           </div>    
        </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Number_OtpValidation;
