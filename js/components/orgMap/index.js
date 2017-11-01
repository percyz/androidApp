
import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Footer, FooterTab, Title, Content, Text, Button,
         Icon, Left, Right, Body, Item, Card, CardItem, Input, Picker, Spinner } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import { Slider }  from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';

GLOBAL = require('../../globals');
var orgInfoComplete = [];
var BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel',
];
const champ = require('../../../images/champMarker.png');
const valid = require('../../../images/validMarker.png');
const self = require('../../../images/selfMarker.png');

class OrgMap extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
      super(props);
      this.state = {
        viewLoaded: false,
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
        region: {
            latitude: null,//-45.8669784,
            longitude: null,//170.51735800000006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        initialLatitude: -45.8788,
        initialLongitude: 170.5028,
        locationError: null,
        circleRadius: 100,
        orgNames: []
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
          console.log("position.coords.latitude", position.coords.latitude);
        },
        (error) => this.setState({ locationError: error.message }),
        console.log("position.coords.latitude error", this.state.locationError),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      //GET
      fetch("https://iosgeia.herokuapp.com/orgs", {
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
                   console.log("orgInfo",this.state.orgInfo.length);
                   if(this.state.orgInfo.length > 2){
                       this.setState({
                         viewLoaded:true,
                         orgNames:json
                        });
                   };
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

  onRegChange = (value) => {
    this.setState({
      selectedReg : value
    });
  }

  onCitChange = (value) => {
    this.setState({
      selectedCit : value
    });
  }

  onIndChange = (value) => {
    this.setState({
      selectedInd : value
    });
  }

  onMapRegionChange = (region) => {
    this.setState({ region });
  }

  onRadChange = (value) => {
    value = Number(value);
    this.setState({
      circleRadius : value
    });
  }

  searchFunc = () => {
      var orgInfoArray = [];
      var namArray = [];
      var regArray = [];
      var citArray = [];
      var indArray = [];
      console.log("selectedReg",this.state.selectedReg);
      console.log("selectedcit",this.state.selectedCit);
      console.log("selectedInd",this.state.selectedInd);

      if(this.state.selectedNam.trim() != ''){
        // if user search organisation name, don't consider the location&industry, give him a specific result
          for(var i = 0; i < orgInfoComplete.length; i++){
             if(this.state.selectedNam == orgInfoComplete[i].name){
              orgInfoArray.push(orgInfoComplete[i]);
              //break;
            }
          }
          console.log("nameArray1", orgInfoArray);
      }else{

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

          if(this.state.selectedInd != ''){
              for(var i = 0; i < orgInfoComplete.length; i++){
                  if(this.state.selectedInd == orgInfoComplete[i].industry){
                    indArray.push(i);
                  }
              };
              this.setState({selectedCount: this.state.selectedCount + 1});
          }else{
              for(var i = 0; i < orgInfoComplete.length; i++){
                  indArray.push(i);
              }
          };

          console.log("selectedReg array",regArray);
          console.log("selectedcit array",citArray);
          console.log("selectedInd array",indArray);

          var resultA = citArray.filter(val => regArray.includes(val));
          var resultB = resultA.filter(val => indArray.includes(val));

          console.log("selectedcit resultA",resultA);
          console.log("selectedInd resultB",resultB);

          for(var i = 0; i < resultB.length; i++){
            orgInfoArray.push(orgInfoComplete[resultB[i]]);
          };
      }

      if(orgInfoArray.length >= 1){
        this.setState({orgInfo: orgInfoArray,
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
            });
      }
      console.log("search result:", orgInfoArray);
      //const selected = this.state.selected.map((val, index) => <Item key={index} label={val} value={val} />);
    }

  findFilm(selectedNam) {
      if (selectedNam === '') {
        return [];
      }

      const { orgNames } = this.state;
      const regex = new RegExp(`${selectedNam.trim()}`, 'i');
      return orgNames.filter(film => film.name.search(regex) >= 0);
  };


  render() {

    const { props: { name, index, list } } = this;
    const currentReg = this.state.selectedReg;
    const itemsReg = GLOBAL.REGIONS.region.map((val, index) => <Item key={index} label={val} value={val} color='black' />);
    var itemsCit = '';
    if(currentReg == ''){
        itemsCit = GLOBAL.REGIONS.cities.Regions.map((val, index) => <Item key={index} label={val} value={val} color='black' />);
    }else{
        itemsCit = GLOBAL.REGIONS.cities[currentReg].map((val, index) => <Item key={index} label={val} value={val} color='black' />);
    }
    const itemsInd = GLOBAL.INDUSTRY.map((val) => <Item key={val} label={val} value={val} color='black' />);
    const itemsRad = GLOBAL.RADIUS.map((val) => <Item key={val} label={val+' meters'} value={val} />);

    const orgInfoData = [];
    for(var i = 0; i < this.state.orgInfo.length; i++){

      var marker = '';
      if(this.state.orgInfo[i].authstatus == 'champ'){
        marker = champ;
      }else if(this.state.orgInfo[i].authstatus == 'valid'){
        marker = valid;
      }else{
        marker = self;
      }

      orgInfoData.push({
        latitude:this.state.orgInfo[i].latitude,
        longitude:this.state.orgInfo[i].longitude,
        title:this.state.orgInfo[i].name,
        image:marker
      });
    };

    const { selectedNam } = this.state;
    const orgNames = this.findFilm(selectedNam);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    console.log("orgInfoData", orgInfoData);

    return (
      <Container style={styles.container}>

        <NewHeader />
        <Content padder>
          <Text style={styles.title}>Organisation Maps</Text>
          <Header searchBar rounded style={{backgroundColor: '#5cb85c', height: 'auto'}}>
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                style={{color:'black'}}
                //listContainerStyle={{flex:1}}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.autocompleteInputContainer}
                data={orgNames.length === 1 && comp(selectedNam, orgNames[0].name) ? [] : orgNames}
                defaultValue={selectedNam}
                onChangeText={text => this.setState({ selectedNam: text })}
                placeholder="   Search Organisation Name"
                placeholderTextColor='black'
                underlineColorAndroid='transparent'
                renderItem={({ name }) => (
                  <TouchableOpacity onPress={() => this.setState({ selectedNam: name })}>
                    <Text style={styles.itemText}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                )}
            />
           </Header>
           <Header searchBar rounded style={{backgroundColor: '#5cb85c'}}>
             <Item>
                <Icon name="search" />
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
                <Icon name="search" />
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
           <Header searchBar rounded style={{backgroundColor: '#5cb85c'}}>
           <Item >
            <Icon name="search" />
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

           <Text></Text>
           <Button block success onPress={this.searchFunc} >
               <Text>Search</Text>
           </Button>
           <Text></Text>
{/*
           <Header searchBar rounded style={{backgroundColor: '#5cb85c'}}>

           <Item >
            <Icon name="search" />
            <Picker
                style={styles.searchBoxIndustry}
                placeholder="Search Organisations around you"
                supportedOrientations={['portrait','landscape']}
                mode="dialog"
                selectedValue={this.state.circleRadius}
                onValueChange={this.onRadChange}
                >
                <Item key='0' label='Search organisations around you' value='100' />
                {itemsRad}
            </Picker>
           </Item>
           </Header>
*/}

        <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
          {/**/}
          <Slider
            //style={{width:200}}
            value={this.state.circleRadius}
            onValueChange={(circleRadius) => this.setState({circleRadius})}
            maximumValue={10000}
            thumbTintColor={'#5cb85c'}
            minimumTrackTintColor={'#5cb85c'}
            step={10}
            />
          <Text style={{flex: 1, textAlign: 'center'}}>Find organisations around you: {this.state.circleRadius} meters</Text>

        </View>

        {!this.state.viewLoaded ? <Spinner /> :
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
          {orgInfoData.map(marker => (
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
        }
      <Text> </Text>
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

export default connect(mapStateToProps, bindAction)(OrgMap);
