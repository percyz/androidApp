import React, { Component } from 'react';
import { View, Alert, FlatList, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Picker,
         Left, Right, Body, Item, Input, Card, CardItem, Spinner } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import { Slider }  from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import OrgList from '../orgList';
import styles from './styles';

GLOBAL = require('../../globals');
var orgInfoComplete = [];
var orgInfoUni = [];
var orgNamInd = [];
//var orgInfoArray = [];
const backgroundImage = require('../../../images/background.png');
const champ = require('../../../images/champMarker.png');
const valid = require('../../../images/validMarker.png');
const self = require('../../../images/selfMarker.png');

class LeaderBoard extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
      super(props);
      this.state = {
          viewLoadedMap: false,
          viewLoadedOrg: false,
          orgInfo: [],
          selectedNam: '',
          selectedReg: '',
          selectedCit: '',
          selectedInd: '',
          selectedCount: 0,
          selected: [],
          results: {
            items: []
          },
          orgNames: [],
          region: {  
            latitude: null,//-45.8669784,
            longitude: null,//170.51735800000006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          initialLatitude: -45.8788,
          initialLongitude: 170.5028,
          locationError: null,
          circleRadius: 1000
      };
  }

  componentWillMount() {

    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('#303030', true);

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
          //console.log("fetch request ", res);
            if(res.ok){
                res.json().then((json) => {
                   console.info(json);
                   this.setState({orgInfo:json}); 
                   orgInfoComplete = json;
                   console.log("orgInfo",this.state.orgInfo.length);
                   if(this.state.orgInfo.length >= 1){
                       this.setState({
                         viewLoadedOrg:true,
                         orgNames:json
                        });
                   };
                   //orgNamInd = orgNams.name.
                });
            }else{
            Alert.alert("Data is updating, try again later");
            //console.log("Data is updating, try again later");             
            }
      })
      .catch(function(err){
        Alert.alert("server is busying, try again later", err);
        //console.log("server is busying, try again later", err);
      })
  };

  componentDidMount() {

    //get org id for search box
      fetch("https://geia-app.herokuapp.com/orgs/search", {
              method: "GET",
              mode: "cors",
              headers: {
                  "Accept": "application/json",  
                  "Content-Type": "application/x-www-form-urlencoded"
                  //"Content-Type": "application/json"
              },

              //body: requestBodyPoint 
      }).then((res) => {
          //console.log("fetch request ", res);
            if(res.ok){
                res.json().then((json) => {
                   //console.info(json);
                   //this.setState({orgInfo:json}); 
                   orgInfoUni = json;
                   console.log("orgInfoUni",orgInfoUni);
                   /*
                   if(this.state.orgInfo.length >= 1){
                       this.setState({
                         viewLoadedOrg:true,
                         orgNames:json
                        });
                   };
                   */
                   //orgNamInd = orgNams.name.
                });
            }else{
            Alert.alert("Data is updating, try again later");
            //console.log("Data is updating, try again later");             
            }
      })
      .catch(function(err){
        Alert.alert("server is busying, try again later", err);
        //console.log("server is busying, try again later", err);
      })
  }

  onNamChange = (valueOrginal) => {
    value = valueOrginal.toLowerCase();
    this.setState({
      selectedNam : value
    });
    //console.log("search name value: ", value);

    //search name
      
    var namArray = [];
    var orgInfoArray = [];
    if(value == ""){
      this.setState({orgInfo:orgInfoComplete});
    }else{
      for(var i = 0; i < orgInfoUni.length; i++){
        /*
          if(value == orgInfoUni[i][0]){
            namArray = orgInfoUni[i][1];
            break;
          }
          */
          //console.log("search name function 1: ", orgInfoUni[i][0][0]);
          //console.log("search name function 2: ", orgInfoUni[i][0][0].indexOf(value))
          if(orgInfoUni[i][0][0].toLowerCase().indexOf(value) >= 0){
            //console.log("search name function 3: ", orgInfoUni[i][0].indexOf(value));
            namArray = orgInfoUni[i][1];
            break;
          }
      };
      //console.log("search name array: ", namArray);

      if(namArray.length >= 1){
          for(var i = 0; i < namArray.length; i++){
            for(var j = 0; j < orgInfoComplete.length; j++){
              if(namArray[i] == orgInfoComplete[j]._id ){
                orgInfoArray.push(orgInfoComplete[j]);
              }
            } 
          };
      };
        
      if(orgInfoArray.length >= 1){
        this.setState({orgInfo:orgInfoArray});
      };
    }    
  }

  onRegChange = (value) => {

    //search region
    newValue = value.trim();
    var regArray = [];
    var orgInfoArray = [];
    //var orgInfoArrayUniq = [...new Set(orgInfoArray)]; 
    if(value == "All Regions"){
      this.setState({
        orgInfo:orgInfoComplete,
        selectedReg : "",
      });
    }else{
        for(var i = 0; i < orgInfoComplete.length; i++){
            if(value == orgInfoComplete[i].address.region){
                regArray.push(i);
            }
        };

        if(regArray.length >= 1){
            //if the result of searching region is not null, we update the selectedReg value, it will update the city options
            this.setState({ selectedReg : value});
            for(var i = 0; i < regArray.length; i++){
              orgInfoArray.push(orgInfoComplete[regArray[i]]);
            };
        }else{
          Alert.alert("Sorry, we couldn't find anything...");
          this.setState({
            orgInfo:orgInfoComplete,
            selectedReg : "",
          });
        };

        if(orgInfoArray.length >= 1){
          this.setState({orgInfo:orgInfoArray});
        };
    }

  }

  onCitChange = (value) => {

    //search city
    var citArray = [];
    var orgInfoArray = [];
    //var orgInfoArrayUniq = [...new Set(orgInfoArray)];
    if(value == "All Districts") {
      this.setState({selectedCit: "All Districts"});
    }else{
      for(var i = 0; i < orgInfoComplete.length; i++){

        /* the updating of selectedReg will trigger this function, and the default value
          "All Districts" which at the top of the options will be used to following
          function, then the final result will be updated with a wrong district. So we 
          use "value != 'All Districts'" to exclude this posibility. */ 

          if(value == orgInfoComplete[i].address.city){
              citArray.push(i);
          }
      };

      if(citArray.length >= 1){
          this.setState({ selectedCit : value });
          for(var i = 0; i < citArray.length; i++){
            orgInfoArray.push(orgInfoComplete[citArray[i]]);
          };
      }else{
        Alert.alert("Sorry, we couldn't find anything...");
        this.setState({selectedCit: "All Districts"});
      };

      if(orgInfoArray.length >= 1){
        this.setState({orgInfo:orgInfoArray});
      };
    }

  }

  onIndChange = (value) => {
    this.setState({
      selectedInd : value
    });

    //search industry
    var indArray = [];
    var orgInfoArray = [];
    //var orgInfoArrayUniq = [...new Set(orgInfoArray)]; 
    //console.log("this.state.selectInd 00o", orgInfoArrayUniq);
    if(value == "All Industries"){
      this.setState({orgInfo:orgInfoComplete});
    }else{
      for(var i = 0; i < orgInfoComplete.length; i++){
          if(value == orgInfoComplete[i].industry){
              indArray.push(i);
          }
      };

      if(indArray.length >= 1){
          for(var i = 0; i < indArray.length; i++){
            orgInfoArray.push(orgInfoComplete[indArray[i]]);
          };
      }else{
        Alert.alert("Sorry, we couldn't find anything...");
        this.setState({
          orgInfo:orgInfoComplete,
          selectedInd: "All Industries"
        });
      };

      if(orgInfoArray.length >= 1){
        this.setState({orgInfo: orgInfoArray});
      };
    }
  }

  onMapRegionChange = (region) => {
    this.setState({ region });
  }

  onRadChange = (value) => {
    value = Number(value);
    this.setState({
      circleRadius : value,
    });
  }
    _renderItem =({item}) => (
        <OrgList 
            key={item._id}
            //onPressItem={this. _onPressItem}
            id={item._id} 
            orgName={item.name}
            region={item.address.region}
            city={item.address.city}
            industry={item.industry}
            scores={item.scores}
            stars={item.stars}
            validated={item.validated}
            logo={item.logo}
            authstatus={item.authstatus}
            rewards={item.rewards}
            //selected={!!this.setState({selected:item._id})}
        />
    );

    _keyExtractor = (item, index) => item._id;

    searchFunc = () => {
      //console.log("this.state.orgInfo 1", this.state.orgInfo);
      this.setState({viewLoadedOrg:false});
      /*
      this.setState({orgInfo: [{"_id":"k3SktoEidicwoRXhA","name":"Geia",
                                "address":{"street":"20 Leithbank, North Dunedin, Dunedin.",
                                "town":"All Districts","city":"Dunedin","region":"Otago"},
                                "logo":"https://cdn.filepicker.io/api/file/GN8aBSCRmiYW13hI9m23",
                                "scores":"23432","newScores":"","yScore":0,"stars":"3","industry":"Professional Services",
                                "validated":true,"checkstate":true,"state":true,"currentState":"Yes","authstatus":"champ","rank":3}]});
      */
      var orgInfoArray = [];
      var namArray = [];
      var regArray = [];
      var citArray = [];
      var indArray = [];
      //console.log("selectedReg",this.state.selectedReg);
      //console.log("selectedcit",this.state.selectedCit);
      //console.log("selectedInd",this.state.selectedInd);

/*
      if(this.state.selectedNam.trim() != ''){
        // if user search organisation name, don't consider the location&industry, give him a specific result 
          for(var i = 0; i < orgInfoComplete.length; i++){
            if(this.state.selectedNam.trim().toLowerCase() == orgInfoComplete[i].name.toLowerCase()){
              orgInfoArray.push(orgInfoComplete[i]);
              //break;
            }
          }
          console.log("nameArray1", orgInfoArray);
      }else if(this.state.selectedReg == ''){
        console.log("name is none, region is non");
        // if user skip the region, he must skip city, just consider the industry
          if(this.state.selectedInd == ''){
            // user skip the industry, nothing return 
              console.log("nothing been chosen");
              //break;  
          }else{
            // user just chose the industry 
              for(var i = 0; i < orgInfoComplete.length; i++){
                if(this.state.selectedInd == orgInfoComplete[i].industry){
                  orgInfoArray.push(orgInfoComplete[i]);
                }
              }
              console.log("nameArray2", orgInfoArray);
              //break;
          }
      }else{
          for(var i = 0; i < orgInfoComplete.length; i++){
              if(this.state.selectedReg == orgInfoComplete[i].address.region){
                  regArray.push(i);
              }
          };
          if(regArray.length >= 1){
              if(this.state.selectedCit == ''){
                  // user just chose the region without city 
                  if(this.state.selectedInd == ''){
                      // user just chose region without city and industry 
                      for(var i = 0; i < regArray.length; i++){
                        orgInfoArray.push(regArray[i]);
                      };
                      //break;        
                  }else{
                      // user just chose region and industry without city 
                      for(var i = 0; i < orgInfoComplete.length; i++){
                        if(this.state.selectedInd == orgInfoComplete[i].industry){
                          indArray.push(i);
                        }
                      };
                      if(indArray.length >= 1){
                          var resultArray = regArray.filter(val => indArray.includes(val));  
                          for(var i = 0; i < resultArray.length; i++){
                            orgInfoArray.push(resultArray[i]);
                          };
                          console.log("nameArray2", resultArray);
                          //break;
                      }
                  }
              }else{
                  // user chose the region and city, just calculate result form city 
                  if(this.state.selectedInd == ''){
                      // user just chose city 
                      for(var i = 0; i < orgInfoComplete.length; i++){
                        if(this.state.selectedCit == orgInfoComplete[i].address.city){
                          orgInfoArray.push(orgInfoComplete[i]);
                          //break;
                        }
                      }
                  }else{
                      //user chose city and industry 
                      for(var i = 0; i < orgInfoComplete.length; i++){
                        if(this.state.selectedCit == orgInfoComplete[i].address.city){
                          citArray.push(i);
                        }
                      };
                      for(var i = 0; i < orgInfoComplete.length; i++){
                        if(this.state.selectedInd == orgInfoComplete[i].industry){
                          indArray.push(i);
                        }
                      };
                      if(citArray.length >= 1 && indArray.length >= 1){
                          var resultArray = citArray.filter(val => indArray.includes(val));  
                          for(var i = 0; i < resultArray.length; i++){
                            orgInfoArray.push(resultArray[i]);
                          };
                          console.log("nameArray2", resultArray);
                          //break;
                      }

                  }     
               }   
           }  
      }
      */
      if(this.state.selectedNam.trim() != ''){
        // if user search organisation name, don't consider the location&industry, give him a specific result 
          for(var i = 0; i < orgInfoComplete.length; i++){
            if(this.state.selectedNam == orgInfoComplete[i].name){
              orgInfoArray.push(orgInfoComplete[i]);
              //break;
            }else if(this.state.selectedNam == orgInfoComplete[i].industry){
              orgInfoArray.push(orgInfoComplete[i]);
            }
          };
          //console.log("nameArray1", orgInfoArray);
      }else{
          //search region
          if(this.state.selectedReg != ''){
              for(var i = 0; i < orgInfoComplete.length; i++){
                  if(this.state.selectedReg == orgInfoComplete[i].address.region){
                      regArray.push(i);
                  }
              };
              this.setState({selectedCount: this.state.selectedCount + 1});
          }else{
              for(var i = 0; i < orgInfoComplete.length; i++){
                  regArray.push(i);     
              };
          };
          //search city
          if(this.state.selectedCit != ''){
              for(var i = 0; i < orgInfoComplete.length; i++){
                if(this.state.selectedCit == orgInfoComplete[i].address.city){
                  citArray.push(i);
                }
              };
              this.setState({selectedCount: this.state.selectedCount + 1});
          }else{
              for(var i = 0; i < orgInfoComplete.length; i++){
                  citArray.push(i);     
              }
          };
          //search industry
          if(this.state.selectedInd.trim() != ''){
              for(var i = 0; i < orgInfoComplete.length; i++){
                  if(this.state.selectedInd.trim() == orgInfoComplete[i].industry.trim()){
                    indArray.push(i);
                  }
              };
              /*
              if(indArray.length == 0){
                  for(var j = 0; j < GLOBAL.SUBINDUSTRY.length; j++){
                    if(this.state.selectedInd.trim() == GLOBAL.SUBINDUSTRY[j][1]){
                      for(var k = 0; k < orgInfoComplete.length; k++){
                          if(GLOBAL.SUBINDUSTRY[j][0] == orgInfoComplete[k].industry){
                            indArray.push(k);
                          }
                      }
                    };
                  }
              }
              */
              this.setState({selectedCount: this.state.selectedCount + 1});
          }else{
              for(var i = 0; i < orgInfoComplete.length; i++){
                  indArray.push(i);     
              }
          };

          //console.log("selectedReg array",regArray);
          //console.log("selectedcit array",citArray);
          //console.log("selectedInd array",indArray);

          var resultA = citArray.filter(val => regArray.includes(val)); 
          var resultB = resultA.filter(val => indArray.includes(val));

          //console.log("selectedcit resultA",resultA);
          //console.log("selectedInd resultB",resultB);

          for(var i = 0; i < resultB.length; i++){
            orgInfoArray.push(orgInfoComplete[resultB[i]]);
          };
      } 

      if(orgInfoArray.length >= 1){
        this.setState({
                       viewLoadedOrg:true,
                       orgInfo: orgInfoArray,
                       selectedNam: '',
                       selectedReg: '',
                       selectedCit: '',
                       selectedInd: '',
                       region:{latitude:orgInfoArray[0].latitude, longitude:orgInfoArray[0].longitude, 
                               latitudeDelta: 0.0922, longitudeDelta: 0.0421}
                     });

      }else{
        Alert.alert("Sorry, we couldn't find anything...");
        this.setState({
              selectedNam: '',
              selectedReg: '',
              selectedCit: '',
              selectedInd: '',
              viewLoadedOrg:true
            });
      }
      //console.log("search result:", orgInfoArray);
          //console.log("this.state.orgInfo 1", this.state.orgInfo);
      //const selected = this.state.selected.map((val, index) => <Item key={index} label={val} value={val} />); 
  };

  showMap = () => {
    if(this.state.region.latitude == null || this.state.region.longitude == null){
      Alert.alert("Please turn on your GPS or Location information!");
        this.setState({
            viewLoadedMap:true,
            region:{latitude: -45.8669784,longitude: 170.517358,
                  latitudeDelta: 0.0922, longitudeDelta: 0.0421}
        });
    }else{
        this.setState({viewLoadedMap:true});
    }

    //console.log("viewLoadedMap true", this.state.viewLoadedMap);
  };

  hideMap = () => {
    this.setState({viewLoadedMap:false});
    //console.log("viewLoadedMap false", this.state.viewLoadedMap);
  };

