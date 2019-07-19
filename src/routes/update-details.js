import axios from 'axios';
//import btoa from 'btoa';
import React from 'react';
//import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import SideBar from '../components/sidebar';
//import Select from 'react-select';
//import options from '../components/category';
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '../App.css';
class Update_Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fullName: '',
      gender: '',
      email: '',
      category: '',
      phone: '',
      city: '',
      zip: '',
      state: '',
      dob: '',
      blood_Group: '',
      language: '',
      companyName: '',
      experience: '',
      profilePic: null,
      photo: ''
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
            id: data.data._id,
            fullName: data.data.fullName,
            gender: data.data.gender,
            email: data.data.email,
            phone: data.data.phone,
            category: data.data.category,
            city: data.data.city,
            state: data.data.state,
            zip: data.data.zip,
            dob: data.data.date_of_birth,
            blood_Group: data.data.blood_Group,
            language: data.data.language,
            companyName: data.data.company_name,
            experience: data.data.experience
          });
        }
      });
  }

  handleChangeFullname(event) {
    this.setState({
      fullName: event.target.value
    });
  }
  handleChangeGender(event) {
    this.setState({
      gender: event.target.value
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleChangeNumber(event) {
    this.setState({
      phone: event.target.value
    });
  }
  handleChangeDob(event) {
    this.setState({
      dob: event.target.value
    });
  }
  handleChangeLanguage(event) {
    this.setState({
      language: event.target.value
    });
  }
  handleChangeblood_Group(event) {
    this.setState({
      blood_Group: event.target.value
    });
  }

  handleChangeCompanyName(event) {
    this.setState({
      companyName: event.target.value
    });
  }
  handleChangeExperience(event) {
    this.setState({
      experience: event.target.value
    });
  }
  handleChangeCity(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleChangeState(event) {
    this.setState({
      state: event.target.value
    });
  }
  handleChangeZip(event) {
    this.setState({
      zip: event.target.value
    });
  }

  handleChangeCategory(event) {
    this.setState({category: event});
  }

  onChangeHandler(event) {
    this.setState(
      {
        profilePic: event.target.files[0]
      },
      () => {
        const data = new FormData();
        data.append('profilePic', this.state.profilePic);
        data.append('id', this.state.id);
        axios
          .post('http://localhost:3001/update-photo', data, {})
          .then(data => {
            console.log(data.data.data.profilePic);
            this.setState({
              photo: data.data.data.profilePic
            });
          });
      }
    );
  }

  async handleSubmit(event) {
    const data = {
      id: this.state.id,
      fullName: this.state.fullName,
      gender: this.state.gender,
      email: this.state.email,
      phone: this.state.phone,
      category: this.state.category.value,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      date_of_birth: this.state.dob,
      blood_Group: this.state.blood_Group,
      language: this.state.language,
      company_name: this.state.companyName,
      experience: this.state.experience
    };
    console.log('data', data);
    await fetch('http://localhost:3001/update-details', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          alert('Details Updated successfully...!');
          this.props.history.push('/profile');
        }
      });
  }
  render() {
    return (
      <div className="updatebg">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
        </div>
        <div className="col-md-4 col-md-offset-4">
          <MDBContainer>
          
              <h1 align="center"><br/><br/>
                <strong>Edit Your Profile</strong>
              </h1>
              <br/>
              <br/>
              <br/>
              <MDBRow  >
              <MDBCol align="center" md="12" >
              <img class="img-circle" src={`${this.state.photo}`} height="180" width="180"  alt="UpdatePic" />
              <MDBInput
                 type="file"
                 name="profilePic"
                 onChange={event => this.onChangeHandler(event)}
    
                />
              </MDBCol>    
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <MDBInput
                    type="text"
                    name="name"
                    value={this.state.fullName}
                    onChange={event => this.handleChangeFullname(event)}
                    label="Full Name"
                    icon="user"
                    id="materialFormRegisterNameEx"
                    required
                  />
                </MDBCol>
                <MDBCol md="4">
                <MDBInput
                    type="tel"
                    name="phone"
                    maxLength="10"
                    minLength="10"
                    value={this.state.phone}
                    onChange={event => this.handleChangeNumber(event)}
                    label="Phone "
                    icon="phone"
                    id="materialFormRegisterPhnEx2"
                    required
                  />
                 
                </MDBCol>
                <MDBCol md="4">
                 
                   <MDBInput
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={event => this.handleChangeEmail(event)}
                    label="Email"
                    icon="envelope"
                    id="materialFormRegisterEmailEx2"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <MDBInput
                    // options={options}
                    value={this.state.category}
                    name="category"
                    placeholder="Select Category"
                    onChange={event => this.handleChangeCategory(event)}
                    label="Category"
                    icon="th-large"
                    id="materialFormRegisterNameEx"
                    required
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    type="text"
                    name="companyName"
                    value={this.state.companyName}
                    onChange={event => this.handleChangeCompanyName(event)}
                    id="materialFormRegisterCompanyEx2"
                    label="Company"
                    icon="building"
                    required
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    type="tel"
                    name="experience"
                    maxLength="2"
                    minLength="1"
                    value={this.state.experience}
                    onChange={event => this.handleChangeExperience(event)}
                    label="Experience"
                    icon="exclamation"
                    id="materialFormRegisterExperienceEx2"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
              <MDBCol md="4">
              <MDBInput
                    type="text"
                    name="language"
                    value={this.state.language}
                    onChange={event => this.handleChangeLanguage(event)}
                    label="Language"
                    icon="language"
                    id="materialFormRegisterLanguageEx2"
                    required
                  />
              </MDBCol>
                <MDBCol md="4">
                <MDBInput
                   type="date"
                   name="dob"
                   value={this.state.dob}
                   onChange={event => this.handleChangeDob(event)}
                   label="D.O.B"
                    id="materialFormRegisterDobEx2"
                      required
                />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    type="text"
                    name="blood_Group"
                    value={this.state.blood_Group}
                    onChange={event => this.handleChangeblood_Group(event)}
                    label="Blood grp"
                    icon="tint"
                    id="materialFormRegisterBGEx"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <MDBInput
                    name="city"
                    type="text"
                    value={this.state.city}
                    onChange={event => this.handleChangeCity(event)}
                    label="City"
                    icon="home"
                    id="materialFormRegisterCityEx2"
                    required
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    type="text"
                    name="zip"
                    value={this.state.zip}
                    onChange={event => this.handleChangeZip(event)}
                    label="Zip"
                    icon="file"
                    id="materialFormRegisterZipEx2"
                    required
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    name="state"
                    type="text"
                    value={this.state.state}
                    onChange={event => this.handleChangeState(event)}
                    label="State"
                    icon="map-marker"
                    id="materialFormRegisterStateEx2"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4">
                  <MDBInput
                    type="radio"
                    name="gender"
                    value="Male"
                    onClick={this.state.gender === 'Male'}
                    onChange={event => this.handleChangeGender(event)}
                    label="Male"
                    id="materialFormRegisterNameEx"
                    required
                  />
                  <MDBInput
                    type="radio"
                    name="gender"
                    value="Female"
                    onClick={this.state.gender === 'Female'}
                    onChange={event => this.handleChangeGender(event)}
                    label="Female"
                    id="materialFormRegisterNameEx"
                    required
                  />
                </MDBCol>
              </MDBRow>
            
              <div align="center">
                <MDBBtn
                  gradient="blue"
                  type="submit"
                  onClick={() => this.handleSubmit()}
                >
                  Submit
                </MDBBtn>
              </div>
          
          </MDBContainer>
        </div>
      </div>
    );
  }
}
export default Update_Details;
