import React, {Component} from 'react';
import Header from '../components/header';
import {Row, Col} from 'react-flexbox-grid';
import '../App.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender:'',
      email: '',
      mobile: '',
      category: '',
      address: '',
      dob: '',
      blood_Group: '',
      language: '',
      companyName: '',
      experience: '',
      join: ''
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
            address: data.data.address,
            dob: data.data.date_of_birth,
            blood_Group: data.data.blood_Group,
            language: data.data.language,
            companyName: data.data.company_name,
            experience: data.data.experience,
            join: data.data.join_date
          });
        }
      });
  }
  handleSubmit() {
    this.props.history.push('/update-details');
  }

  render() {
    return (
      <div className="profilebg">
        <Header />
        <table>
          <tr>
            <td>Name :</td>
            <td>{this.state.name}</td>
          </tr>
          <tr>
            <td>Gender :</td>
            <td>{this.state.gender}</td>
          </tr>
          <tr>
            <td>Email :</td>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <td>Mobile :</td>
            <td>{this.state.mobile}</td>
          </tr>
          <tr>
            <td>Category :</td>
            <td>{this.state.category}</td>
          </tr>
          <tr>
            <td>Address :</td>
            <td>{this.state.address}</td>
          </tr>
          <tr>
            <td>Date Of Birth :</td>
            <td>{this.state.dob}</td>
          </tr>
          <tr>
            <td>Blood Group :</td>
            <td>{this.state.blood_Group}</td>
          </tr>
          <tr>
            <td>Languages :</td>
            <td>{this.state.language}</td>
          </tr>
          <tr>
            <td>Company Name :</td>
            <td>{this.state.companyName}</td>
          </tr>
          <tr>
            <td>Experience :</td>
            <td>{this.state.experience}</td>
          </tr>
          <tr>
            <td>Date of Join :</td>
            <td>{this.state.join}</td>
          </tr>
        </table>
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
