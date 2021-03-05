import * as React from 'react';

import { Button, Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import OverlayComponent from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_API_KEY = 'AIzaSyBBUZTSrNRyshhKeOmNp5W9nWKM4-Irsgg';
const destination = {latitude: 37.771707, longitude: -122.4053769};
const origin = {latitude: 37.78825, longitude: -122.4324};

class MapComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.onRegionChange = this.onRegionChange.bind(this);
      this.state = {
        region:  {           
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      }
    }



  
    onRegionChange(region) {
        this.setState({ region });
    }
  
    render() {
      return (
        <MapView
        style = {styles.map}
        onRegionChange={this.onRegionChange}
        initialRegion = {{           
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        animatetoRegion = {this.state.region}>
          <MapView.Marker key = 'key' title = 'start' coordinate = {origin} />
          <MapView.Marker key = 'key2' title = 'end' coordinate = {destination} />
          <MapViewDirections
            origin = {origin}
            destination = {destination}
            apikey = {GOOGLE_API_KEY}
            strokeWidth = {3}
          />
          

        </MapView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;