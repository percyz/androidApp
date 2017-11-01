import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Footer, FooterTab, Title, Content, Text, Button,
         Icon, Left, Right, Body, Item, Card, CardItem, Input, Thumbnail, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import styles from './styles';

const logo = require('../../../images/newlogo.png');
const banner = require('../../../images/map.jpg');

class OrgProfile extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor() {
      super();
      this.state = {
          viewLoaded: false,
          orgName: '',
          description: '',
          sustainable: '',
          phone: '',
          email: '',
          logo: '',
          city: '',
          industry: '',
          region: {
            latitude: null,//-45.8669784,
            longitude: null,//170.51735800000006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
      };
  }

    componentWillMount() {
      const { params } = this.props.navigation.state;
      console.log("Profile",params.id)
    if(params.id != ''){
      console.log("props get id value", params.id);

    //POST
      const i = encodeURIComponent(params.id);
      const requestBodyPoint = `id=${i}`;
      console.log("requestBodyPoint info: ", requestBodyPoint);
      return fetch("https://geia-app.herokuapp.com/orgs/profile", {
              method: "POST",
              mode: "cors",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/x-www-form-urlencoded"
                  //"Content-Type": "application/json"
              },

              body: requestBodyPoint
      }).then((res) => {
              console.log("fetch request ", JSON.stringify(res.ok));
              if(res.ok){
                  res.json().then((json) => {
                      console.info(json);
                      this.setState({
                            orgName: json.name,
                            city: json.address.city,
                            industry: json.industry,
                            description: json.description,
                            sustainable: json.sustainable,
                            phone: json.phone1,
                            email: json.email,
                            logo: json.logo,
                            region:{latitude: json.latitude, longitude: json.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421},
                            viewLoaded: true
                      });
                  });
                  //console.info("waiting props name1",this.state.orgName);
              }else{
          Alert.alert("server is busying, try again later");
        }
      })
      .catch(function(err) {
        Alert.alert("get fail", err);
        //console.info("waiting props name2",this.state.userName);
      })
  }else{
    console.info("waiting props id",this.state.orgName);
  }
};

  onMapRegionChange = (region) => {
    this.setState({ region });
  }

  render() {
    const { props: { name, index, list } } = this;
    console.log("get the data: ", this.state.orgName, this.state.city, this.state.viewLoaded);

    return (
      <Container style={styles.container}>

        <Content padder>
          {/*
          <Text style={styles.title}>Organisation id: {params.id}</Text>
          <Image source={logo} style={{height:50, width:50}} />

                    <Card style={{flex: 1}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:this.state.logo}} style={{height:50, width:50}}/>
                    <Body>
                      <Text>{this.state.orgName}</Text>
                      <Text note>{this.state.city} / {this.state.industry}</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem>
                  <Body>
                    <Text>
                     {this.state.description}
                    </Text>
                    <Text> </Text>
                    <Text>
                      {this.state.sustainable}
                    </Text>
                  </Body>
                </CardItem>

                <CardItem>
                  <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                      <Icon name="mail" />
                      <Text> {this.state.email} / {this.state.phone}</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>

          */}
          {!this.state.viewLoaded ? <Spinner /> :
          <View>
              <View style={styles.contentHeader}>
                  <Thumbnail source={{uri:this.state.logo}} style={{height:80, width:80}}/>
                  <View style={styles.contentHeaderRight}>
                      <Text style={{fontSize: 22, fontWeight: 'bold'}}>{this.state.orgName}</Text>
                      <Text note>{this.state.city} / {this.state.industry}</Text>
                  </View>
              </View>

              <View>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="mail" />
                  <Text> {this.state.email} / {this.state.phone}</Text>
                </Button>
              </View>

              <View style={styles.contentBody}>
                <Text></Text>
                <Text style={{textAlign: 'auto'}}>{this.state.description}</Text>
                <Text></Text>
                <Text style={{textAlign: 'auto'}}>{this.state.sustainable}</Text>
                <Text></Text>
              </View>

              <View style={styles.mapView}>
                <MapView
                  style={styles.mapContent}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}
                >
                    <MapView.Marker
                      coordinate={this.state.region}
                      title={this.state.orgName}
                      //description={marker.description}
                    />
                </MapView>
              </View>
          </View>
          }
        </Content>
        <NewFooter
          navigate={this.props.navigation.navigate}
          destinationLeaderboard="LeaderBoard"
          destinationScanner="Scanner"
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

export default connect(mapStateToProps, bindAction)(OrgProfile);
