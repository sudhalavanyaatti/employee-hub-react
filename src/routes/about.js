import React, {Component} from 'react';
import Header from '../components/header';
import Bottom from '../components/bottom';
import SideBar from "../components/sidebar";
import "../App.css";
class About extends Component {
  render() {
    return (
      <div className="aboutbg">
        
        <div className="header">
            <div className="mobile-only">
               <SideBar/>
            </div>
            <div className="desktop-only">
                <Header/>
            </div>
            <Bottom/>
        </div>
  

          <div className="text">
             <h1>Comming soon...!</h1>
          </div>
      </div>
    );
  }
}

export default About;
