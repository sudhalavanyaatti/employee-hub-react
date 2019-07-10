import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import Script from "react-load-script";
import '../App.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      category: "",
      phone: "",
      address: "",
      query: "",
      latitude: "",
      longitude: ""
    };
     // Bind Functions
     this.handleScriptLoad = this.handleScriptLoad.bind(this);
     this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }
  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ["(cities)"]
    }; 

    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
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

  handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address1 = addressObject.address_components;

    // Check if address is valid
    if (address1) {
      // Set State
      this.setState({
        address: address1[0].long_name,
        query: addressObject.formatted_address
      });
    }
    
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
    this.setState({
      category: event.target.value
    });
  }
  handleChangeNumber(event) {
    this.setState({
      phone: event.target.value
    });
  }
 

  async handleSubmit(event) {
    //  event.preventDefault();
    const data = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      category: this.state.category,
      phone: this.state.phone,
      address: this.state.address,
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
        if (response.message !== 'success') {
          alert('Try with another email');
        }
        this.props.history.push('/otpVal', {phone: this.state.phone});
      });
    //this.props.history.push("/otpVal", { phone: this.state.phone });
  }
  render() {
    return (
      <div className="signupbg">
        <Header/>
      
      <Row>
        <Col
          lgOffset={7}
          lg={3}
          mdOffset={6}
          md={4}
          smOffset={4}
          sm={4}
          xsOffset={1}
          xs={10}
        >
          <div>
            <Row center="xs">
              <Col>
                <h1>Register Here</h1>
              </Col>
            </Row>
            <input
              type="text"
              name="name"
              value={this.state.fullName}
              onChange={event => this.handleChangeFullname(event)}
              placeholder="Enter your Name"
              required
            />
            <br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={event => this.handleChangeEmail(event)}
              placeholder="Enter your Email"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={event => this.handleChangePass(event)}
              placeholder="Enter your Password"
              required
            />
            <br />
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={event => this.handleChangeCategory(event)}
              placeholder="Enter your Category"
              required
            />
            <br />
            <input
              type="tel"
              name="phone"
              maxLength="10"
              minLength="10"
              value={this.state.phone}
              onChange={event => this.handleChangeNumber(event)}
              placeholder="Don't prefix +91"
              required
            />
            <br />
            <div>
              <Script
                url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvcv2xuV3aMp9kPJOq1igVNAf2UceH0N8&libraries=places"
                onLoad={this.handleScriptLoad}
              />
              <input
                type="text"
                id="autocomplete"
                placeholder="enter address"
                value={this.state.query}
                required
              />
            </div>
            <Row center="xs">
              <Col>
                <button
                  className="button"
                  onClick={event => this.handleSubmit(event)}
                >
                  SignUp
                </button>
                <p>You have account??</p>
                <Link to="/signIn">SignIn</Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      </div>
    );
  }
}
export default Signup;
