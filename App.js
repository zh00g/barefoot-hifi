import React, { useState,useEffect } from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  PickerIOSComponent,
  TouchableOpacity,
  TextInput,
  Icon,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { Camera, requestPermissionsAsync } from 'expo-camera';
import { Overlay } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MapView from 'react-native-maps';
import { Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import MapComponent from './components/mapComponent.js'
import { Metrics } from './Themes/index.js';
import metrics from './Themes/Metrics.js';
//testing commit
//testing commit 2

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function TrailPreviewScreen(props, { navigation }) {
  const trailpics = [
    {
      id: "1",
      image: require("./Images/trailpreview.png"),
    }, 
    
  ]
  const trailreviews = [
    {
      id: "1",
      image: require("./Images/trailreview.png"),
    }, 
    
  ]
  const Pics = ({ image }) => (
    <View >
      <Image style={{resizeMode: 'contain'}} source = {image}/>
    </View>
  );
  const renderItem = ({ item }) => (
    <Pics style = {{resizeMode: 'contain'}} image={item.image} />
  );

  return (
    <View style= {styles.previewscreen}>
      <ScrollView>
        {/* <Text> Owl Trail!</Text> */}
      <View style = {styles.trailinfopicbox}> 
      
      <FlatList
        horizontal = {true}
        data={trailpics}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> 
      
      </View>
      

      <View style = {styles.trailinfo}>
        <Image style = {styles.trailinfopic} source = {require("./Images/trailinfo.png")} />
      </View>
      
      <View style = {styles.previewbuttonbox}> 
      <TouchableOpacity  
      activeOpcaity = {0.5} 
      onPress={() => props.navigation.navigate('MapStart')}
      style = {styles.previewbutton}>
      <Text style = {{fontSize: 18,
          color: "#fff",
          fontWeight: "bold",
          textTransform: "uppercase"}}> 
          Let's Go! 
          </Text>
      </TouchableOpacity>
      </View>

      <View style = {{margin:10}}> 
      </View>

      <View style = {styles.trailinfo}>
        <Image style = {styles.trailinfopic} source = {require("./Images/previewmap.png")} />
      </View>

      <View style = {{margin:20}}> 
      </View>

      <View style = {styles.trailinfo}>
      <FlatList
        horizontal = {true}
        data={trailreviews}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> 
      </View>
      </ScrollView>
    </View>
  );
}

function MapStartScreen(props, { navigation }) {
  return (
    <View style={styles.container_mapstart}>
      <View style={styles.map}>
        <MapComponent />
      </View>
      <View style={styles.recordingbar}>
        <TouchableOpacity style={styles.recordButton} activeOpacity={0.5}>
          <Image style={styles.recordButtonIcon} source= {require('./Images/learnicon.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recordButton} activeOpacity={0.5} onPress={() => props.navigation.navigate('MapMid')}>
          <Image style={styles.recordButtonIcon} source= {require('./Images/startfollow.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.recordButton} activeOpacity={0.5}>
          <Image style={styles.recordButtonIcon} source= {require('./Images/addlandmark.png')}/>
        </TouchableOpacity>
      </View>
    </View>

  );
}

function MapMidScreen(props, { navigation }) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={styles.container_mapstart}>
      <View style={styles.map}>
        <MapComponent navigation = {navigation} flag = {false}/>
      </View>
      <View style={styles.recordingbar}>
        <TouchableOpacity activeOpacity={0.5} onPress={toggleOverlay}>

          <Overlay overlayStyle={styles.endtrailconfirm} isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Would you like to save your recording?</Text>
            <View style={styles.yesnobar}>
              <Button title="Yes" onPress={() =>
                props.navigation.navigate('Congrats')} />
              <Button title="No" onPress={() => props.navigation.navigate('Explore')} />
            </View>
          </Overlay>

          <MaterialCommunityIcons style={styles.recordButton} name="stop" size={60} color="red" />
        </TouchableOpacity>
      </View>
    </View>

  );
}

function CongratsScreen(props, { navigation }) {
  return (
    <View style={styles.congratscontainer}>
      <Text> Finished Trail!! </Text>
      <View style={styles.sharesendbar}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Friends')}>
          <FontAwesome style={styles.recordButton} name="send-o" size={60} color="#376171" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Explore')}>
          <AntDesign style={styles.recordButton} name="arrowright" size={60} color="#376171" />
        </TouchableOpacity>
      </View>

    </View>

  );
}

function FriendsListScreen(props) {
  const friends = [
    {
      id: '1',
      title: 'Grace!',
    },
    {
      id: '2',
      title: 'Rachel!',
    },
    {
      id: '3',
      title: 'Katrina!',
    },
    {
      id: '4',
      title: 'Anthony!',
    },
    {
      id: '5',
      title: 'Victoria!',
    },
    {
      id: '6',
      title: 'Dr. Landay!',
    },
  ];

  const Item = ({ title }) => (
    <TouchableOpacity activeOpacity={0.5} style={styles.item}>
      <Ionicons name="person-circle-outline" color={"#A6D2AE"} size={60} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };



  return (
    <View style={styles.friendscontainer}>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.friendslistpageheader}> Send </Text>
      </View>


      <View style={styles.searchSection}>
        <TouchableOpacity activeOpacity={0.5}>
          <FontAwesome style={styles.searchIcon} name="search" size={20} color="#A6D2AE" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search!"
          //onChangeText={(text) => setText(text)}
          //onSubmitEditing = {onSubmitEditing}
          style={styles.textInput}
        //value={text}
        />
      </View>


      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />


      <View style={styles.friendsbutton}>
        <TouchableOpacity activeOpacity={0.5} onPress={toggleOverlay}>
          <FontAwesome style={styles.recordButton} name="send-o" size={60} color="#376171" />
          <Overlay overlayStyle={styles.endtrailconfirm} isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Sent!</Text>
            <View style={styles.yesnobar}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Explore')}>
                <AntDesign style={styles.recordButton} name="checkcircleo" size={60} color="#376171" />
              </TouchableOpacity>
            </View>
          </Overlay>

        </TouchableOpacity>
      </View>
    </View>
  )
}

function CameraScreen() {
//   return (
//     <View style={styles.placeholder}>
//       <Text>Camera screen</Text>
//     </View>
//   );
// }
const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.camcontainer}>
      <View style = {styles.camtitle}> 
      <Text style = {{fontSize:20}}> Camera View! </Text>
      </View>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cambutton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.camtext}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      </View>
  );
}

