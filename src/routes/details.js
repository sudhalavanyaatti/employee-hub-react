import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class Details extends Component {
  state = {
    categories: ""
  };
  changeText(e) {
    this.setState({ categories: e.target.value });
  }
  render() {
    return (
      <div>
        <Map
          style={{ width: "100%", height: "50" }}
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233
          }}
        />
        <input
          type="text"
          value={this.state.categories}
          onChange={this.changeText.bind(this)}
        />
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBvcv2xuV3aMp9kPJOq1igVNAf2UceH0N8"
})(Details);
