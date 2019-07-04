import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      category: "",
      phone: "",
      address: ""
    };
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
  handleChangeAddress(event) {
    this.setState({
      address: event.target.value
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
      address: this.state.address
    };
    console.log("data", data);
    await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      });
    this.props.history.push("/otpVal", { phone: this.state.phone });
  }
  render() {
    return (
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
            />
            <br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={event => this.handleChangeEmail(event)}
              placeholder="Enter your Email"
            />
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={event => this.handleChangePass(event)}
              placeholder="Enter your Password"
            />
            <br />
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={event => this.handleChangeCategory(event)}
              placeholder="Enter your Category"
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
            />
            <br />
            <textarea
              rows="5"
              cols="30"
              name="address"
              value={this.state.address}
              onChange={event => this.handleChangeAddress(event)}
              placeholder="Enter your Address"
              textarea
            />
            <br />
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
    );
  }
}
export default Signup;
