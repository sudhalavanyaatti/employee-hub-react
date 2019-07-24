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
    uniqueCat: [],
    uniqueAdd: [],
    list: [],
    details: true,
    address: [],
    value: "",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    value1: "",
    value2: "",
    options: [
      {
        label: "engineer",
        value: "engineer"
      },
      { label: "doctor", value: "doctor" },
      { label: "engineer", value: "engineer" }
    ]
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
      () => console.log("hjshsd", this.state.categories)
    );

    this.setState(
      {
        address: this.state.list.map(cat => cat.city)
      },
      () => console.log("add", this.state.address)
    );

    this.setState(
      {
        uniqueCat: Array.from(new Set(this.state.categories))
      },
      () => {
        console.log(this.state.uniqueCat, "BHJHBhb");
      }
    );
    this.setState(
      {
        uniqueAdd: Array.from(new Set(this.state.address))
      },
      () => {
        console.log(this.state.uniqueAdd, "BHJHBhb");
      }
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
          {this.state.list.map((data, index)=> {
            if (data.category === this.state.value2) {
              return (
                <div key={index}>
                  <Grid fluid style={{ marginBottom: "20px" }}>
                    <Row>
                      <Col xs={2} lg={2} sm={2} md={2}>
                        <img
                          className="responsive"
                          src={data.profilePic}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%"
                          }}
                        />
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        <i>
                          {" "}
                          {data.fullName.charAt(0).toUpperCase() +
                            data.fullName.substring(1)}
                        </i>
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        {data.category.charAt(0).toUpperCase() +
                          data.category.substring(1)}
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        <div>
                          {data.city}
                          <br />
                          {data.state}
                        </div>
                        {data.zip}
                        <br />
                      </Col>
                    </Row>
                  </Grid>
                </div>
              );
            }
            return console.log(data);
          })}
        </div>
      </div>
    );
  }

  renderAddress(event) {
    return (
      <div>
        <div>
          {this.state.list.map((data, index) => {
            if (data.city == this.state.value1) {
              return (
                <div key={index}>
                  <Grid fluid style={{ marginBottom: "20px" }}>
                    <Row>
                      <Col xs={2} lg={2} sm={2} md={2}>
                        <img
                          className="responsive"
                          src={data.profilePic}
                          alt="photo"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%"
                          }}
                        />
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        <i>
                          {" "}
                          {data.fullName.charAt(0).toUpperCase() +
                            data.fullName.substring(1)}
                        </i>
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        {data.category.charAt(0).toUpperCase() +
                          data.category.substring(1)}
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        <div>
                          {data.city}
                          <br />
                          {data.state}
                        </div>
                        {data.zip}
                        <br />
                      </Col>
                    </Row>
                  </Grid>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
  renderDetails() {
    return (
      <div>
        {this.state.value1 == "" && this.state.value2 == "" ? (
          <div>
            {this.state.list.map((data, index) => {
              return (
                <div key={index}>
                  <Grid fluid style={{ marginBottom: "20px" }}>
                    <Row>
                      <Col xs={2} lg={2} sm={2} md={2}>
                        <img
                          className="responsive"
                          src={data.profilePic}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%"
                          }}
                        />
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        <i>
                          {" "}
                          {data.fullName.charAt(0).toUpperCase() +
                            data.fullName.substring(1)}
                        </i>
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        {data.category.charAt(0).toUpperCase() +
                          data.category.substring(1)}
                      </Col>
                      <Col xs={3} lg={3} sm={3} md={3}>
                        <div>
                          {data.city}
                          <br />
                          {data.state}
                        </div>
                        {data.zip}
                        <br />
                      </Col>
                    </Row>
                  </Grid>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {this.state.value1 != "" ? (
              <div>{this.renderAddress()}</div>
            ) : (
              <div>{this.renderCategory()}</div>
            )}
          </div>
        )}
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
    let cate = this.state.uniqueCat.map(opt => ({ label: opt, value: opt }));
    let addre = this.state.uniqueAdd.map(opt => ({ label: opt, value: opt }));

    return (
      <div>
        <Grid
          fluid
          style={{
            paddingRight: "0px",
            paddingLeft: "0px",
            margin: "0px"
          }}
        >
          <Row style={{height:"50px"}}>
            <Header />
          </Row>

          <Row>
            <Col xs={9} lg={9} md={9} sm={9} className="col">
              {this.state.value === "address" ? (
                <Select 
                  placeholder={"SEARCH"}
                  options={addre}
                  value={this.state.value1}
                  onChange={this.onHandleClick.bind(this)}
                  style={{ position: "absolute", height: "100px" }}
                />
              ) : (
                <Select 
                  placeholder={"SEARCH"}
                  options={cate}
                  value={this.state.value2}
                  onChange={this.onHandleChange.bind(this)}
                  style={{ position: "absolute", height: "100px" }}
                />
              )}
            </Col>

            <Col xs={3} lg={3} md={3} sm={3} className="col">
              <select
                required=""
                style={{ position: "absolute" }}
                value={this.state.value}
                onChange={e => {
                  this.handleChange(e);
                }}
              >
                <option defaultValue="">SELECT TYPE</option>
                <option value="category">category</option>

                <option value="address">address</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={6} md={6} xs={6} className="col">
              <div>
                {this.state.list.map((store, index) => {
                  console.log(store.latitude, "dvfd");

                  return (
                    <Map
                      key={index}
                      google={this.props.google}
                      zoom={7}
                      initialCenter={{
                        lat: store.latitude,
                        lng: store.longitude
                      }}
                      style={{
                        position: "absolute",
                        width: "50%",

                        border: "1px solid blue",
                        padding: "0"
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
                            name={
                              store.fullName.charAt(0).toUpperCase() +
                              store.fullName.substring(1)
                            }
                            phone={store.phone}
                            category={store.category}
                            email={store.email}
                          />
                        );
                      })}

                      <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        
                        onClose={this.onClose}
                      >
                        <div>
                          <h1>{this.state.selectedPlace.name}</h1>
                          <br/>

                          {this.state.selectedPlace.category}
                          <br />
                          <a href={`mailto:${this.state.selectedPlace.email}`}>
                            <FontAwesomeIcon icon="envelope" />
                          </a>
                          <br />
                          {this.state.selectedPlace.phone}
                        </div>
                      </InfoWindow>
                    </Map>
                  );
                })}
              </div>
            </Col>
            <Col lg={6} xs={6} md={6} sm={6}>
              {this.renderDetails()}
            </Col>
          </Row>
        </Grid>
        {/* <Select isMulti options={this.state.options} /> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYIJDSpRo90YUDZNtLnSCTmuMHfLMAlo&libraries=places"
})(Details);
