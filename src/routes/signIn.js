import React from 'react';
import {Link} from 'react-router-dom';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';

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
        if(data.data)
        {
        localStorage.setItem('token', data.token);
        console.log('status', data.data.twilioStatus);
        if(data.data==='incorrect')
        alert('Invalid Login');
       else if (!data.data.twilioStatus) {
          this.props.history.push('/phoneNumberVal');
        }
        else
        this.props.history.push('/details');
      }
      else{
        alert('You are not Registered..!');
        this.props.history.push('/signup');
      }
      });
    
  }

  render() {
    return (
      <div   >
         <Header />
        <div className="col-md-4 col-md-offset-4" >
       <MDBContainer>
        
          <h1 align="center">Login Here</h1>
          
          <MDBRow  >
            <MDBCol md="10">
              <MDBInput
                 type="tel"
                 name="phone"
                 maxLength="10"
                 minLength="10"
                 value={this.state.phone}
                 onChange={event => this.handleChange(event)}
                 label="Phone no:"
                 id="materialFormRegisterPhnEx"
                
                required
              >
              </MDBInput>
            </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol md="10">
              <MDBInput
                type="password"
                name="password"
                value={this.state.password}
                onChange={event => this.handleChangePass(event)}
                id="materialFormRegisterPasswordEx2"
                label="Password:"
                required
              >
              </MDBInput>
            </MDBCol>
          </MDBRow>
       <div class="col-md-3 col-md-offset-4">
           
       <MDBBtn  color="success" type="submit"  onClick={() => this.handleSubmit()}>
            Submit
          </MDBBtn>  
              
         </div>    
  
       <div  align="center">
       <Link to="/forgotPassword">Forgot Password ?</Link>
                  <p>Create an account?</p>
                  <Link to="/signup">Signup</Link>
       </div>
       </MDBContainer>
        </div>
      </div>
      
    );
  }
}
export default SignIn;
