import React, {Component} from 'react';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import {Row, Col} from 'react-flexbox-grid';
import '../App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: '',
      email: '',
      mobile: '',
      category: '',
      city: '',
      state: '',
      zip: '',
      dob: '',
      blood_Group: '',
      language: '',
      companyName: '',
      experience: '',
      join: '',
      profilePic: ''
    };
  }
  componentDidMount() {
    const data = {
      token: localStorage.getItem('token')
    };
    fetch('http://localhost:3001/profile', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('token', data);
        if (data) {
          this.setState({
            name: data.data.fullName,
            gender: data.data.gender,
            email: data.data.email,
            mobile: data.data.phone,
            category: data.data.category,
            city: data.data.city,
            state: data.data.state,
            zip: data.data.zip,
            dob: data.data.date_of_birth,
            blood_Group: data.data.blood_Group,
            language: data.data.language,
            companyName: data.data.company_name,
            experience: data.data.experience,
            join: data.data.join_date,
            profilePic: data.data.profilePic
          });
        }
      });
  }
  handleSubmit() {
    this.props.history.push('/update-details');
  }

  render() {
    return (
      <div className="profilebg" align="center">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
        </div>
        <h1 align="center">
          <strong>User Profile</strong>
        </h1>
        <br />
        <br />
        <img src={`${this.state.profilePic}`} alt="profile" height="180" width="180" />
       <div> 
       <table >
         <tbody>
         <tr>
            <td id="eg1">
              <strong>Name :</strong>
            </td >
            <td id="eg2">{this.state.name}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Gender :</strong>
            </td>
            <td id="eg2">{this.state.gender}</td>
          </tr>
          <tr>
            <td id="eg1" >
              <strong>Email :</strong>
            </td>
            <td id="eg2">{this.state.email}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Mobile :</strong>
            </td>
            <td id="eg2">{this.state.mobile}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Category :</strong>
            </td>
            <td id="eg2">{this.state.category}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>City :</strong>
            </td>
            <td id="eg2">{this.state.city}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>State :</strong>
            </td>
            <td id="eg2">{this.state.state}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Zip Code:</strong>
            </td>
            <td id="eg2">{this.state.zip}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Date Of Birth :</strong>
            </td>
            <td id="eg2">{this.state.dob}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Blood Group :</strong>
            </td>
            <td id="eg2">{this.state.blood_Group}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Languages :</strong>
            </td>
            <td id="eg2">{this.state.language}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Company Name :</strong>
            </td>
            <td id="eg2">{this.state.companyName}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Experience :</strong>
            </td>
            <td id="eg2">{this.state.experience}</td>
          </tr>
          <tr>
            <td id="eg1">
              <strong>Date of Join :</strong>
            </td>
            <td id="eg2">{this.state.join}</td>
          </tr>
         </tbody>
        </table>
       </div>
        <Row center="xs">
          <Col>
            <button className="button" onClick={() => this.handleSubmit()}>
              Update
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
