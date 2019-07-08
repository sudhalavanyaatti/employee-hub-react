import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";
import "../style.css";

class Header extends Component {
  state = {
    login: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    this.setState({
      login: this.props.login
    });
  }

  render() {
    return (
      <div className="navbar">
        <Row>
          <Col xs={12} className="col">
            <Row end="xs">
              <Col xs={3} className="col">
                <div>
                  <Link to="/">Home</Link>
                  <Link to="/signIn">
                    {!this.state.login ? "SignIn" : "Sign Out"}
                  </Link>
                  <Link to="/about">About</Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
