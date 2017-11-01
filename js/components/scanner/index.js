import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Image,
  AsyncStorage,
  AppState,
  Animated
} from 'react-native';
import { connect } from "react-redux";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import styles from './styles';
import { Container, Content, Spinner, Header, Left, Right, Title, Body, Button, Icon } from 'native-base';
import Camera from 'react-native-camera';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { openDrawer } from "../../actions/drawer";
import NewFooter from '../newFooter';

const background = require('../../../images/Home-Screen-Icon-small.png');
//const greenBackground = require('../../../images/Geia_Logo_Green.png');
const fbIcon = require('../../../images/Fb_White.png');
const scanIcon = require('../../../images/Scanner_White.png')
const SCANINTERVAL = 2;
var isHidden = true;

class Scanner extends Component {

  /*static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }*/
  static navigationOptions = {
    header: null
  };

  constructor(props) {
      super(props);
      this.state = {
        cameraView: false,
        showCamera: true,
        cameraType: Camera.constants.Type.back,
        user: '',
        qrcode: '',
        codeArray: [],
        currentPoints: 0,
        email: '',
        switchScreens: false,
        token: '',
        fbEmail: true,
      };
    }

    switchUser() {
      this.setState({showCamera: false, switchScreens: true})
      console.log("checkOne",this.state.showCamera);
      //this.state.showCamera = false;
      this.state.switchScreens = true
      console.log("checkTwo",this.state.showCamera);

    }

    componentWillMount() {

      //var cameraV = this.props.navigation.state.params.cameraView;
      //console.log("componentDidMount camera", this.props.navigation.state.params.cameraView);

      AsyncStorage.multiGet(['initialEmail','initialToken','initalFbEmail']).then((asyncStore) => {
        console.log("scanner asyncStore: ", asyncStore);
        if (asyncStore[0][1] !== null){
              // We have data!!
              this.setState({
                email: asyncStore[0][1],
                user: asyncStore[0][1],
                token: asyncStore[1][1],
                fbEmail: asyncStore[2][1],
              });
              console.log("iEmail and fbEmail is : ", this.state.email, this.state.fbEmail);
 
    if(this.state.email !== ''){

    //POST
      const u = encodeURIComponent(this.state.email);
      const c = encodeURIComponent(this.state.token);
      const requestBodyPoint = `user=${u}&collection=${c}`;
      console.log("scanner requestBodyPoint info: ", requestBodyPoint);
      fetch("https://geiaiostest.herokuapp.com/scanner/points", {
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
                      console.info("got sacnner data: ",json);
                      console.info(json.points);
                      if(json.points || json.points >= 0){
                        this.setState({
                            currentPoints: json.points,
                        });
                        try {
                          AsyncStorage.setItem('initialPoints', json.points);
                        } catch (error) {
                          console.error('AsyncStorage error: ' + error.message);
                        };
                      }else{
                          Alert.alert("server is busying, try again later1");
                      }
                  });
              }else{
          //Alert.alert("server is busying, try again later");
          console.log("server is busying, try again later2");
        }
      })
      .catch(function(err){
        //Alert.alert("server is busying, try again later", err);
        console.log("server is busying, try again later3", err);
      })
  }else{
    console.log("waiting props name");
  }
}
})
};

