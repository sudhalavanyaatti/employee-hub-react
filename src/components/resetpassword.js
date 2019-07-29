import React, {Component} from 'react';
import { withRouter } from 'react-router';
import '../App.css';
import '../style.css';
class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
        password: '',
        decpassword: '',
        curpassword: '',
        newpassword: '',
        conpassword: ''
    };
  }
  componentDidMount() {
    // const data = {
    //   token: localStorage.getItem('token')
    // };
    fetch('http://localhost:3002/profile', {
      method: 'get',
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
            password: data.data.password
          });
        }
      });
  }
  handleChangeCpassword(event) {
    this.setState({
      curpassword: event.target.value
    },()=>{
    
    const data = {
  
      password: this.state.curpassword
     
    };
    console.log('pass',data)
    fetch('http://localhost:3002/dec-password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          decpassword: data.data
        });
      });
    });
    
  }
  handleChangeNpassword(event) {
    this.setState({
      newpassword: event.target.value
    });
  }
  handleChangeConfirmPass(event) {
    this.setState({
      conpassword: event.target.value
    });
  }
  handlePassword(data) {
    if (this.state.decpassword === this.state.password) {
      data = {
        newPassword: this.state.newpassword,
        confirmPassword: this.state.conpassword,
        phone: this.state.phone
      };
      if (this.state.newpassword === this.state.conpassword) {
        fetch('http://localhost:3002/update-password', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(res => res.json())
          .then(data => {
            alert('Password Updated successfully...!');
            this.props.history.push('/profile');
          });
      } else{
        window.location.reload();
           alert('Enter Same Password');}
    } else{
        window.location.reload();
         alert('Enter Correct Password');}
  }
  
  
  
  render() {
    return (
      <div>
        <h2><strong>Reset Password</strong></h2>
        <input
          type="password"
          value={this.state.currentpassword}
          onChange={event => this.handleChangeCpassword(event)}
          placeholder="Current Password"
        />
        <input
          type="password"
          value={this.state.newpassword}
          onChange={event => this.handleChangeNpassword(event)}
          placeholder="New Password"
        />
        <input
          type="text"
          value={this.state.confirmpassword}
          onChange={event => this.handleChangeConfirmPass(event)}
          placeholder="Confirm Password"
        />
        <button type="submit" className="bstyle" onClick={() => this.handlePassword()}>
          Update
        </button>
      </div>
    );
  }


}
export default withRouter(Password);

