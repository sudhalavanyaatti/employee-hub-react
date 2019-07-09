import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: ''
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.props.history.push('/details');
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
    fetch('http://localhost:3001/login', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        console.log('status', data.data.twilioStatus);
        if (!data.data.twilioStatus) {
          this.props.history.push('/phoneNumberVal');
        }
        else
        this.props.history.push('/details');
      });
  }

  render() {
    return (
      <div>
        <Header />

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
                  <button
                    className="button"
                    onClick={() => this.handleSubmit()}
                  >
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
      </div>
    );
  }
}
export default SignIn;
