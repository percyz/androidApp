
import React, { Component } from 'react';
import { Image, Dimensions, Alert, AsyncStorage, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Left, Right,
  Body, Input, InputGroup, Item, ListItem, CheckBox, Spinner, View, Icon } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import sha256 from 'crypto-js/sha256';
import MapView from 'react-native-maps';
import { openDrawer } from '../../actions/drawer';
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import NewFooter from '../newFooter';
import styles from './styles';

const scanIcon = require('../../../images/Scanner_Grey.png');
const champ = require('../../../images/champMarker.png');

class LeaderBoard extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
      super(props);
      this.state = {
          toggle: false,
          results: {
            items: []
          },
          orgNames: [],
          orgInfo: [],
          region: {  
            latitude: -45.8669784,
            longitude: 170.51735800000006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          initialLatitude: -45.8788,
          initialLongitude: 170.5028,
          mapMarkerLoaded: false,
      };
  }

  componentWillMount() {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            initialLatitude: position.coords.latitude,
            initialLongitude: position.coords.longitude,
            region:{latitude: position.coords.latitude,longitude: position.coords.longitude,
                    latitudeDelta: 0.0922, longitudeDelta: 0.0421},
            locationError: null,
          });
          //console.log("position.coords.latitude", position.coords.latitude);
        },
        (error) => this.setState({ locationError: error.message }),
        //console.log("position.coords.latitude error", this.state.locationError),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      //GET
      //fetch("https://geiaiostest.herokuapp.com/new/orgs", {
      fetch("https://geia-app.herokuapp.com/orgs", {
              method: "GET",
              mode: "cors",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/x-www-form-urlencoded"
                  //"Content-Type": "application/json"
              },

              //body: requestBodyPoint
      }).then((res) => {
          console.log("fetch request ", res);
           console.log("fetch request ", res.ok);
            if(res.ok){
                res.json().then((json) => {
                   console.info(json);
                   this.setState({orgInfo:json});
                   orgInfoComplete = json;
                   console.log('complete is :',json)
                   console.log("orgInfo",this.state.orgInfo.length);
                   if(this.state.orgInfo.length > 2){
                       this.setState({
                         mapMarkerLoaded:true,
                         //orgNames:json
                        });
                   };
                   //orgNamInd = orgNams.name.
                });
            }else{
            Alert.alert("server is busying, try again later 1");
            console.log("server is busying, try again later 1");
            }
      })
      .catch(function(err){
        Alert.alert("server is busying, try again later 2", err);
        console.log("server is busying, try again later 2", err);
      })
  };

