import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: ""
    };
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
    console.log(data);

    fetch("http://localhost3001/login", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.token);
      });
    //this.props.history.push("/details");
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
                <h1>Login Here</h1>
              </Col>
            </Row>
            <input
              type="tel"
              name="phone"
              maxLength="10"
              minLength="10"
              value={this.state.phone}
              onChange={event => this.handleChange(event)}
              placeholder="Mobile Number"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={event => this.handleChangePass(event)}
              placeholder="Password"
            />
            <Row center="xs">
              <Col>
                <button className="button" onClick={() => this.handleSubmit()}>
                  SignIn
                </button>
                <Link to="/forgotPassword">Forgot Password ?</Link>
                <p>Create an account?</p>
                <Link to="/signup">Signup</Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default SignIn;