function ExploreScreen({ navigation }) {
  const tags = [
    {
      id: "1",
      image: require("./Images/tagbar.png"),
    }, 
  ]
  const Pics = ({ image }) => (
    <View >
      <Image style={{resizeMode: 'contain', margin:10}} source = {image}/>
    </View>
  );
  const renderItem = ({ item }) => (
    <Pics style = {{resizeMode: 'contain'}} image={item.image} />
  );

  const Post = ({ image }) => (
    <View> 
    <TouchableOpacity 
          activeOpacity = {0.9} 
          style={styles.item2}
          onPress={() => navigation.navigate('Preview')}>
      <Image style={styles.img1} source = {image}/>
    </TouchableOpacity>
    <Text style = {{marginLeft:20, marginBottom:10, color: '#376171'}}> Owl Trail </Text> 
    </View>
  );
  return (
    <View style = {styles.container}>
      <View style={styles.mapbox}>
        <MapComponent navigation = {navigation} flag = {true}/>
      </View>


      <View style={styles.trailpics}>

      <FlatList
        horizontal = {true}
        data={tags}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> 
      <ScrollView style={styles.scroll}>
        <View style={styles.rowsplit}>
          <View style={styles.exploreimage}>
            <Post image={require('./Images/R27.png')} />
            {/* <Text> Owl Trail </Text> */}
            <Post image={require('./Images/R29.png')} />
            {/* <Text> Owl Trail </Text> */}
            <Post image={require('./Images/R31.png')} />
            {/* <Text> Owl Trail </Text> */}
          </View>
          <View style={styles.exploreimage2}>
            <Post image={require('./Images/R28.png')} />
            {/* <Text> Owl Trail </Text> */}
            <Post image={require('./Images/R30.png')} />
            {/* <Text> Owl Trail </Text> */}
            <Post image={require('./Images/R32.png')} />
            {/* <Text> Owl Trail </Text> */}
          </View>
          <Post image={require('./Images/R33.png')} />
          {/* <Text> Owl Trail </Text> */}
        </View>
        
      </ScrollView>
      </View>
    </View>
  );
}

