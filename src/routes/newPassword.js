import React from 'react';
import {Link} from 'react-router-dom';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
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
      <div className="newpassbg">
        <Header/>
       <div className="col-md-4 col-md-offset-4">
       <MDBContainer>
         <h1 ><br/><strong>Reset Your Password</strong></h1>
       
        <MDBRow  >
            <MDBCol md="9">
              <MDBInput
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={event => this.handleChange(event)}
                 label="New Password"
                 id="materialFormRegisterPassEx"
                
                required
              >
              </MDBInput>
            </MDBCol>
            </MDBRow>
            <MDBRow  >
            <MDBCol md="9">
              <MDBInput
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={event => this.handleChangePass(event)}
                 label="Confirm Password"
                 id="materialFormRegisterPhnEx"
                
                required
              >
              </MDBInput>
            </MDBCol>
            </MDBRow>
           <MDBBtn  gradient="blue" type="submit"  onClick={() => this.handleSubmit()}>
                Submit
          </MDBBtn> 
              <div>
              <Link to="/signIn"><strong>SignIn</strong></Link>   
            </div> 
        </MDBContainer>
       </div>      
      </div>
    );
  }
}

export default NewPassword;
