import React, {Component} from 'react';
import { withRouter } from 'react-router';
import Select from 'react-select';
import options from '../components/category';
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
      category: '',
      experience:''
    };
  }
  componentDidMount() {
    fetch('http://localhost:3001/profile', {
      method: 'post',
      headers: {
         'Authentication-Token' :localStorage.getItem ('token'),
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
            experience: data.data.experience
          });
        }
      });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleChangeCategory(event) {
    this.setState({
      category: event
    });
  }
  handleChangeExperience(event) {
    this.setState({
      experience: event.target.value
    });
  }
  handleAccount(data) {
    data = {
      id: this.state.id,
      fullName: this.Capitalize(this.state.name),
      email: this.state.email,
      category: this.Capitalize(this.state.category),
      experience: this.state.experience
    };
    fetch('http://localhost:3001/update-details', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
          if(response){
            window.location.reload();
            this.props.history.push('/profile');
          }
      });
  }
  render () {
    return (
      <div className="p-page">
        <h1><strong>Account</strong></h1>
        <input
          type="text"
          value={this.state.name}
          onChange={event => this.handleChangeName(event)}
          placeholder="Name"
        />
        <input
          type="email"
          value={this.state.email}
          onChange={event => this.handleChangeEmail(event)}
          placeholder="Email"
        />
        <input type="tel" value={this.state.mobile} disabled />
        <Select
          type="text"
          options={options}
          value={this.state.category}
          onChange={event => this.handleChangeCategory(event)}
          placeholder="Category"
        />
        <input
          type="tel"
          value={this.state.experience}
          onChange={event => this.handleChangeExperience(event)}
          placeholder="Experience"
          minLength="1"
          maxLength="2"
        />
        <button type="submit" className="bstyle" onClick={() => this.handleAccount()}>
          Save
        </button>
      </div>
    );
  }
}
export default withRouter(Account);
