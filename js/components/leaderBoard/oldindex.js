import React, { Component } from 'react';
import { View, Alert, FlatList, StatusBar, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Picker,
         Left, Right, Body, Item, Input, Card, CardItem, Spinner } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import Autocomplete from 'react-native-autocomplete-input';
import NewFooter from '../newFooter';
//import NewHeader from '../newHeader';
import OrgList from '../orgList';
import styles from './styles';

GLOBAL = require('../../globals');
var orgInfoComplete = [];
var orgNamInd = [];
const backgroundImage = require('../../../images/background.png');

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
          orgNames: []
      };
  }

  _onPressItem(item){
    console.log("Pressed",item._id);
  }

  componentWillMount() {

    StatusBar.setBarStyle('light-content', true);
    {/*StatusBar.setBackgroundColor('#303030', true);*/}

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

    _renderItem =({item}) => (
        <OrgList
            key={item._id}
            //navigate={this.props.navigation.navigate}
            //destination="Profile"
            id={item._id}
            orgName={item.name}
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
      console.log("selectedReg",this.state.selectedReg);
      console.log("selectedcit",this.state.selectedCit);
      console.log("selectedInd",this.state.selectedInd);

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
    //return orgNames.filter(film => (film.name.search(regex) || film.industry.search(regex)) >= 0); 
    const relativeNam = orgNames.filter(value => value.name.search(regex) >= 0);
    const relativeInd = orgNames.filter(value => value.industry.search(regex) >= 0);
    return relativeNamInd = relativeInd.concat(relativeNam);
  };

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
    const { selectedNam } = this.state;
    const orgNames = this.findFilm(selectedNam);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Container >
        <StatusBar
          //backgroundColor="#303030"
          barStyle="default"
          hidden ={false}
        />

        {/*<NewHeader />*/}
        <Content padder>

        <Text style={styles.title}>Geia Leaderboard</Text>
        <Header searchBar rounded style={{backgroundColor: '#5cb85c', height: 'auto'}}>
             {/*
             <Item>
                 <Icon name="search" />
                 <Input placeholder="Search Organisation Name"
                        onChangeText={(text) => this.setState({selectedNam:text})}
                        value={this.state.selectedNam}
                 />
                 <Icon name="people" />
             </Item>
              <Item style={{zIndex:3, position:'relative', height: 'auto'}}>
             */}
             <Autocomplete
                 autoCapitalize="none"
                 autoCorrect={false}
                 //textColor='black'
                 //style={{color:'black'}}
                 //listContainerStyle={{flex:1}}
                 containerStyle={styles.autocompleteContainer}
                 inputContainerStyle={styles.autocompleteInputContainer}
                 data={orgNames.length === 1 && (comp(selectedNam, orgNames[0].name) || comp(selectedNam, orgNames[0].industry)) ? [] : orgNames}
                 defaultValue={selectedNam}
                 onChangeText={text => this.setState({ selectedNam: text })}
                 placeholder="   Search Organisation Name"
                 placeholderTextColor='black'
                 //underlineColorAndroid='transparent'
                 renderItem={({ name, industry }) => (
                   <TouchableOpacity onPress={() => this.setState({ selectedNam: name })}>
                     <Text style={styles.itemText}>
                       {name} - ({industry})
                     </Text>
                   </TouchableOpacity>
                 )}
             />
             </Header>

             <Header searchBar rounded style={{backgroundColor: '#5cb85c', zIndex:2}}>
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



           {/*
           <Text>{this.state.selectedNam},{this.state.selectedReg},{this.state.selectedCit},{this.state.selectedInd}</Text>
           */}
           <Text></Text>
           <Button block success onPress={this.searchFunc} >
               <Text>Search</Text>
           </Button>

        {!this.state.viewLoaded ? <Spinner /> :
        <FlatList
            data={orgInfoData}
            extraData={this.state.selected}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            refreshing={true}
            initialNumToRender={4}
            refreshing={true}
        />
        }

        </Content>
        <NewFooter
          navigate={this.props.navigation.navigate}
          destinationLeaderboard="LeaderBoard"
          //destinationScanner="Scanner"
          destinationProfile="Profile"
        />
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
