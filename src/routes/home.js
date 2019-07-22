import React, {Component} from 'react';
import Header from '../components/header';
import SideBar from '../components/sidebar';
import logo2 from "../images/476700.svg";
import logo1 from "../images/417720.svg";
import logo3 from "../images/1034146.svg";

import '../App.css';
import '../style.css';
import Bottom from '../components/bottom';

//import { Map, GoogleApiWrapper } from "google-maps-react";
//import {Row, Col} from 'react-flexbox-grid';

class Home extends Component {
 
  render() {
    console.log('token', localStorage.getItem('token'));
    return (
      <div className="homebg" id="page-container">

         <div className="header">
           <div className="mobile-only">
             <SideBar/>
           </div>
           <div className="desktop-only">
               <Header/>
           </div>
           <Bottom/>
        </div>
        <img src={logo1} alt="Logo" className="pics" />
        <img src={logo2} alt="Logo" className="pics" />
        <img src={logo3} alt="Logo" className="pics" />
        <div className="text1"><h1>You can find out at any where</h1></div>
        <div className="text2"><h1>Find new people</h1></div>
        <div className="text3"><h1>Contact them</h1></div>
      </div>
    );
  }
}
export default Home;
