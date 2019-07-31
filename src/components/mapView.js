import React, {Component} from 'react';
import {InfoWindow, Map, Marker} from 'google-maps-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

class MapView extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
  };
  onMarkerClick = (props, marker, e) => {
    this.setState (
      {
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      }
    );
  };
  render () {
    const {store, list} = this.props;
    return (
      <Map
        // key={index}
        google={this.props.google}
        zoom={7}
        initialCenter={{
          lat: store.latitude,
          lng: store.longitude,
        }}
        style={{
          width: '50%',
          padding: '0',
        }}
      >
        {list.map (store => {
          if (store.city === this.props.selectedcity) {
            return (
              <Marker
                position={{
                  lat: store.latitude,
                  lng: store.longitude,
                }}
                onClick={this.onMarkerClick}
                name={
                  store.fullName.charAt (0).toUpperCase () +
                    store.fullName.substring (1)
                }
                phone={store.phone}
                category={store.category}
                email={store.email}
                city={store.city}
              />
            );
          }
          if (store.category === this.props.selectedcategory) {
            return (
              <Marker
                position={{
                  lat: store.latitude,
                  lng: store.longitude,
                }}
                onClick={this.onMarkerClick}
                name={
                  store.fullName.charAt (0).toUpperCase () +
                    store.fullName.substring (1)
                }
                phone={store.phone}
                category={store.category}
                email={store.email}
                city={store.city}
              />
            );
          }
          if (
            this.props.selectedcity === '' &&
            this.props.selectedcategory === ''
          ) {
            return (
              <Marker
                position={{
                  lat: store.latitude,
                  lng: store.longitude,
                }}
                onClick={this.onMarkerClick}
                name={
                  store.fullName.charAt (0).toUpperCase () +
                    store.fullName.substring (1)
                }
                phone={store.phone}
                category={store.category}
                email={store.email}
                city={store.city}
              />
            );
          }
          return console.log ('sample', store);
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
            <a href={`mailto:${this.state.selectedPlace.email}`}>
              <FontAwesomeIcon icon="envelope" />
            </a>
            <br />
            {this.state.selectedPlace.phone}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default MapView;
