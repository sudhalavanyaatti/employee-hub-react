import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
//import {Row, Col} from 'react-flexbox-grid';
class Home extends Component {
  render() {
    return (
      <div>
        <Map
          style={{ width: "100%",height: "50" }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233
          }}
        />
        <div className="text">
          <h1>Welcome To Employee HUB</h1>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBvcv2xuV3aMp9kPJOq1igVNAf2UceH0N8"
})(Home);
