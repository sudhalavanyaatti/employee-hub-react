import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import "../App.css";

// import _ from 'lodash';
// import isEqual from 'lodash/isEqual';
class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      phone: ''
    };
  }

  handleChange(event) {
    this.setState({
      newPassword: event.target.value
    });
  }

  handleChangePass(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  async handleSubmit(data) {
    data = {
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
      phone: this.props.location.state.phone
    };
    console.log(data);
    if (this.state.newPassword === this.state.confirmPassword) {
      await fetch('http://localhost:3001/update-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.props.history.push('/signIn');
          // localStorage.setItem("token", data.token);
        });
    } else alert('Enter Same Password');
    //this.props.history.push("/details");
    //     }
    //     else
    //     alert('Enter correct Password');
  }

  render() {
    return (
      <div className="newpasswordbg">
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
                <h1>Reset Your password</h1>
              </Col>
            </Row>
            <input
              type="password"
              name="newPassword"
              value={this.state.newPassword}
              onChange={event => this.handleChange(event)}
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={event => this.handleChangePass(event)}
              placeholder="Confirm Password"
            />
            <Row center="xs">
              <Col>
                <button className="button" onClick={() => this.handleSubmit()}>
                  SignIn
                </button>
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

export default NewPassword;
