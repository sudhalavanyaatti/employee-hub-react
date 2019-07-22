import React, { Component } from "react";
import Header from "../components/header";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Select from "react-select";
import "../style.css";

library.add(faEnvelope);

class Details extends Component {
  state = {
    categories: [],
    list: [],
    details: true,
    address: [],
    value: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    value1: "",
    value2: ""
  };

  onMarkerClick = (props, marker, e) => {
    this.setState(
      {
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      },
      () => {
        console.log(this.state.showingInfoWindow);
      }
    );
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  async componentDidMount() {
    const api = localStorage.getItem("token");

    await fetch("http://localhost:3001/details", {
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
          () => console.log("details", this.state.list)
        )
      );

    this.setState(
      {
        categories: this.state.list.map(cat => cat.category)
      },
      () => console.log("cay", this.state.categories)
    );

    this.setState(
      {
        address: this.state.list.map(cat => cat.city)
      },
      () => console.log("add", this.state.address)
    );
  }

  handleClick() {
    const { details } = this.state;
    this.setState({ details: !details }, () =>
      console.log(this.state.details, "details")
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  renderCategory() {
    return (
      <div>
        <div>
          {this.state.list.map((data, index) => {
            if (data.category == this.state.value2) {
              return (
                <div key={index}>
                  <li>
                    <img
                      className="responsive"
                      src={data.profilePic}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%"
                      }}
                    />
                  </li>

                  <li>
                    <b>{data.fullName}</b>
                  </li>
                  <li>{data.category}</li>
                  <li>{data.city}</li>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  renderAddress() {
    return (
      <div>
        <div>
          {this.state.list.map((data, index) => {
            if (data.city == this.state.value1) {
              return (
                <div key={index}>
                  <li>
                    <img
                      className="responsive"
                      src={data.profilePic}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%"
                      }}
                    />
                  </li>

                  <li>
                    <b>{data.fullName}</b>
                  </li>
                  <li>{data.category}</li>
                  <li>{data.city}</li>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  onHandleClick(event) {
    this.setState({ value1: event.value }, () => {
      console.log(this.state.value1, "bsdbbhdhvj");
    });
  }

  onHandleChange(event) {
    this.setState({ value2: event.value }, () => {
      console.log(this.state.value2, "hdhvv");
    });
  }

  render() {
    let cate = this.state.categories.map(opt => ({ label: opt, value: opt }));
    let addre = this.state.address.map(opt => ({ label: opt, value: opt }));

    return (
      <div>
        <Header />
        <Grid
          fluid
          style={{
            paddingRight: "0px",
            paddingLeft: "0px",
            margin: "0px",
            height: "673px"
          }}
        >
          <Row>
            <Col lg={6} sm={6} md={6} xs={6} className="col">
              {this.state.details ? (
                <div>
                  {this.state.list.map((store, index) => {
                    console.log(store.latitude, "dvfd");
                    return (
                      <Map
                        key={index}
                        google={this.props.google}
                        zoom={6}
                        initialCenter={{ lat: 17.6868, lng: 83.20161 }}
                        style={{
                          position: "absolute",
                          width: "50%",

                          padding: 0
                        }}
                      >
                        {this.state.list.map(store => {
                          return (
                            <Marker
                              position={{
                                lat: store.latitude,
                                lng: store.longitude
                              }}
                              onClick={this.onMarkerClick}
                              name={store.fullName}
                              phone={store.phone}
                              category={store.category}
                              email={store.email}
                            />
                          );
                        })}

                        <InfoWindow
                          marker={this.state.activeMarker}
                          visible={this.state.showingInfoWindow}
                          style={{ width: "50%" }}
                          onClose={this.onClose}
                        >
                          <div>
                            <p>
                              <h1>{this.state.selectedPlace.name}</h1>

                              <p>{this.state.selectedPlace.category}</p>
                              <a
                                href={`mailto:${
                                  this.state.selectedPlace.email
                                }`}
                              >
                                <FontAwesomeIcon icon="envelope" />
                              </a>
                              <p> {this.state.selectedPlace.phone}</p>
                            </p>
                          </div>
                        </InfoWindow>
                      </Map>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {this.state.value1 != null && this.renderAddress()}
                  {this.state.value2 != null && this.renderCategory()}
                </div>
              )}
            </Col>
            <Col lg={3} md={3} sm={6} xs={3} className="col">
              <input
                type="button"
                className="button"
                onClick={() => this.handleClick()}
                style={{ position: "relative" }}
                value="MAPVIEW/LISTVIEW"
              />
            </Col>
            <Col lg={3} md={3} sm={6} xs={3} className="col">
              <select
                id="mainselection"
                style={{ position: "relative", width: "50%" }}
                value={this.state.value}
                onChange={e => {
                  this.handleChange(e);
                }}
              >
                <option value="category">category</option>
                <option value="address">address</option>
              </select>

              {this.state.value === "address" ? (
                <Select
                  options={addre}
                  style={{ position: "realtive", borderRadius: "10px" }}
                  value={this.state.value1}
                  onChange={this.onHandleClick.bind(this)}
                />
              ) : (
                <Select
                  options={cate}
                  style={{ position: "realtive", borderRadius: "10px" }}
                  value={this.state.value2}
                  onChange={this.onHandleChange.bind(this)}
                />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYIJDSpRo90YUDZNtLnSCTmuMHfLMAlo&libraries=places"
})(Details);
