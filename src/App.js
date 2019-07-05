import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../src/components/header";
import Home from "../src/routes/home";
import SignIn from "./routes/signIn";
import Signup from "./routes/signup";
import About from "./routes/about";
import Otp from "./routes/otpVal";
import Details from "./routes/details";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signup" component={Signup} />
      <Route path="/about" component={About} />
      <Route path="/otpVal" component={Otp} />
      <Route path="/details" component={Details} />
    </Router>
  );
}

export default App;
