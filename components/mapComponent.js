import * as React from 'react';

import { Button, Text, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

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

    getInitialState() {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
    }
  
    onRegionChange(region) {
        this.setState({ region });
    }
  
    render() {
      return (
        <MapView
        style = {styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        />
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    //alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;