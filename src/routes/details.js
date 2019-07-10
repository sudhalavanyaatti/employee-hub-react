import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Header from '../components/header';
import "../App.css";

class Details extends Component {
  state = {
    categories: '',
    list: [],
    stores: [
      {lat: 17.68009, lng: 83.20161},
      {latitude: 22.56263, longitude: 88.36304},
      {latitude: 16.51928, longitude: 80.63049},
      {latitude: 19.07283, longitude: 72.88261},
      {latitude: 13.08784, longitude: 80.27847},
      {latitude: 12.97194, longitude: 77.59369}
    ]
  };
  changeText(e) {
    this.setState({categories: e.target.value});
  }
  componentDidMount() {
    const api = localStorage.getItem('token');
    if (api === null) {
      this.props.history.push('/signIn');
    }
    fetch('http://localhost:3001/details', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
        'Access-Control-Allow-Credentials': true,
        'X-Access-Token': api
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
  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    });
  };
  render() {
    return (
     <div className="detailsbg">
        <Grid fluid>
        <Header />
        <Row>
          <Col lg={6} md={6} sm={6} xs={6} className="col">
            <Map
              style={{width: '50%', height: '50', position: 'absolute'}}
              google={this.props.google}
              zoom={5}
              initialCenter={{
                lat: 20.5937,
                lng: 78.9629
              }}
            >
              {this.displayMarkers()}
            </Map>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="col">
            <table>
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>fullName</th>
                </tr>
                <tr>
                  <td>{this.state.list.email}</td>
                  <td>{this.state.list.fullName}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Grid>
     </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAjYIJDSpRo90YUDZNtLnSCTmuMHfLMAlo'
})(Details);
