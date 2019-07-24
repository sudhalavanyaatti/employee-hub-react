import React, {Component} from 'react';
import '../App.css';
import '../style.css';
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      mobile: '',
      umobile: '',
      otp: '',
      category: '',
      city: '',
      state: '',
      zip: '',
      password: '',
      decpassword: '',
      curpassword: '',
      newpassword: '',
      conpassword: '',
      profilePic: '',
      displayContent: 'account'
    };
    this.Otp = this.Otp.bind(this);
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
        if (data) {
          this.setState({
            id: data.data._id,
            name: data.data.fullName,
            email: data.data.email,
            mobile: data.data.phone,
            category: data.data.category,
            city: data.data.city,
            state: data.data.state,
            zip: data.data.zip,
            password: data.data.password,
            profilePic: data.data.profilePic
          });
        }
      });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
export default Account;

