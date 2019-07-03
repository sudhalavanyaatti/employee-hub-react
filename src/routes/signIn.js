import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleChangePass(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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
              type="email"
              name="email"
              value={this.state.email}
              onChange={event => this.handleChange(event)}
              placeholder="Email"
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
