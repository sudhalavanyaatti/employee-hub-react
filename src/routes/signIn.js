import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/sidebar";
//import {Row, Col} from 'react-flexbox-grid';
import Header from "../components/header";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBModalFooter
} from "mdbreact";
//import 'font-awesome/css/font-awesome.min.css';
import "mdbreact/dist/css/mdb.css";
import "../App.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.props.history.push("/details");
    }
  }

  handleChange(event) {
    this.setState({
      phone: event.target.value
    });
  }

  handleChangePass(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(data) {
    data = {
      phone: this.state.phone,
      password: this.state.password
    };
    //console.log('data', data);
    fetch("http://localhost:3001/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          console.log("status", data.data.twilioStatus);
          if (data.data === "incorrect") alert("Invalid Login");
          else if (data.data === "statusFalse") {
            this.props.history.push("/phoneNumberVal");
          } else {
            localStorage.setItem("token", data.token);
            this.props.history.push("/details");
          }
        } else {
          alert("You are not Registered..!");
          this.props.history.push("/signup");
        }
      });
  }

  render() {
    return (
      <div className="signinbg">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
        </div>

        <div className="col-md-4 col-md-offset-4">
          <MDBContainer>
            <h1 align="center">
              <strong>Login Here</strong>
            </h1>

            <MDBRow>
              <MDBCol md="11">
                <MDBInput
                  type="tel"
                  name="phone"
                  maxLength="10"
                  minLength="10"
                  value={this.state.phone}
                  onChange={event => this.handleChange(event)}
                  label="Phone no:"
                  icon="phone"
                  id="materialFormRegisterPhnEx"
                  required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="11">
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
            <div align="center">
              <MDBBtn
                gradient="blue"
                type="submit"
                onClick={() => this.handleSubmit()}
              >
                Submit
              </MDBBtn>
            </div>

            <MDBModalFooter>
              <div align="center">
                <Link to="/forgotPassword">
                  <strong>Forgot Password ?</strong>
                </Link>
                <p>
                  <h3>Not a member?</h3>
                </p>{" "}
                <Link to="/signup">
                  <strong>Signup</strong>
                </Link>
              </div>
            </MDBModalFooter>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default SignIn;
