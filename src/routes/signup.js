import React from 'react';
import {Link} from 'react-router-dom';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
//import Script from "react-load-script";
import Select from 'react-select';
import options from '../components/category';
import '../App.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import "mdbreact/dist/css/mdb.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      category: "",
      phone: "",
      city:"",
      state:"",
      zip:"",
      latitude: "",
      longitude: ""
    };
    
  }
 
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude + " " + position.coords.longitude);

      this.setState(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        () => console.log("lat:"+ this.state.latitude)
      );
    });
  }

  
  handleChangeFullname(event) {
    this.setState({
      fullName: event.target.value
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleChangePass(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleChangeCategory(event) {
    this.setState({category: event});
  }
  handleChangeNumber(event) {
    this.setState({
      phone: event.target.value
    });
  }
  handleChangeCity(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleChangeState(event) {
    this.setState({
      state: event.target.value
    });
  }
  handleChangeZip(event) {
    this.setState({
      zip: event.target.value
    });
  }


  async handleSubmit(data) {
    //  event.preventDefault();
     data = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      category: this.state.category.value,
      phone: this.state.phone,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    console.log('data', data);
    await fetch('http://localhost:3001/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.message !== 'success') {
          alert('Mobile number already exists');
        }
        else
        this.props.history.push('/otpVal', {phone: this.state.phone});
      });
    //this.props.history.push("/otpVal", { phone: this.state.phone });
  }
  render() {
    return (
      <div >
        <Header/>
        <div className="col-md-4 col-md-offset-4">
          <MDBContainer>
            
              <h1 align="center">Register Here</h1>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    type="text"
                    name="name"
                    value={this.state.fullName}
                    onChange={event => this.handleChangeFullname(event)}
                    label="Full Name"
                    id="materialFormRegisterNameEx"
                    required
                  />
                </MDBCol>
                <MDBCol md="6">
                <Select
                options={options}
                value={this.state.category}
                name="category"
                placeholder="Select Category"
                onChange={event => this.handleChangeCategory(event)}
                    label="Category"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={event => this.handleChangeEmail(event)}
                    id="materialFormRegisterEmailEx2"
                    label="Email"
                    required
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    type="tel"
                    name="phone"
                    maxLength="10"
                    minLength="10"
                    value={this.state.phone}
                    onChange={event => this.handleChangeNumber(event)}
                    id="materialFormRegisterPhnEx2"
                    label="Phone "
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={event => this.handleChangePass(event)}
                    id="materialFormRegisterPasswordEx2"
                    label="Password"
                    required
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    name="city"
                    type="text"
                    value={this.state.city}
                    onChange={event => this.handleChangeCity(event)}
                    id="materialFormRegisterCityEx2"
                    label="City"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    type="text"
                    name="zip"
                    id="materialFormRegisterZipEx2"
                    value={this.state.zip}
                    onChange={event => this.handleChangeZip(event)}
                    label="Zip"
                    required
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    name="state"
                    type="text"
                    value={this.state.state}
                    onChange={event => this.handleChangeState(event)}
                    id="materialFormRegisterStateEx2"
                    label="State"
                    required
                  />
                </MDBCol>
              </MDBRow>

              <div align="center">
                <MDBBtn
                  color="success"
                  type="submit"
                  onClick={() => this.handleSubmit()}
                >
                  Submit
                </MDBBtn>
              </div>
            <div align="center">
              <p>You have account??</p>
              <Link to="/signIn">SignIn</Link>
            </div>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default Signup;
