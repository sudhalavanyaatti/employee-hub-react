import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';

import '../App.css';

class Update_Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      fullName: '',
      //gender:'',
      email: '',
      category: '',
      phone: '',
      city: '',
      zip:'',
      state:'',
      dob: '',
      blood_Group: '',
      language: '',
      companyName: '',
      experience: ''
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
            //gender: data.data.gender,
            email: data.data.email,
            phone: data.data.phone,
            category: data.data.category,
            city: data.data.city,
            state: data.data.state,
            zip:data.data.zip,
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
   // handleChangeGender(event) {
   //    this.setState({
  //       gender: event.target.value
  //     });
  //   }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleChangeCategory(event) {
    this.setState({
      category: event.target.value
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


  async handleSubmit(event) {
    //  event.preventDefault();
    const data = {
      id: this.state.id,
      fullName: this.state.fullName,
      //gender: this.state.gender,
      email: this.state.email,
      phone: this.state.phone,
      category: this.state.category,
      city: this.state.city,
      state:this.state.state,
      zip:this.state.zip,
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
          if(data){
        console.log(data);
        alert('Details Updated successfully...!');
        this.props.history.push('/profile');
          }
      });
  }
  render() {
    return (
      <div className="profilebg">
        <Header />

        <Row center="xs">
          <h1>Update Your Details</h1>

          <Col
            lgOffset={1}
            lg={3}
            mdOffset={3}
            md={4}
            smOffset={4}
            sm={4}
            xsOffset={1}
            xs={10}
          >
            <div>
              <input
                type="text"
                name="name"
                value={this.state.fullName}
                onChange={event => this.handleChangeFullname(event)}
                required
              />
              <br />
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={event => this.handleChangeEmail(event)}
                required
              />
              <br />
              <input
                type="text"
                name="category"
                value={this.state.category}
                onChange={event => this.handleChangeCategory(event)}
                required
              />
              <br />
              <input
                type="tel"
                name="phone"
                maxLength="10"
                minLength="10"
                value={this.state.phone}
                onChange={event => this.handleChangeNumber(event)}
                disabled
              />
              <br />
              <div>
                <input type="text" value={this.state.city} required />
                <br />
                <input
                  type="date"
                  name="dob"
                  value={this.state.dob}
                  onChange={event => this.handleChangeDob(event)}
                  required
                />
                <br />
                <input
                  type="text"
                  name="language"
                  value={this.state.language}
                  onChange={event => this.handleChangeLanguage(event)}
                  required
                />
                <br />
                <input
                  type="text"
                  name="blood_Group"
                  value={this.state.blood_Group}
                  onChange={event => this.handleChangeblood_Group(event)}
                  required
                />
                <br />
                <input
                  type="text"
                  name="companyName"
                  value={this.state.companyName}
                  onChange={event => this.handleChangeCompanyName(event)}
                  required
                />
                <br />
                <input
                  type="tel"
                  name="experience"
                  maxLength="2"
                  minLength="1"
                  value={this.state.experience}
                  onChange={event => this.handleChangeExperience(event)}
                  required
                />
              </div>
              <Row center="xs">
                <Col>
                  <button
                    className="button"
                    onClick={event => this.handleSubmit(event)}
                  >
                    Save
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Update_Details;
