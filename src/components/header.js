import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";
import "../style.css";

class Header extends Component {
  render() {
    return (
      <div className="navbar">
        <Row>
          <Col xs={12} className="col">
            <Row end="xs">
              <Col xs={3} className="col">
                <div>
                  <Link to="/">Home</Link>
                  <Link to="/signIn">SignIn</Link>
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
