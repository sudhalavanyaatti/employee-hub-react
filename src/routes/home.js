import React, {Component} from 'react';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import '../App.css';
import '../style.css';
import Bottom from '../components/bottom';

//import { Map, GoogleApiWrapper } from "google-maps-react";
//import {Row, Col} from 'react-flexbox-grid';

class Home extends Component {
 
  render() {
    console.log('token', localStorage.getItem('token'));
    return (
      <div className="header">
      <div className="homebg" id="page-container">
           <div className="mobile-only">
             <SideBar/>
           </div>
           <div className="desktop-only">
               <Header/>
           </div>
           <Bottom/>
        </div>
      </div>
    );
  }
}
export default Home;
