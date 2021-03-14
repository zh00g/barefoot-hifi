import * as React from 'react';

import { Button, Text, View, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { Overlay } from 'react-native-elements';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import OverlayComponent from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ToggleButton } from 'react-native-paper';
import SwitchButton from 'switch-button-react-native';
import { Metrics } from '../Themes';
import Swiper from 'react-native-swiper'


const GOOGLE_API_KEY = 'AIzaSyBBUZTSrNRyshhKeOmNp5W9nWKM4-Irsgg';
const destination = {latitude: 37.771707, longitude: -122.4053769};
const origin = {latitude: 37.78825, longitude: -122.4324};
const place = {latitude: 37.8, longitude: -122.4}


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
        },
        switch: true,
        overlay: false,

      }
    }


  
    onRegionChange(region) {
        this.setState({ region });
    }

  
    render() { 
      if (this.props.flag) {
        return (
          <MapView
          style = {styles.map}
          onRegionChange={this.onRegionChange}
          initialRegion = {{           
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
          animatetoRegion = {this.state.region}>
            <MapView.Marker 
            key = 'key' 
            title = 'Owl Trail' 
            image = {require("../Images/origin.png")}
            coordinate = {origin} 
            onCalloutPress={() => this.props.navigation.navigate('Preview')} />

            <MapView.Marker 
            key = 'key1' 
            title = 'Owl Trail' 
            image = {require("../Images/barefoot.png")}
            coordinate = {place} 
            onCalloutPress={() => this.props.navigation.navigate('Preview')} />

            <MapView.Marker 
            key = 'key2' 
            title = 'Definitely not the owl trail' 
            image = {require("../Images/barefoot.png")}
            coordinate = {destination} 
            onCalloutPress={() => this.props.navigation.navigate('Preview')}/>
            

          </MapView>
        );
      }
      else  {

        var mode;
        if (this.state.switch) {
          mode = 'LEARN MODE';
          return (
          <View style = {styles.map}>
            <MapView
            style = {styles.map}
            onRegionChange={this.onRegionChange}
            initialRegion = {{           
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            animatetoRegion = {this.state.region}>
  

  
              <MapView.Marker key = 'key' title = 'Start' image = {require("../Images/origin.png")} coordinate = {origin} />
              <MapView.Marker key = 'key2' title = 'End' coordinate = {destination}/>
              <MapViewDirections
                origin = {origin}
                destination = {destination}
                apikey = {GOOGLE_API_KEY}
                strokeWidth = {3}
              />
              
  
            </MapView>

            <View style = {styles.switch}> 
              <TouchableOpacity  
              activeOpacity = {0.5} 
              onPress={() => this.setState({switch: !this.state.switch})}
              style = {styles.previewbutton}>
                {/* <Text style = {{fontSize: 18,
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "uppercase"}}> 
                  {mode} 
                </Text> */}
                <Image style = {{width:200, height:200, resizeMode: 'contain'}} source={require('../mapmodetoggle.png')} />
              </TouchableOpacity>
            </View>
            <View style={{position: 'absolute', right: '4.5%'}}>
                <TouchableOpacity title = "" style={styles.smallbutton} onPress={() => this.setState({overlay: !this.state.overlay})}>
                  <Image source = {require('../Question.png')} style={{resizeMode: 'contain', marginTop:10}} />
                </TouchableOpacity>
            </View>

                <Overlay isVisible={this.state.overlay} onBackdropPress={() => this.setState({overlay: !this.state.overlay})}>
                  <View style={styles.wrap}>
                    <Swiper style={styles.wrapper} showsButtons={true}>
                      <View style={styles.slide1}>
                        <Text style={styles.text}>Follow the trail</Text>
                      </View>
                      <View style={styles.slide2}>
                        <Text style={styles.text}>Look at the map</Text>
                      </View>
                      <View style={styles.slide3}>
                        <Text style={styles.text}>lmao</Text>
                      </View>
                    </Swiper>
                  </View>
                </Overlay>

          </View>  
          );
          
        }
        else {
          mode = "MAP MODE";

          return (
            <View> 

              <Image style={{width:'100%', height:'100%'}} source= {require('../handsfree.png')}/>
              <View style={styles.switch}>
                <TouchableOpacity  
                  activeOpacity = {0.5} 
                  onPress={() => this.setState({switch: !this.state.switch})}
                  style = {styles.previewbutton}>
                    {/* <Text style = {{fontSize: 18,
                      color: "#fff",
                      fontWeight: "bold",
                      textTransform: "uppercase"}}> 
                      {mode} 
                    </Text> */}
                    <Image style = {{width:200, height:200, resizeMode: 'contain'}} source={require('../learnmodetoggle.png')} />
                </TouchableOpacity>
              </View>
              <View style={{position: 'absolute',right: '4.5%'}}>
                <TouchableOpacity style={styles.smallbutton} title = "" style={styles.smallbutton} onPress={() => this.setState({overlay: !this.state.overlay})}>
                  <Image source = {require('../Question.png')} style={{resizeMode:'contain', marginTop:10}}/>
                </TouchableOpacity>
              </View>

              <Overlay isVisible={this.state.overlay} onBackdropPress={() => this.setState({overlay: !this.state.overlay})}>
                  <View style={styles.wrap}>
                    <Swiper style={styles.wrapper} showsButtons={true}>
                      <View style={styles.slide1}>
                        <Text style={styles.text}>Display a fact</Text>
                      </View>
                      <View style={styles.slide2}>
                        <Text style={styles.text}>Look at the fact</Text>
                      </View>
                      <View style={styles.slide3}>
                        <Text style={styles.text}>Dumbass</Text>
                      </View>
                    </Swiper>
                  </View>
              </Overlay>


            </View>
          )
        }
        
       
      }
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
  switch: {
    position: 'absolute',
    alignSelf: 'center',
    top: 24,  
  },
  cover: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
  nocover: {
    opacity: 0,
  },
  opaque: {
    opacity: 1,
  },
  previewbutton: {
    //backgroundColor: "#52ADA8",
    width:180,
    height:40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cont: {
    width: '100%',
    height: '100%',
  },
  smallbutton: {
    width: 35 ,
    height:35,
  },
  wrap: {
    width: 200,
    height: 200,
  },
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

});

export default MapComponent;
