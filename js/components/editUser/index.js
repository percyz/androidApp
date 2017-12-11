
import React, { Component } from 'react';
import { Image, Dimensions, Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button, Left, Right,
  Body, Input, InputGroup, Item, ListItem, CheckBox, Spinner, View, Icon } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import sha256 from 'crypto-js/sha256';
import { openDrawer } from '../../actions/drawer';
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import NewFooter from '../newFooter';
import styles from './styles';

const FBSDK = require('react-native-fbsdk');
const { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;
const scanIcon = require('../../../images/Scanner_Grey.png')

class Profile extends Component {

  /*static propTypes = {
    name: React.PropTypes.string, 
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }*/

  static navigationOptions = {
    header: null
  }

    constructor(props){
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        oldemail: '',
        isAuthentic: true,
        editUserView: true
      };
    };

  logoutConfirm() {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text:'Cancel', onPress:() => console.log("logout cancel")},
        {text:'Logout', onPress:() => this.userLogout()}
      ])
  };

  async userLogout() {
    console.log('logout AsyncStorage error: ');
    try {
      let keys = ['initialEmail','initialPoints','initialUser', 'initialToken']
      await AsyncStorage.multiRemove(keys);
      AsyncStorage.multiGet(['initialEmail','initialPoints','initialUser']).then((asyncStore) => {
        console.log("editUser asyncStore: ", asyncStore);

      })
      //this.props.closeDrawer();
      //Actions.login({ type: ActionConst.RESET });
      //Alert.alert('Logout Success!');
      this.props.navigation.navigate("Login");
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    };
  };

  componentWillMount() {
    AsyncStorage.multiGet(['initialEmail', 'initialToken']).then((asyncStore) => {
      console.log("login asyncStore: ", asyncStore);
      if (asyncStore[0][1] !== null && asyncStore[1][1] == 'false'){
            this.setState({
              oldemail: asyncStore[0][1],
              editUserView : asyncStore[1][1]
            });
            console.log("editUser asyncStorage: ",asyncStore)

    /*if(this.props.name == ''){
      this.props.name = this.state.email
    }*/
      if(this.state.oldemail != ''){
        console.log("props get value", this.state.oldemail);

        const newEmail = this.state.oldemail
      //POST
        const u = encodeURIComponent(this.state.oldemail);
        const requestBodyPoint = `email=${u}`;
        console.log("requestBodyPoint info: ", requestBodyPoint);
        return fetch("https://geiaiostest.herokuapp.com/users/info", {
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
                        nameArray = json.profile.name.split(" ");
                        console.log("json: ", json.profile);
                        this.setState({
                              firstname: nameArray[0],
                              lastname: nameArray[1],
                              email: newEmail,
                              phone: json.profile.phone,
                              //isAuthentic: false 
                        });
                    });
                    console.log("waiting props name1",this.state.email);      
                }else{
            Alert.alert("server is busying, try again later");
          }
        }).then((res) => {
          console.log("this.state.isAuthentic1: ", this.state.isAuthentic);
          this.setState({isAuthentic: false});
          console.log("this.state.isAuthentic2: ", this.state.isAuthentic);
        }).catch(function(err) {
          Alert.alert("get fail", err);
          //console.info("waiting props name2",this.state.userName);
        })
    }else{
      //console.info("waiting props name",this.state.userEmail);
    }
  }else if(asyncStore[1][1] == 'true'){
    this.setState({editUserView : asyncStore[1][1]});
  }else{
     Alert.alert("server is busying, try again later");
  }
  })
};

    sendAjax = () => {

      if(this.state.email != ''){
        this.setState({isAuthentic:true});
        console.log("props get value", this.state.email);
        const olde = encodeURIComponent(this.state.oldemail).toLowerCase();
        const fn = encodeURIComponent(this.state.firstname);
        const ln = encodeURIComponent(this.state.lastname);
        const e = encodeURIComponent(this.state.email).toLowerCase();
        const h = encodeURIComponent(this.state.phone);
        const requestBody = `oldemail=${olde}&firstname=${fn}&lastname=${ln}&email=${e}&phone=${h}`;

        //POST
        fetch("https://geiaiostest.herokuapp.com/users/edit", {
            method: "POST",
            mode: "cors",
            headers: {
                //"Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
                //"Content-Type": "application/json"
            },
            body: requestBody
        }).then((res) => {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then( (json) => {
                    console.info(json);
                    console.info(json.editstate);
                    if(json.editstate){
                        this.setState({isAuthentic:false});
                        Alert.alert("Edit successfully!");

                        //this.props.navigation.navigate("Home")
                    }else{
                        Alert.alert("Edit fail, please try again");
                        this.setState({isAuthentic:false});
                    }
                });
            }else{
                this.setState({isAuthentic:false});
                Alert.alert('Noted','request failed',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
            }
        })
        .then((res) => {
          this.setState({isAuthentic:false});
          //Alert.alert("then working");
        })
        .catch( (e) => {
            this.setState({isAuthentic:false});
            console.log("fetch fail");
            Alert.alert('Noted','system error',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
    }else{
      Alter.alert("Load...");
    }
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
      <Header style={styles.header}>
        <Left style={{flex:1}}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" />
        </Button>
        </Left>

        <Body style={styles.headerBody}>
            <Icon style={{color: 'white', marginRight: 'auto', marginLeft: 'auto', fontSize:30}} name="md-settings" />
        </Body>

        <Right style={{flex:1}}>
        {/*
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
          */}
        </Right>
      </Header>

      {/*this.state.isAuthentic ? <Spinner color='#88C040' /> : */}

        <Content>
          {this.state.editUserView == 'true'? 
          <View>
              <Button  block style={{backgroundColor:'white', marginTop:5}}
              onPress={() => this.props.navigation.navigate('Terms')}
              >
                  <View style={styles.reg}>
                  <Text style={{color: 'grey'}}>Terms and Conditions</Text>
                  </View>
              </Button>
              <Text />
{/* */}
              <View style={{alignItems:'center'}}>
              <LoginButton
                readPermissions={["email","public_profile"]}
                onLogoutFinished={() => this.userLogout()}
              />
              </View>

            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
              <Image source={scanIcon} style={styles.newScan} />
            </TouchableOpacity>
          </View>
           :
           <View>
           <View style={styles.gray}>
           <Text styly={{paddingLeft:5}}>My Details</Text>
           </View>
  
           <Item style={{paddingTop:2}}>         
             <Input placeholder='First Name'
                    style={{backgroundColor:'white'}}
                    value={this.state.firstname}
                    autoFocus={true}
                    maxLength={20}
                    onChangeText={(firstname) => this.setState({firstname})}
              />          
           </Item>

           <Item style={{paddingTop:2}}>
             <Input placeholder='Last Name'
                    style={{backgroundColor:'white'}}
                    value={this.state.lastname}
                    maxLength={20}
                    onChangeText={(lastname) => this.setState({lastname})}
              />
           </Item>

           <Item style={{paddingTop:2}}>
             <Input placeholder='Your Email'
                    style={{backgroundColor:'white'}}
                    value={this.state.email}
                    //keyboardType={'email-address'}
                    maxLength={50}
                    onChangeText={(email) => this.setState({email})}
              />
           </Item>

           <Item style={{paddingTop:2}}>
             <Input placeholder='Your Phone Number'
                    style={{backgroundColor:'white'}}
                    value={this.state.phone}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    onChangeText={(phone) => this.setState({phone})}
              />
           </Item>

            <Button style={styles.save} block
                  disabled={!this.state.firstname || !this.state.lastname || !this.state.email ||!this.state.phone}
                  onPress={this.sendAjax}
            >
                <Text>Save</Text>
            </Button>

            <View style={styles.gray}>
            <Text>Account</Text>
            </View>

            <Button  block style={{backgroundColor:'white', marginTop:5}}
            onPress={() => this.props.navigation.navigate('Terms')}
            >
                <View style={styles.reg}>
                <Text style={{color: 'grey'}}>Terms and Conditions</Text>
                </View>
            </Button>

            <Button block style={{backgroundColor:'white', marginTop:5}}
            onPress={() => this.logoutConfirm()}
            >
                <View style={styles.reg}>
                <Text style={{color: 'grey'}}>Logout</Text>
                </View>
            </Button>

            <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
              <Image source={scanIcon} style={styles.newScan} />
            </TouchableOpacity>
        </View>
        }

        </Content>
   
      {/*<NewFooter
        navigate={this.props.navigation.navigate}
        destinationLeaderboard="LeaderBoard"
        destinationScanner="Scanner"
        destinationProfile="Profile"
      />*/}
      </Container>
    );
  }
}
export default Profile
/*function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const ProfList = connect(mapStateToProps, bindAction)(Profile);
const DrawNav = DrawerNavigator(
  {
    Profile: { screen: ProfList }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;*/