/*
  toggleText() {
    if(this.state.toggle){
      return (
      <View>
      <View style={styles.moreText}>
        <Text style={styles.gray}>Geia Rewards</Text>
      <Icon style={{marginLeft:'auto', marginRight:30, marginTop: 'auto', marginBottom: 'auto', fontSize:25}}
            name="md-close-circle"
            onPress={() => this.setState({toggle: !this.state.toggle})}
      />

      </View>
      <View>
      <Text style={{fontSize: 16, padding: 20}}>Shop with the Geia Rewards partners listed below. Scan the Geia
      QR codes at the counter and collect chances to win in the weekly Friday cash prize.
      1 point = 1 chance</Text>
      </View>
      </View>
      )
    }else {
      return (
        <View style={styles.subTitle}>
        <Text style={styles.gray}>Geia Rewards</Text>
        <Icon style={{marginLeft:'auto', marginRight:30, marginTop: 'auto', marginBottom: 'auto', fontSize:25}}
              name="md-information-circle"
              onPress={() => this.setState({toggle: !this.state.toggle})}
        />

        </View>
      )
    }
  }
*/
  render() {
    const { navigateTo } = this.props.navigation;
    var neworgs = "";
    console.log("this.state.orgInfo: ", this.state.orgInfo.length);
    const orgMapData = [];
    for(var i = 0; i < this.state.orgInfo.length; i++){
      orgMapData.push({
        latitude:this.state.orgInfo[i].latitude,
        longitude:this.state.orgInfo[i].longitude,
        title:this.state.orgInfo[i].name,
        location:this.state.orgInfo[i].address.street + ' --- 10pts',
        image:champ
      });
    };

/*
    if(this.state.orgInfo.length == 0) {
      neworgs =
      <View>
      <View style={styles.items}>
        <View style={{marginRight: 'auto', paddingTop:5, marginLeft:20}}>
           <Text style={{fontSize:25}}>Startup Dunedin</Text>
           <Text note>20 Leithbank, North Dunedin, Dunedin</Text>
           <Text> </Text>
         </View>
         <View style={{marginLeft: 'auto', paddingTop:15, marginRight:20}}>
           <Text style={{fontSize:25}}>20 pts</Text>
           <Text> </Text>
         </View>
      </View>
      <View style={styles.items}>
        <View style={{marginRight: 'auto', paddingTop:5, marginLeft:20}}>
           <Text style={{fontSize:25}}>Vogel St Kitchen</Text>
           <Text note>76 Vogel St Dunedin</Text>
           <Text> </Text>
         </View>
         <View style={{marginLeft: 'auto', paddingTop:15, marginRight:20}}>
           <Text style={{fontSize:25}}>20 pts</Text>
           <Text> </Text>
         </View>
      </View>
      <View>
      <Spinner color="#88C040"></Spinner>
      </View>
      </View>
    }else {
      console.log("this.state.orgInfo.length: ", this.state.orgInfo);
      neworgs = this.state.orgInfo.map((orgs, index) =>
      <View style={styles.items} key={index}>
        <View style={{marginRight: 'auto', paddingTop:5, marginLeft:20}}>
           <Text style={{fontSize:25}}>{orgs.name}</Text>
           <Text note>{orgs.address.street}</Text>
           <Text> </Text>
         </View>
         <View style={{marginLeft: 'auto', paddingTop:15, marginRight:20}}>
           <Text style={{fontSize:25}}>{orgs.points} pts</Text>
           <Text> </Text>
         </View>
      </View>
      );
    }
*/

    return (
      <Container style={styles.container}>

      <Header style={styles.header}>
        <Left style={{flex:1}}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" className="angle-left"/>
        </Button>
        </Left>

        <Body style={styles.headerBody}>
            <Icon style={{color: 'white', fontSize:30}} name="ios-paper-plane" />
        </Body>

        <Right style={{flex:1}}>
          <Text> </Text>
        {/*
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button> 
          */}
        </Right>
      </Header>



        <Content style={styles.subContainer}>       
          <View style={styles.mapView}>
            {/*
            {this.toggleText()}
              {neworgs}
          </View>

          <View style={{flex: 0.2}}>

            <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Terms')}>
              <Image source={scanIcon} style={styles.newScan} />
            </TouchableOpacity>
            */}

            <MapView
              style={styles.mapContent}
              region={this.state.region}
            >
            {!this.state.mapMarkerLoaded? null :
              <View>
              <MapView.Marker
                key={'Your Location'}
                coordinate={{latitude:this.state.initialLatitude, longitude:this.state.initialLongitude}}
                title={'Your Location'}
                image={champ}
              />
              {orgMapData.map(marker => (
                    <MapView.Marker
                      key={marker.title}
                      coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                      title={marker.title}
                      description={marker.location}
                      image={marker.image}
                    />
               ))}
               </View>
               } 
            </MapView>
            
          </View>
          <Header searchBar rounded style={styles.searchBar}>     
          <Item>     
              <Icon name="search" />
              <TextInput 
                      placeholder="Search industry/region/names ..." 
                      placeholderTextColor='black'
                      //onChangeText={this.onNamChange}
                      //value={this.state.selectedNam} 
                      style={styles.searchBarName}
                      underlineColorAndroid='transparent'
              />
          </Item>
          </Header>
          

        </Content>

      <NewFooter
        navigate={this.props.navigation.navigate}
        destinationLeaderboard="LeaderBoard"
        destinationSpin="Spin"
        destinationUserPoints="UserPoints"
      />
      </Container>
    );
  }
}

export default LeaderBoard;
