import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from "../components/sidebar";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';
import "../App.css";

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
        this.props.history.push('/passwordOtpVal', {phone: this.state.phone});
      });
  }
  render() {
    return (
      <div className="forgotpasswordbg">

        <div className="header">
            <div className="mobile-only">
               <SideBar/>
            </div>
            <div className="desktop-only">
                <Header/>
            </div>
            <Bottom/>
        </div><br/><br/><br/><br/><br/>

       <div className="col-md-4 col-md-offset-4">
       <MDBContainer>
       <h1 align="center"><br/><br/><strong>Forgot Password?</strong></h1>
          <MDBRow>
          <MDBCol md="11">
          <MDBInput
                 type="tel"
                 name="phone"
                 maxLength="10"
                 minLength="10"
                 value={this.state.phone}
                 onChange={event => this.handleChangephone(event)}
                 label="Enter Your Mobile Number"
                 icon="phone"
                 id="materialFormRegisterPhnEx" 
                 
                required
              >
              </MDBInput>
          </MDBCol>
          </MDBRow>
          <div align="center">
          <MDBBtn  color="blue" type="submit"  onClick={() => this.handleSubmit()}>
                Submit
          </MDBBtn>  
          </div><br/>
            <div align="center"  >
             <h5>  <Link id="linksize" to="/signIn">SignIn</Link>   </h5>
            </div> 
        </MDBContainer>
       </div>
      </div>
    );
  }
}

export default ForgotPassword;