componentDidMount() {
  this.setState({showCamera: true});
  setTimeout(() => {this.setState({cameraView: true})}, 1000);
}

  componentWillUnmount(){
    console.log("@@@@@unmounted camera");
    //this.setState({showCamera: false})
    console.log("###double check",this.state.showCamera);
    //this.state.showCamera = false;
    console.log("###tripple check",this.state.showCamera);
  }

  renderCamera = () => {
    if(this.state.showCamera) {
        //setTimeout(() => this.setState({showCamera: false}), 10000);
        return (
          <Container>
          {/*<Content style={{paddingTop:30, zIndex:1}}>


           {!this.state.cameraView? <Spinner color="#88C040" /> :
           */}
            <Camera
                ref="cam"
                style={styles.container}
                onBarCodeRead={this._onBarCodeRead}
                orientation="portrait"
                type={this.state.cameraType}>
                <View>
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('UserPoints', {points: this.state.currentPoints, email: this.state.email})}>
                    <Image source={background} style={styles.shadow} />
                  </TouchableOpacity>
                </View> 
                <View style={{marginTop: 'auto', flexDirection: 'row', marginBottom:20}}>
                  <Icon onPress={()=> this.props.navigation.navigate('Profile')} style={{color: 'white', marginRight: 'auto', marginLeft: 20, fontSize:45}} name="md-settings" />
                  <Icon onPress={()=> this.props.navigation.navigate('LeaderBoard')} style={{color: 'white', marginLeft: 'auto', marginRight: 20, fontSize:45}} name="md-paper-plane"/>
                </View>
            </Camera>
           


            {/*<NewFooter
              navigate={this.props.navigation.navigate}
              destinationLeaderboard="LeaderBoard"
              destinationScanner="Scanner"
              destinationProfile="Profile"
            />*/}
            </Container>
        );
    } else if(!this.state.showCamera){

        return (
          <Container style={{backgroundColor: 'black'}}>
          <View><Spinner color="#88C040" /></View>
          </Container>
        );
    }
  };

  _onBarCodeRead = (e) => {
    //this.state.showCamera = false;
    console.log("e.data is :", e.data)
      this.state.codeArray.push(e.data);
      if(this.props.name != '' && e.data.length > 0){
        console.log("props get value");
        //this.state.showCamera = false;
        this.setState({
              //user: this.props.name,
              qrcode: e.data,
              //showCamera: false
        });
      }else {
        this.state.showCamera = true;
      }


      console.log("e.data3: ", this.state.codeArray.length);
      console.log("e.data4: ", this.state.qrcode);
      console.log("e.data5: ", this.state.user);

      // set waiting the leagth become to 15, make sure we got qrcode and user id
      //if(codeArray.length == 5 && this.state.qrcode !='' && !this.state.user !='') {
        console.log('this.state.codeArray.length: ', this.state.codeArray.length);
      //if(this.state.qrcode.length > 0) {
      if(this.state.codeArray.length == SCANINTERVAL) { 
          console.log('Barcode: ' + e.data);
          console.log('Type: ' + e.type);
          //Alert.alert("Thank you for using Geia Rewards");

          //this.textTimeout = setTimeout(()=>this.setState({firstname: text}), 100);

          this.sendAjax()
          //Actions.leaderBoard();
      }else{
        //Alert.alert("Please try again");
      }
  };

  sendAjax = () => {
        console.log("ajax")
        const u = encodeURIComponent(this.state.user);
        const q = encodeURIComponent(this.state.qrcode);
        const c = encodeURIComponent(this.state.token)
        const requestBody = `user=${u}&qr=${q}&collection=${c}`;
        console.log("requestBody info: ", requestBody);
        //POST
        fetch("https://geiaiostest.herokuapp.com/scanner", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
                //"Content-Type": "application/json"
            },
            body: requestBody
        }).then((res) => {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then((json) => {
                    console.info("json.verifystate1", json);
                    if(json.verifystate > 0){
                      newPoints = Number(this.state.currentPoints) + json.verifystate;
                      this.setState({
                          currentPoints: newPoints,
                      });
                      console.log('newPoints',newPoints)

                      try {
                        AsyncStorage.setItem('initialPoints', newPoints.toString());
                      } catch (error) {
                        //console.error('AsyncStorage error: ' + error.message);
                      };

                      //this.props.navigation.navigate('UserPoints')
                      Alert.alert('Scan Successful','+' + json.verifystate + ' Points',[{text: 'Close', onPress: () => this.props.navigation.navigate('UserPoints', {email: this.state.email})},]);
                      //Alert.alert('Scan successful! + 10 points',[{text: 'confirm', onPress: () => this.props.navigation.navigate('UserPoints', {email: this.state.email})},]);
                        /*this.setState({
                            switchScreens: true,
                        });*/
                        //this._toggleSubview();

                    }else if(json.verifystate == -1){
                        Alert.alert('Time Delay',"You need to wait " + json.cooldown + " minutes for this QR code",[{text: 'Close', onPress: () => this.props.navigation.navigate('UserPoints', {email: this.state.email})},]);
                        /*this.setState({
                          switchScreens: true
                        })*/
                    }else{
                        Alert.alert("Invalid QR Code");
                        this.setState({
                          showCamera: true
                        })
                    }
                });
            }else{
                Alert.alert('Noted','request failed',[{text: 'Close', onPress: () => console.log('OK Pressed!')},]);
                //next();
            }
        })
        .then((res) => {
            setTimeout(() => {
              this.setState({codeArray: []});
               console.log("this.state.array: ", this.state.codeArray);
            }, 5000);
        })
        .catch(function (e) {
            console.log("fetch fail");
            Alert.alert('Noted','system error',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
  }

  render() {
    /*if(this.state.switchScreens){
      this.props.navigation.navigate('UserPoints')
    }*/
    return (
      this.renderCamera()
    );
  }

};

export default Scanner;
