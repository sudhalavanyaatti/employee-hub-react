import React, {Component} from 'react';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from '../../../employee-hub/src/components/sidebar';
import {Row, Col} from 'react-flexbox-grid';
import '../App.css';
import '../style.css';

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
          <Bottom/>
        </div>
        <br/><br/><br/> <br/>
  <table class="table table-borderless" id="table1">
  <tbody>
    <tr>
            <td id="eg3">
              <img className="img-circle" src={`${this.state.profilePic}`} alt="profile" height="180" width="180" />
              <h1 align="center">{this.state.name}</h1>
           </td>
            <td>
                <table id="table2">
                  <tbody>
                  <tr>
                    <td id="eg1"><strong>Name:</strong> &nbsp;&nbsp;&nbsp; {this.state.name}</td >
                    <td id="eg1"><strong>Mobile:</strong> &nbsp;&nbsp;&nbsp; {this.state.mobile}</td > 
                 </tr>
                 <tr>
                    <td id="eg1"><strong>Email:</strong> &nbsp;&nbsp;&nbsp; {this.state.email}</td >
                    <td id="eg1"><strong>Gender:</strong> &nbsp;&nbsp;&nbsp; {this.state.gender}</td >
                </tr>
                <tr>
                    <td id="eg1"><strong>Category:</strong> &nbsp;&nbsp;&nbsp; {this.state.category}</td >
                    <td id="eg1"><strong>Date Of Birth:</strong> &nbsp;&nbsp;&nbsp; {this.state.dob}</td >
    
                </tr>
                <tr>
                    <td id="eg1"><strong>Company :</strong> &nbsp;&nbsp;&nbsp; {this.state.companyName}</td >
                    <td id="eg1"><strong>Blood Group:</strong> &nbsp;&nbsp;&nbsp; {this.state.blood_Group}</td >  
                </tr>
                <tr>
                    <td id="eg1"><strong>Experience:</strong> &nbsp;&nbsp;&nbsp; {this.state.experience}</td >
                    <td id="eg1"><strong>Zip Code:</strong> &nbsp;&nbsp;&nbsp; {this.state.zip}</td >
 
                </tr>
                <tr>
               
                <td id="eg1"><strong>Languages:</strong> &nbsp;&nbsp;&nbsp; {this.state.language}</td >
                 <td id="eg1"><strong>City:</strong> &nbsp;&nbsp;&nbsp; {this.state.city}</td >
                </tr>
                <tr>
                
                <td id="eg1"><strong>Date of Join:</strong> &nbsp;&nbsp;&nbsp; {this.state.join}</td >
                <td id="eg1"><strong>State:</strong> &nbsp;&nbsp;&nbsp; {this.state.state}</td >
                </tr>
                
                  </tbody>
                </table>
                </td>
     </tr>
  
  </tbody>
</table><br/>
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











 
  