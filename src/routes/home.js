import React, {Component} from 'react';
import Header from '../components/header';
import '../App.css';

//import { Map, GoogleApiWrapper } from "google-maps-react";
//import {Row, Col} from 'react-flexbox-grid';

class Home extends Component {
  render() {
    console.log('token', localStorage.getItem('token'));
    return (
      <div className="homebg" >
        <Header />
        <div className="text">
          <h1>Welcome To Employee HUB</h1>
        </div>
      </div>
    );
  }
}
export default Home;
