import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Grid, Row, Col } from "react-flexbox-grid";

class Details extends Component {
  state = {
    categories: "",
    list: []
  };
  changeText(e) {
    this.setState({ categories: e.target.value });
  }
  componentDidMount() {
    const api = localStorage.getItem("token");

    console.log(api);
    fetch("http://localhost:3001/details", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
        "Access-Control-Allow-Credentials": true,
        "X-Access-Token": api
      }
    })
      .then(res => res.json())
      .then(data =>
        this.setState(
          {
            list: data.details
          },
          () => console.log(this.state.list)
        )
      );
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col lg={6} md={6} sm={6} xs={6} className="col">
            <Map
              style={{ width: "50%", height: "50", position: "absolute" }}
              google={this.props.google}
              zoom={14}
              initialCenter={{
                lat: -1.2884,
                lng: 36.8233
              }}
            />
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="col">
            <table>
              <tr>
                <th>Email</th>
                <th>fullName</th>
              </tr>
              <tr>
                <td>{this.state.list.email}</td>
                <td>{this.state.list.fullName}</td>
              </tr>
            </table>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYIJDSpRo90YUDZNtLnSCTmuMHfLMAlo"
})(Details);
