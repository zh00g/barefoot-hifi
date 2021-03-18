import * as React from 'react';
import * as Font from 'expo-font';

import { Button, Text, View, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { Overlay } from 'react-native-elements';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import OverlayComponent from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ToggleButton } from 'react-native-paper';
import SwitchButton from 'switch-button-react-native';
import { Metrics } from '../Themes';
import Swiper from 'react-native-swiper';


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
        fontsLoaded: false,

      }
    }

    async loadFonts() {
      await Font.loadAsync({
        // Load a font `Montserrat` from a static resource
        Raleway: require('../assets/fonts/Raleway-Regular.ttf'),
        RalewayBold:  require('../assets/fonts/Raleway-Bold.ttf'),
      });
      this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
      this.loadFonts();
    }

    

  
    onRegionChange(region) {
        this.setState({ region });
    }

  
    render() { 
      var overlaysliders;
      if (this.props.createflag) {
        overlaysliders =                     <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text1}>Ready to begin exploring?</Text>
          <Text style={styles.text2}>Once you’ve arrived, hit record to begin tracking your stats and route to publish later.</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text1}>Stumble upon something amazing?</Text>
          <Text style={styles.text2}>Hit add landmark to document your find!</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text1}>Taking a break?</Text>
          <Text style={styles.text2}>Hit pause to pause your recording and resume when you’re ready to begin again!</Text>
        </View>
        <View style={styles.slide4}>
          <Text style={styles.text1}>Finished?</Text>
          <Text style={styles.text2}>Hit stop and begin filling out the details of your adventure!</Text>
        </View>
        </Swiper>
        
      }
      if (!this.props.createflag) {
        overlaysliders = 
        <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text1}>Welcome to the Owl Trail!</Text>
          <Text style={styles.text2}>Before you begin, let’s explore a few tips and tricks you can follow!</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text1}>Don’t want the distraction of the map?</Text>
          <Text style={styles.text2}>Open Learn Mode to hear directions and information instead!</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text1}>Let’s get moving!</Text>
          <Text style={styles.text2}>Hit start follow to track your mileage and other stats!</Text>
        </View>
        <View style={styles.slide4}>
          <Text style={styles.text1}>Stumble upon something amazing?</Text>
          <Text style={styles.text2}>Hit add landmark to document your find!</Text>
        </View>
        </Swiper>
      }
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
          if (this.props.bflag) {
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

                  <Overlay overlayStyle={styles.endtrailconfirm} isVisible={this.state.overlay} onBackdropPress={() => this.setState({overlay: !this.state.overlay})}>
                    <View style={styles.wrap}>
                    <View style={{height: 30, width: 30, left: '3%', top: '4%'}}>
                        <TouchableOpacity style={styles.exitbutton} onPress={() => this.setState({overlay: !this.state.overlay})}>
                          <Image source = {require('../Images/exitbutton.png')} style={{width: 20, height: 20, resizeMode:'contain'}}/>
                        </TouchableOpacity>
                      </View>
                      {overlaysliders}
                    </View>
                  </Overlay>

            </View>  
            );
          }
          else {
            return(
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

                  <Overlay overlayStyle={styles.endtrailconfirm} isVisible={this.state.overlay} onBackdropPress={() => this.setState({overlay: !this.state.overlay})}>
                    <View style={styles.wrap}>
                    <View style={{height: 30, width: 30, left: '3%', top: '4%'}}>
                        <TouchableOpacity style={styles.exitbutton} onPress={() => this.setState({overlay: !this.state.overlay})}>
                          <Image source = {require('../Images/exitbutton.png')} style={{width: 20, height: 20, resizeMode:'contain'}}/>
                        </TouchableOpacity>
                      </View>
                      {overlaysliders}
                    </View>
                  </Overlay>

            </View>
            );
          }
          
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

              <Overlay overlayStyle={styles.endtrailconfirm} isVisible={this.state.overlay} onBackdropPress={() => this.setState({overlay: !this.state.overlay})}>
                  <View style={styles.wrap}>
                    <View style={{height: 25, width: 25, left: '3%', top: '4%'}}>
                      <TouchableOpacity style={styles.exitbutton} onPress={() => this.setState({overlay: !this.state.overlay})}>
                        <Image source = {require('../Images/exitbutton.png')} style={{width: 20, height: 20, resizeMode:'contain'}}/>
                      </TouchableOpacity>
                    </View>
                    <Swiper style={styles.wrapper} showsButtons={true}>
                      <View style={styles.slide1}>
                        <Text style={styles.text1}>Let's learn!</Text>
                        <Text style={styles.text2}>New facts based on your trail will be displayed here!</Text>
                      </View>
                      <View style={styles.slide2}>
                        <Text style={styles.text1}>Need to see the map? </Text>
                        <Text style={styles.text2}>Press on map mode! </Text>
                      </View>
                      <View style={styles.slide3}>
                        <Text style={styles.text1}>Stumble upon something amazing?</Text>
                        <Text style={styles.text2}>Hit add landmark to document your find!</Text>
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
  exitbutton: {
    width: '100%',
    height: '100%',
  },
  wrap: {
    // width: 240,
    // height: 240,
  },
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5F0EC',
    padding: 25,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5F0EC',
    padding: 25,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5F0EC',
    padding: 25,
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5F0EC',
    padding: 25,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text1: {
    color: '#376171',
    fontSize: 20,
    fontFamily: 'RalewayBold',
    textAlign: 'center',
  },
  text2: {
    color: '#376171',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Raleway',
    textAlign: 'center',
  },
  endtrailconfirm: {
    backgroundColor: "#F5F0EC",
    width: 300,
    height: 250,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default MapComponent;
