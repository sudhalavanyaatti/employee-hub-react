import React, {Component} from 'react';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from "../components/sidebar";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';
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
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log('gf',response);
        if(response.response!=='null')
        this.props.history.push('/otpVal', {phone: this.state.phone});
        else
        alert('Enter valid number');
      });
  }
  render() {
    return (
      <div className="phnobg">
        
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
       <h1 align="center"><br/><br/><strong>Enter Mobile No.</strong></h1>
       <MDBRow>
          <MDBCol md="11" >
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
           </div>
       </MDBContainer>
       </div>
      </div>
    );
  }
}

export default NumberVal;
