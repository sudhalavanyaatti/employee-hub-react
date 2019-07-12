import React, {Component} from 'react';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
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
        <div className="col-md-4 col-md-offset-4">
       <MDBContainer>
       <h1><br/><strong>Enter Mobile No.</strong></h1>
       <MDBRow>
          <MDBCol md="8">
          <MDBInput
                 type="tel"
                 name="phone"
                 maxLength="10"
                 minLength="10"
                 value={this.state.phone}
                 onChange={event => this.handleChangephone(event)}
                 label="Enter Your Mobile Number"
                 id="materialFormRegisterPhnEx" 
                 
                required
              >
              </MDBInput>
          </MDBCol>
          </MDBRow>
          <MDBBtn  gradient="blue" type="submit"  onClick={() => this.handleSubmit()}>
                Submit
          </MDBBtn>  
       </MDBContainer>
       </div>
      </div>
    );
  }
}

export default NumberVal;
