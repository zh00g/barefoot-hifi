import React, {useState} from 'react';
import { Button, Text, View, StyleSheet, PickerIOSComponent, TouchableOpacity, Icon} from 'react-native';
import { Overlay } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from 'react-native-maps';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import MapComponent from './components/mapComponent.js'
//testing commit
//testing commit 2

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function TrailPreviewScreen(props, { navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trail Preview!</Text>
      <Button
        title="Let's Go"
        onPress={() => props.navigation.navigate('MapStart')}
      />
    </View>
  );
}

function MapStartScreen(props, {navigation}) {
  return (
    <View style={styles.container_mapstart}>
      <View style={styles.map}> 
      <MapComponent />
      </View>
      <View style = {styles.recordingbar}> 
    <TouchableOpacity activeOpacity={0.5} onPress = {() => props.navigation.navigate('MapMid')}>
      <MaterialCommunityIcons style = {styles.recordButton} name="record-rec" size={60} color="red"/>
    </TouchableOpacity>
    </View>
    </View>
    
  );
}

function MapMidScreen(props, {navigation}) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={styles.container_mapstart}>
      <View style={styles.map}> 
      <MapComponent />
      </View>
      <View style = {styles.recordingbar}> 
    <TouchableOpacity activeOpacity={0.5} onPress = {toggleOverlay}>
      
    <Overlay overlayStyle = {styles.endtrailconfirm} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Would you like to save your recording?</Text>
        <View style = {styles.yesnobar}>
              <Button title = "Yes" onPress = {() => 
                props.navigation.navigate('Congrats')}/>
              <Button title = "No" onPress = {() => props.navigation.navigate('Explore')}/>
          </View>
    </Overlay>
    
      <MaterialCommunityIcons style = {styles.recordButton} name="stop" size={60} color="red"/>
    </TouchableOpacity>
    </View>
    </View>
    
  );
}

function CongratsScreen(props, {navigation}) {
  return (
    <View style={styles.congratscontainer}>
     <Text> Finished Trail!! </Text>
     <View style = {styles.sharesendbar}>
     <TouchableOpacity activeOpacity={0.5} onPress = {() => props.navigation.navigate('Friends')}>
      <FontAwesome style = {styles.recordButton} name="send-o" size={60} color="#376171"/>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.5} onPress = {() => props.navigation.navigate('Explore')}>
      <AntDesign style = {styles.recordButton} name="arrowright" size={60} color="#376171"/>
    </TouchableOpacity>
     </View>
    
    </View>
    
  );
}

function FriendsListScreen(props) {
  return (
    <View style = {styles.placeholder}>
      <Text> friends list lol </Text>
    </View>
  )
}

function CameraScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Camera screen</Text>
    </View>
  );
}

function ExploreScreen({ navigation }) {
  return (
    <View style = {styles.container} >
    <View style = {styles.mapbox}>
    <Text>map picture</Text>
    </View>
    <View style={styles.trailpics}>
      <Text>Explore screen</Text>
      <Button
        title="Go to Trail Preview"
        onPress={() => navigation.navigate('Preview')}
      />
    </View>
    </View>
  );
}
function FeedScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function CreateScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Preview" component={TrailPreviewScreen} />
      <ExploreStack.Screen name="MapStart" component={MapStartScreen}/>
      <ExploreStack.Screen name="MapMid" component={MapMidScreen}/>
      <ExploreStack.Screen name="Congrats" component={CongratsScreen}/>
      <ExploreStack.Screen name="Friends" component={FriendsListScreen}/>
    </ExploreStack.Navigator>
  );
}

// const TrailPreviewStack = createStackNavigator();

// function TrailPreviewStackScreen() {
//   return (                                  
//     <TrailPreviewStack.Navigator>
//       <TrailPreviewStack.Screen name="Preview" component={TrailPreviewScreen} />
//       {/* <TrailPreviewStack.Screen name="MapStart" component={MapStartScreen} /> */}
//     </TrailPreviewStack.Navigator>
//   );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
// }


const FeedStack = createStackNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      <FeedStack.Screen name="Details" component={DetailsScreen} />
    </FeedStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Details" component={DetailsScreen} />
    </ProfileStack.Navigator>
  );
}

const CreateStack = createStackNavigator();

function CreateStackScreen() {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="Create" component={CreateScreen} />
      <CreateStack.Screen name="Details" component={DetailsScreen} />
    </CreateStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Cam" component={CameraScreen} />
        <Tab.Screen name="Feed" component={FeedStackScreen} />
        <Tab.Screen name="Explore" component={ExploreStackScreen} />
        <Tab.Screen name="Create" component={CreateStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F5F0EC",
    alignItems: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F5F0EC",
    // alignItems: "center",
  },
  congratscontainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sharesendbar: {
    display: "flex",
    flexDirection: "row",
  },
  container_mapstart: {
    flex: 1,
    backgroundColor: "#F5F0EC",
    justifyContent: "flex-end",
    //alignItems: "center",
  },
  mapbox: {
    flex: 1,
    backgroundColor: "lightgreen",
    //alignItems: "center",
  },
  trailpics: {
    flex: 2,
    backgroundColor: "lightblue",
    //alignItems: "center",
  },
  map: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
  },
  popup: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  endtrailconfirm: {
    backgroundColor: "#F5F0EC",
    width: 200,
    height: 200,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingbar: {
    flex:0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  yesnobar: {
    display: "flex",
    flexDirection: "row",
  }
  
});