/*
  findFilm(selectedNam) {
    if (selectedNam === '') {
      return [];
    };

    const { orgNames } = this.state;
    const regex = new RegExp(`${selectedNam.trim()}`, 'i');
    //return orgNames.filter(film => (film.name.search(regex) || film.industry.search(regex)) >= 0);
    const relativeNam = orgNames.filter(value => value.name.search(regex) >= 0);
    const relativeInd = orgNames.filter(value => value.industry.search(regex) >= 0);
    return relativeNamInd = relativeInd.concat(relativeNam);
  };
*/

  render() {

    const { props: { name, index, list } } = this;
    const orgInfoData = this.state.orgInfo; 
    const currentReg = this.state.selectedReg;
    const itemsReg = GLOBAL.REGIONS.region.map((val, index) => <Item key={index} label={val} value={val} color='black' />);
    var itemsCit = '';
    if(currentReg == ''){
        itemsCit = GLOBAL.REGIONS.cities.Regions.map((val, index) => <Item key={index} label={val} value={val} color='black' />);
    }else{
        itemsCit = GLOBAL.REGIONS.cities[currentReg].map((val, index) => <Item key={index} label={val} value={val} color='black' />);
    };

    const itemsInd = GLOBAL.INDUSTRY.map((val) => <Item key={val} label={val} value={val} color='black' />);

    const orgMapData = [];
    for(var i = 0; i < this.state.orgInfo.length; i++){

      var marker = '';
      if(this.state.orgInfo[i].authstatus == 'champ'){
        marker = champ;
      }else if(this.state.orgInfo[i].authstatus == 'valid'){
        marker = valid;
      }else{
        marker = self;
      }

      orgMapData.push({
        latitude:this.state.orgInfo[i].latitude,
        longitude:this.state.orgInfo[i].longitude,
        title:this.state.orgInfo[i].name,
        image:marker
      });
    };

    //const { selectedNam } = this.state;
    //const orgNames = this.findFilm(selectedNam);
    //const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
     
      <Container style={styles.container}>
        <StatusBar
          backgroundColor="#303030"
          barStyle="default"
          hidden ={false}
        />
        
        <NewHeader />
        <Content padder>

        <Text style={styles.title}>Geia Leaderboard</Text>   
        <Header searchBar rounded style={{backgroundColor: '#5cb85c'}}>
              
             <Item>     
                 <Icon name="search" />
                 <TextInput 
                        placeholder="Search organisations ..." 
                        placeholderTextColor='black'
                        onChangeText={this.onNamChange}
                        value={this.state.selectedNam}
                        style={styles.searchBoxName}
                        underlineColorAndroid='transparent'
                 />
                 <Icon name="people" />
             </Item>

         {/*  
              <Item style={{zIndex:3, position:'relative', height: 'auto'}}>    
        <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            //textColor='black'
            style={{color:'black'}}
            //listContainerStyle={{flex:1}}
            containerStyle={styles.autocompleteContainer}
            inputContainerStyle={styles.autocompleteInputContainer}
            data={orgNames.length === 1 && (comp(selectedNam, orgNames[0].name) || comp(selectedNam, orgNames[0].industry)) ? [] : orgNames}
            defaultValue={selectedNam}
            onChangeText={text => this.setState({ selectedNam: text })}
            placeholder="   Search Organisation Name"
            placeholderTextColor='black'
            underlineColorAndroid='transparent'
            renderItem={({ name, industry }) => (
              <TouchableOpacity onPress={() => this.setState({ selectedNam: name })}>
                <Text style={styles.itemText}>
                  {name} - ({industry})
                </Text>
              </TouchableOpacity>
            )}
        /> 
        */}
           </Header>

           <Header searchBar rounded style={{backgroundColor: '#5cb85c', zIndex:2}}>
             <Item>
                <Picker
                    style={styles.searchBoxLocation}
                    placeholder="Region"
                    supportedOrientations={['portrait','landscape']}
                    mode="dialog"
                    selectedValue={this.state.selectedReg}
                    onValueChange={this.onRegChange}>
                    {itemsReg}
                </Picker> 
             </Item>
             <Item>
                <Picker
                    style={styles.searchBoxLocation}
                    placeholder="City"
                    supportedOrientations={['portrait','landscape']}
                    mode="dialog"
                    selectedValue={this.state.selectedCit}
                    onValueChange={this.onCitChange}>
                    {itemsCit}
                </Picker> 
             </Item>
           </Header>

           <Header searchBar rounded style={{backgroundColor: '#5cb85c', zIndex:2}}>
           <Item >     
            <Picker
                style={styles.searchBoxIndustry}
                placeholder="Search Industry"
                supportedOrientations={['portrait','landscape']}
                mode="dialog"
                selectedValue={this.state.selectedInd}
                onValueChange={this.onIndChange}>
                {itemsInd}
            </Picker>
           </Item>
           </Header>

           {/*
           <Header searchBar rounded style={{backgroundColor: '#5cb85c', zIndex:2}}>
           <Item >
            <Icon name="search" />     
            <TextInput
              style={styles.searchBoxIndustryNew}
              placeholder='Search Industry'
              onChangeText={this.onIndChange}
              value={this.state.selectedInd}
              placeholderTextColor='black'
              underlineColorAndroid='transparent'
            /> 
           </Item>
           </Header>
           

           <Text></Text>
           <Button block success onPress={this.searchFunc} >
               <Text>Search</Text>
           </Button>
           */}
           
           <Text></Text>
           {!this.state.viewLoadedMap ?  
              <Button block success onPress={this.showMap} >
                  <Text>Show organisations map{this.state.viewLoadedMap}</Text>
              </Button>
              :
              <Button block success onPress={this.hideMap} >
                  <Text>Hide organisations map</Text>
              </Button>
           }


        {!this.state.viewLoadedMap ? null : 
        <View>

            {/* the slider bar */}
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>    
              <Slider
                value={this.state.circleRadius}
                onValueChange={(circleRadius) => this.setState({circleRadius})} 
                maximumValue={10000}
                minimumValue={1000}
                thumbTintColor={'#5cb85c'}
                minimumTrackTintColor={'#5cb85c'}
                step={1000}
                />
              <Text style={{flex: 1, textAlign: 'center'}}>Find organisations around you: {this.state.circleRadius / 1000} kilometers</Text>
            </View>

            {/* the map view */}
            <View style={styles.mapView}>
            <MapView
                style={styles.mapContent}
                region={this.state.region}
                onRegionChange={this.onMapRegionChange}
            >
            <MapView.Circle
                center={{latitude: this.state.initialLatitude, longitude: this.state.initialLongitude}}
                radius={this.state.circleRadius}
                fillColor="rgba(20, 140, 255, 0.2)"
                strokeColor="rgba(136, 180, 252, 0.2)" 
            />
              <MapView.Marker
                key={'Your Location'}
                coordinate={{latitude:this.state.initialLatitude, longitude:this.state.initialLongitude}}
                title={'Your Location'}
              />
              {orgMapData.map(marker => (
                    <MapView.Marker
                      key={marker.title}
                      coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                      title={marker.title}
                      //description={marker.description}
                      image={marker.image}
                    />
                  ))}
            </MapView>
            </View>
            
        </View>
        }
       
        {!this.state.viewLoadedOrg ? <Spinner /> : 
        <View>
        <FlatList   
            //data={orgInfoData}  
            data={this.state.orgInfo}
            extraData={this.state.selected}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            refreshing={true}
            initialNumToRender={4}
            refreshing={true}
        />
        </View>
        }

        </Content>
        <NewFooter />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(LeaderBoard);
