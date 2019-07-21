import React, { Component } from "react";
import Header from '../components/header';
import Bottom from '../components/bottom';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SideBar from "../components/sidebar";
import "../App.css";

library.add(faEnvelope);

class Details extends Component {
  constructor(props) {
    super(props);
  this.state = {
    categories: [],
    list: [],
    details: true,
    updatedData: [],
    address: [],
    addr: [],

    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
}

  onMarkerClick = (props, marker, e) => {
    const { showingInfoWindow } = this.state;
    this.setState(
      {
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: !showingInfoWindow
      },
      () => {
        console.log(this.state.showingInfoWindow);
      }
    );
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
      .then(data =>{
        this.setState(
          {
            list: [data.details]
          },
          () => console.log("details", this.state.list)
      )
        }
      );

    this.setState(
      {
        categories: this.state.list.map(cat => cat.category)
      },
      () => console.log("cay", this.state.categories)
    );
    this.setState({
      updatedData: this.state.categories
    });

    this.setState(
      {
        address: this.state.list.map(cat => cat.city)
      },
      () => console.log("add", this.state.address)
    );
    this.setState({
      addr: this.state.address
    });
  }

  textChange(event) {
    let updatedList = this.state.categories;
    updatedList = updatedList.filter(
      item => item.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );

    this.setState({ updatedData: updatedList }, () =>
      console.log("bshc", this.state.updatedData)
    );
  }
  addChange(event) {
    let updatedList = this.state.address;
    updatedList = updatedList.filter(
      item => item.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    );

    this.setState({ addr: updatedList }, () =>
      console.log("bshjcbc", this.state.addr)
    );
  }

  handleClick() {
    const { details } = this.state;
    this.setState({ details: !details }, () =>
      console.log(this.state.details, "details")
    );
  }
  

  renderDetails() {
    return (
      <div>
        {this.state.list.map(details => {
          return (
            <div key={details._id}>
              <ul
                style={{
                  listStyleType: "square",
                  listStylePosition: "inside"
                }}
              >
                <li>Email:{details.email}</li>
                <li>Full name:{details.fullName}</li>
                <li>Address:{details.city}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="detailsbg">
        <div className="header">
          <div className="mobile-only">
            <SideBar />
          </div>
          <div className="desktop-only">
            <Header />
          </div>
          <Bottom/>
        </div>
        <Grid fluid>
          <Row>
            <Col lg={6} sm={6} md={6} xs={6} className="col">
              {this.state.details ? (
                <div>
                  {this.state.list.map((store, index) => {
                    return (
                      <div className="win">
                      <Map
                        key={index}
                        google={this.props.google}
                        zoom={6}
                        initialCenter={{ lat: 17.6868, lng: 83.20161 }}
                      >
                        <Marker
                          position={{
                            lat: store.latitude,
                            lng: store.longitude
                          }}
                          name={"Changing Colors Garage"}
                          onClick={this.onMarkerClick}
                        />

                        <InfoWindow
                          marker={this.state.activeMarker}
                          visible={this.state.showingInfoWindow}
                          style={{ width: "50%" }}
                        >
                          <div>
                            <p>
                              <b> {store.fullName}</b>

                              <p>{store.address}</p>
                              <a href={`mailto:${store.email}`}>
                                <FontAwesomeIcon icon="envelope" />
                              </a>
                              <p> {store.phone}</p>
                            </p>
                          </div>
                        </InfoWindow>
                      </Map>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>{this.renderDetails()}</div>
              )}
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="col">
              <input
                type="button"
                onClick={() => this.handleClick()}
                style={{ position: "absolute" }}
                value="MAPVIEW/LISTVIEW"
              />
              <div> list:{this.renderDetails()}</div>

              <input
                type="text"
                onChange={event => {
                  this.addChange(event);
                  this.textChange(event);
                }}
                style={{
                  position: "relative",
                  width: "20%",
                  border: "solid",
                  borderColor: "blue"
                }}
              />
              {this.state.updatedData.map((design, index) => {
                return (
                  <li key={index} style={{ listStyleType: "circle" }}>
                    {design}
                  </li>
                );
              })}
              {this.state.addr.map((add, index) => {
                return (
                  <li key={index} style={{ listStyleType: "circle" }}>
                    {add}
                  </li>
                );
              })}
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
