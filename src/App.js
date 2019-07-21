import React from 'react';
import './App.css';
import './style.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../src/routes/home';
import SignIn from './routes/signIn';
import Signup from './routes/signup';
import About from './routes/about';
import Otp from './routes/otpVal';
import ForgotPassword from './routes/forgotPassword';
import PassOtpValidation from './routes/passwordOtpVal';
import NewPassword from './routes/newPassword';
import Details from './routes/details';
import NumberVal from './routes/phoneNumberVal';
import UpdateNumber from './routes/updateNumber';
import Profile from './routes/profile';
import Update_Details from'./routes/update-details';
import Number_OtpValidation from'./routes/updateNumberOtpVal';

class App extends React.Component {
  // state = {
  //   places: [
  //     {
  //       name: "Sydney",
  //       title: "Sydney",
  //       position: { lat: -33.847927, lng: 150.6517938 }
  //     },
  //     {
  //       name: "Melbourne",
  //       title: "Melbourne",
  //       position: { lat: -37.9722342, lng: 144.7729561 }
  //     },
  //     {
  //       name: "Perth",
  //       title: "Perth",
  //       position: { lat: -31.9546904, lng: 115.8350292 }
  //     }
  //   ]
  // };
  // render() {
  //   return <MapContainer places={this.state.places} />;
  // }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        <Route path="/otpVal" component={Otp} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/passwordOtpVal" component={PassOtpValidation} />
        <Route path="/newPassword" component={NewPassword} />
        <Route path="/details" component={Details} />
        <Route path="/phoneNumberVal" component={NumberVal} />
        <Route path="/profile" component={Profile} />
        <Route path="/update-details" component={Update_Details} />
        <Route path="/updateNumber" component={UpdateNumber} />
        <Route path="/updateNumberOtpVal" component={Number_OtpValidation} />
      </Router>
    );
  }
}

export default App;
