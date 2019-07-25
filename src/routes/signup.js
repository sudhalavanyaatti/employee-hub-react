import React from 'react';
import {Link} from 'react-router-dom';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from '../components/sidebar';
//import Select from 'react-select';
//import options from '../components/category';
import '../App.css';
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      category: '',
      phone: '',
      city: '',
      state: '',
      zip: '',
      latitude: '',
      longitude: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude + ' ' + position.coords.longitude);

      this.setState(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        () => console.log('lat:' + this.state.latitude)
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
    this.setState({category: event.target.value});
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
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async handleSubmit(data) {
    //  event.preventDefault();

    data = {
      fullName: this.Capitalize(this.state.fullName),
      email: this.state.email,
      password: this.state.password,
      category: this.Capitalize(this.state.category),
      phone: this.state.phone,
      city: this.Capitalize(this.state.city),
      state: this.Capitalize(this.state.state),
      zip: this.state.zip,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
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
        if (response.response !== 'null') {
          this.props.history.push('/otpVal', {phone: this.state.phone});
        } else alert('Use Another Mobile Number');
      });
  }
  render() {
    return (
      <div className="signupbg" id="page-container">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
          <Bottom />
        </div>

        <div className="col-md-4 col-md-offset-4">
          <MDBContainer>
            <h1 align="center">
              <br />
              <br />
              <strong>Register Here</strong>
            </h1>
            <br />
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  type="text"
                  name="name"
                  value={this.state.fullName}
                  onChange={event => this.handleChangeFullname(event)}
                  label="Full Name:"
                  icon="user"
                  id="materialFormRegisterNameEx"
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
                  label="Phone: "
                  icon="phone"
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
                  label="Email:"
                  icon="envelope"
                  required
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={event => this.handleChangePass(event)}
                  id="materialFormRegisterPasswordEx2"
                  label="Password:"
                  icon="lock"
                  required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  //options={options}
                  type="text"
                  value={this.state.category}
                  name="category"
                  onChange={event => this.handleChangeCategory(event)}
                  label="Category:"
                  icon="th-large"
                  required
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  type="text"
                  name="zip"
                  id="materialFormRegisterZipEx2"
                  value={this.state.zip}
                  onChange={event => this.handleChangeZip(event)}
                  maxLength="6"
                  label="Zip:"
                  icon="file"
                  required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  name="city"
                  type="text"
                  value={this.state.city}
                  onChange={event => this.handleChangeCity(event)}
                  id="materialFormRegisterCityEx2"
                  label="City:"
                  icon="home"
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
                  label="State:"
                  icon="map-marker"
                  required
                />
              </MDBCol>
            </MDBRow>

            <div align="center">
              <MDBBtn
                color="blue"
                type="submit"
                onClick={() => this.handleSubmit()}
              >
                Submit
              </MDBBtn>
            </div>
            <br />
            <div align="center">
              <h5>
                You have account?
                <Link id="linksize" to="/signIn">
                  SignIn
                </Link>
              </h5>
            </div>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Signup;
