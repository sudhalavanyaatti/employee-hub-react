import React, { Component } from "react";
import Header from "../components/header";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Select from "react-select";
import "../style.css";
import PagiNation from "../components/Pagination";
import Bottom from "../components/bottom";
import SideBar from "../components/sidebar";

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
    selectedcity: "",
    selectedcategory: "",
    popup: false,

    isToggleOn: true
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
  onImageClick() {
    this.setState(
      {
        popup: true
      },
      () => {
        console.log(this.state.popup);
      }
    );
  }

  async componentDidMount() {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3002/details", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "no-cors",
        "Access-Control-Allow-Credentials": true,
        "Authentication-Token": token
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

    this.setState({
      categories: this.state.list.map(cat => cat.category)
    });

    this.setState({
      address: this.state.list.map(cat => cat.city)
    });

    this.setState({
      uniqueCat: Array.from(new Set(this.state.categories))
    });
    this.setState({
      uniqueAdd: Array.from(new Set(this.state.address))
    });
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

  getUsers(searchString) {
    const data = {
      searchValue: searchString
    };
    fetch("http://localhost:3002/find-users", {
      method: "post",
      headers: {
        "Authentication-Token": localStorage.getItem("token"),
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data =>
        this.setState({ list: data }, () => {
          console.log(this.state.result, "hello");
        })
      );
  }

  onHandleClick(event) {
    this.setState({ selectedcity: event.value });

    this.getUsers(event.value);
  }

  onHandleChange(event) {
    this.setState({ selectedcategory: event.value });

    this.getUsers(event.value);
  }

  render() {
    let cate = this.state.uniqueCat.map(opt => ({ label: opt, value: opt }));
    let addre = this.state.uniqueAdd.map(opt => ({ label: opt, value: opt }));
    console.log("list_123");
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
          <Row style={{ paddingTop: "50px" }}>
            <div>
              <div className="mobile-only">
                <SideBar />
              </div>
              <div className="desktop-only">
                <Header />
              </div>
            </div>
          </Row>

          <Row style={{ borderBottom: "1px solid #AA9E9E" }}>
            <Col xs={9} lg={9} md={9} sm={9} className="col">
              {this.state.value === "address" ? (
                <Select
                  placeholder={"SEARCH"}
                  options={addre}
                  value={this.state.value1}
                  onChange={this.onHandleClick.bind(this)}
                  style={{
                    position: "absolute",
                    backgroundColor: "white"
                  }}
                />
              ) : (
                <Select
                  placeholder={"SEARCH"}
                  options={cate}
                  value={this.state.value2}
                  onChange={this.onHandleChange.bind(this)}
                  style={{
                    position: "absolute"
                  }}
                />
              )}
            </Col>

            <Col
              xs={3}
              lg={3}
              md={3}
              sm={3}
             
            >
              <select className="select"
                required=""
                style={{
                  position: "absolute",
                  textAlign: "center",
                  paddingLeft: "16px",
                  paddingRight: "16px"
                }}
                value={this.state.value}
                onChange={e => {
                  this.handleChange(e);
                }}
              >
                <option defaultValue="">PLEASE SELECT</option>
                <option value="category">category</option>

                <option value="address">address</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={6} md={6} xs={6} className="col">
              <div>
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
                          width: "50%",
                          padding: "0"
                        }}
                      >
                        {this.state.list.map(store => {
                          if (store.city === this.state.selectedcity) {
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
                                city={store.city}
                              />
                            );
                          }
                          if (store.category === this.state.selectedcategory) {
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
                                city={store.city}
                              />
                            );
                          }
                          if (
                            this.state.selectedcity === "" &&
                            this.state.selectedcategory === ""
                          ) {
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
                                city={store.city}
                              />
                            );
                          }
                          return console.log(store);
                        })}

                        <InfoWindow
                          marker={this.state.activeMarker}
                          visible={this.state.showingInfoWindow}
                          onClose={this.onClose}
                        >
                          <div>
                            {this.state.selectedPlace.name}
                            <br />

                            {this.state.selectedPlace.category}
                            <br />
                            <a
                              href={`mailto:${this.state.selectedPlace.email}`}
                            >
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
              </div>
            </Col>
            <Col
              lg={6}
              xs={6}
              md={6}
              sm={6}
              className="col"
              style={{
                lineHeight: "2.2",
                borderBottom: "4px",
                marginTop: "5px",
                zIndex: 0
              }}
            >
              <div>
                <PagiNation
                  details={this.state.list}
                  popup={this.onImageClick}
                />
              </div>
            </Col>
          </Row>
        </Grid>
        <Bottom />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAjYIJDSpRo90YUDZNtLnSCTmuMHfLMAlo&libraries=places"
})(Details);
