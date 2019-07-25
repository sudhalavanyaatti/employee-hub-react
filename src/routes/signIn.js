import React from 'react';
import {Link} from 'react-router-dom';
import SideBar from '../components/sidebar';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import Bottom from '../components/bottom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBModalFooter
} from 'mdbreact';
import 'font-awesome/css/font-awesome.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../App.css';

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
        if (data.data) {
          console.log('status', data.data.twilioStatus);
          if (data.data === 'incorrect') {
            alert('Invalid Login');
            window.location.reload();
          } else if (data.data === 'statusFalse') {
            this.props.history.push('/phoneNumberVal');
          } else {
            localStorage.setItem('token', data.token);
            this.props.history.push('/details');
          }
        } else {
          alert('You are not Registered..!');
          this.props.history.push('/signup');
        }
      });
  }

  render() {
    return (
      <div className="signinbg" id="page-container">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
          <Bottom />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

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
                color="blue"
                type="submit"
                onClick={() => this.handleSubmit()}
              >
                Submit
              </MDBBtn>
            </div>
            <br />

            <MDBModalFooter>
              <div align="center">
                <h5>
                  <Link id="linksize" to="/forgotPassword">
                    Forgot Password ?
                  </Link>
                  <br />
                  Not a member?
                  <Link id="linksize" to="/signup">
                    Signup
                  </Link>
                </h5>
              </div>
            </MDBModalFooter>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default SignIn;
