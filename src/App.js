import React from "react";
import "./App.css";
import "./style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../src/routes/home";
import SignIn from "./routes/signIn";
import Signup from "./routes/signup";
import About from "./routes/about";
import Otp from "./routes/otpVal";
import ForgotPassword from "./routes/forgotPassword";
import PassOtpValidation from "./routes/passwordOtpVal";
import NewPassword from "./routes/newPassword";
import Details from "./routes/details";
import NumberVal from "./routes/phoneNumberVal";
import Profile from "./routes/profile";
import Update_Details from "./routes/update-details";

class App extends React.Component {
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
      </Router>
    );
  }
}

export default App;