function FeedScreen({ navigation }) {
  const stories = [
    {
      id: "1",
      image: require("./Images/stories.png"),
    }, 
  ]
  const posts = [
    {
      id: "1",
      image: require("./Images/post1.png"),
    }, 
    {
      id: "2",
      image: require("./Images/post2.png")
    },
  ]
  const Post = ({ image }) => (
    <TouchableOpacity 
          activeOpacity = {0.9} 
          style={styles.item}
          onPress={() => navigation.navigate('Preview')}>
      <Image style={styles.img} source = {image}/>
    </TouchableOpacity>
  );
  const Story = ({ image }) => (
    <View 
          activeOpacity = {0.9} 
          style={styles.item}>
      <Image style={styles.img} source = {image}/>
    </View>
  );
  const renderItem = ({ item }) => (
    <Post image={item.image} />
  );
  const renderItem2 = ({ item }) => (
    <Story image={item.image} />
  );


  return (
    <View style={styles.container}>
      {/* <Text>Feed screen</Text> */}
      <View style = {styles.storybox}>
      <FlatList
      horizontal = {true}
        data={stories}
        renderItem={renderItem2}
        keyExtractor={item => item.id}
      />
      </View>
      <View style = {styles.feedbox}>
      {/* {type} */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
    </View>
  );
}

function CreateScreen(props, { navigation }) {
  return (
    <View style={styles.container_mapstart}>
      <View style={styles.map}>
        <MapComponent />
      </View>
      <View style={styles.recordingbar}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('MapMid')}>
          <MaterialCommunityIcons style={styles.recordButton} name="record-rec" size={60} color="red" />
        </TouchableOpacity>
      </View>
    </View>

  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.placeholder}>
      <ScrollView 
      contentContainerStyle={{alignItems: 'center'}}>
      <View>
        <Image source = {require('./Images/profile.png')} style = {styles.profileimg} />
      </View>
      </ScrollView>
     
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Preview" component={TrailPreviewScreen} />
      <ExploreStack.Screen name="MapStart" component={MapStartScreen} />
      <ExploreStack.Screen name="MapMid" component={MapMidScreen} />
      <ExploreStack.Screen name="Congrats" component={CongratsScreen} />
      <ExploreStack.Screen name="Friends" component={FriendsListScreen} />
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
      <FeedStack.Screen name="Preview" component={TrailPreviewScreen} />
      <FeedStack.Screen name="MapStart" component={MapStartScreen} />
      <FeedStack.Screen name="MapMid" component={MapMidScreen} />
      <FeedStack.Screen name="Congrats" component={CongratsScreen} />
      <FeedStack.Screen name="Friends" component={FriendsListScreen} />
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
      <CreateStack.Screen name="MapStart" component={MapStartScreen} />
      <CreateStack.Screen name="MapMid" component={MapMidScreen} />
      <CreateStack.Screen name="Congrats" component={CongratsScreen} />
      <CreateStack.Screen name="Friends" component={FriendsListScreen} />
    </CreateStack.Navigator>
  );
}

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      activeColor="#376171"
      labelStyle={{ fontSize: 16 }}
      barStyle={{
        backgroundColor: '#F5F0EC',
        borderColor: '#376171',
        borderTopWidth: 2,
      }}
    >
      <Tab.Screen
        name="Cam"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Cam',
          tabBarIcon: ({ color }) => (
            <AntDesign name="camerao" color={"#376171"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedStackScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={"#376171"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" color={"#376171"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateStackScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" color={"#376171"} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" color={"#376171"} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      {/* <Tab.Navigator>
        <Tab.Screen name="Cam" component={CameraScreen} />
        <Tab.Screen name="Feed" component={FeedStackScreen} />
        <Tab.Screen name="Explore" component={ExploreStackScreen} />
        <Tab.Screen name="Create" component={CreateStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  recordButton:{
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    //backgroundColor: 'pink',
  },
  recordButtonIcon:{
    flex: 1,
    resizeMode: 'contain',
  },
  profileimg: {
    flex:1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  profilepage: {
    flex:1,
    width: Metrics.screenWidth,
    // height: Metrics.screenHeight * 2,
    //resizeMode: 'contain',
  },
  previewscreen: {
    flex: 1,
    //backgroundColor: 'lightblue',
    backgroundColor: 'white',
    display: 'flex',
  },
  previewbuttonbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewbutton: {
    backgroundColor: "#52ADA8",
    width:200,
    height:50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  trailinfopicbox: {
    paddingTop:10,
    flex: 0.1,
  },
  trailinfo: {
    flex: 1,
    width: Metrics.screenWidth,
  },
  trailinfopic: {
    resizeMode: 'contain',
    width: Metrics.screenWidth,
  },
  camcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  camtitle:{
    // backgroundColor: 'pink',
    alignItems:'center',
  },
  camera: {
    flex: 0.7,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  cambutton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  camtext: {
    fontSize: 18,
    color: 'white',
  },
  storybox:{
    flex: 0.5,
    paddingTop: 10,
    // backgroundColor: "pink",
  },
  feedbox: {
    flex: 3,
    //backgroundColor: "lightgreen",
  },
  friendslistpageheader: {
    fontSize: 30,
  },
  friendsbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'pink',
    margin:10,
  },
  friendscontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  searchSection: {
    margin: 10,
    //width: Metrics.screenWidth - 20,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  searchIcon: {
    padding: 5,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5F0EC',
    // borderWidth: 1,
    // borderColor: '#376171',
    padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  tabstyle: {
    backgroundColor: "white",
  },
  placeholder: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    backgroundColor: "white",
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
    width: '100%',
    height: 270,
    //backgroundColor: "lightgreen",
    //alignItems: "center",
  },
  trailpics: {
    flex:2,
    //backgroundColor: "lightblue",
    //alignItems: "center",
  },
  map: {
    flex: 1,
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
    flex: 0.14,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5F0EC",
    borderRadius: 20,
  },
  yesnobar: {
    display: "flex",
    flexDirection: "row",
  },
  exploreimage: {
    width: '50%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  exploreimage2: {
    width: '50%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'flex-start',

  },
  img1: {
    display: 'flex',
    width: '100%',
    resizeMode: 'contain',
    margin: 0,
  },
  rowsplit: {
    display: 'flex',
    flexDirection: 'row',
  },
  item2: {
    display: "flex",
    flexDirection: "row",
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5F0EC',
    // borderWidth: 1,
    // borderColor: '#376171',
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
});