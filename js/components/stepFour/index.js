
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner } from 'native-base';
//import { Actions } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
//import { Base64 } from "js-base64";
//import FBSDK, { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { setUser } from '../../actions/user';
import styles from './styles';

const FBSDK = require('react-native-fbsdk');
const { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

var phoneWidth = 1 / PixelRatio.get();

const background = require('../../../images/Home-Screen-Icon.png');

class StepFour extends Component {

  constructor(props) {
   super(props);
   this.state = {
     fbobj: '',
     isAuthentic: true,
     loginProgress: false,
     //loginToken: '',
   };
 }
/*
  _fbAuth() {
    console.log('_fbAuth is working');
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if(result.isCancelled) {
        alert('Login wwas cancelled');
        console.log('Login wwas cancelled');
      }else{
        alert('Login was a success' + result.grantedPermissions.toString());
        console.log('Login wwas success');
      }
    },
    function(error){
        alert('Login fail with error: ' + error);
        console.log('Login wwas error');
    })
  }
*/

  async saveItem(user) {
    console.log("Save Item called, emailId is: ", user.emailId.toString(),"name is:", user.fullname,"fbCollection", user.fbCollection);
    //var loginToken = Base64.encode(this.state.email);
    try {
      await AsyncStorage.multiSet([['initialEmail', user.emailId.toString()],['initialToken', user.fbCollection],['initialUser', user.fullname]]);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    };
  }

  sendAjax = () => {
      //this.setState({isAuthentic:false});
      this.setState({loginProgress:true});
      console.log('obj is :',this.state.fbobj)
      var obj = this.state.fbobj;
      AsyncStorage.setItem('initialFbEmail', obj.email);
      email = obj.email;
      //email = 'percy.z@outlook.com';
      //about = obj.about;
      //birthday = obj.birthday;
      ageMin = obj.age_range.min;
      ageMax = obj.age_range.max;
      first_name = obj.first_name;
      gender = obj.gender;
      //hometown = obj.hometown.name;
      //fbId = obj.id;
      fbId = obj.token_for_business;
      last_name = obj.last_name;
      locale = obj.locale;
      fbFullName = obj.name.trim();
      picture = obj.picture.data.url;
      timezone = obj.timezone;
      profileLink = obj.link;
      console.log('email is :', email);
      const t = encodeURIComponent('ANDROID');
      const requestBody = `email=${email}&ageMin=${ageMin}&ageMax=${ageMax}&first_name=${first_name}&gender=${gender}&fbId=${fbId}&last_name=${last_name}&locale=${locale}&fbFullName=${fbFullName}&picture=${picture}&timezone=${timezone}&appType=${t}&profileLink=${profileLink}`;
      console.log("stepFour requestBody info: ", requestBody);
      //POST
      fetch("https://geiaiostest.herokuapp.com/fblogin", {
          method: "POST",
          mode: "cors",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
              //"Content-Type": "application/json"
          },
          /*
          body: JSON.stringify({
            username: "percy",
            userpassword: "12345678"
          })
          */
          body: requestBody
      }).then((res) => {
          //return ;
          console.log("fetch request ", JSON.stringify(res.ok));
          if(res.ok){
              res.json().then((json) => {
                  console.info(json);
                  console.info(json.verifystate);
                  if(json.verifystate == 1){
                      //Alert.alert("Login success");
                      this.props.navigation.navigate('Scanner');
                      //this.props.navigation.navigate('UserPoints');
                      this.saveItem(json.user);
                  }else if(json.verifystate == 2){
                     Alert.alert("invalid email address, please try again");
                     this.setState({loginProgress:false});
                  }
                  else{
                     Alert.alert("invalid password, please try again");
                     this.setState({loginProgress:false});
                  }
              });
          }else{
              Alert.alert('Noted','Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
              //next();
              this.setState({loginProgress:false});
          }
      })
      .then((res) => {
        //Alert.alert("then working");
      })
      .catch(function (e) {
          console.log("fetch fail");
          Alert.alert('Noted','Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
      });
   }

  static navigationOptions = {
    header: null
  };

  componentDidMount(){
     AsyncStorage.multiGet(['initialEmail','initialToken']).then((asyncStore) => {
       console.log('stepfour asyncstore: ', asyncStore);
     })
  }

  render() {
    return (
      <Container>
           <Content style={styles.container}>
           <View style={styles.title}>
             <Image source={background} style={styles.shadow} />
            </View>

            <View style={styles.bg}>
              <Text style={styles.paragraphTitle}>
                  Geia Rewards
              </Text>
            </View>

            <View style={styles.bg}>
              <Text style={styles.paragraph}>
                  Sign in or register to
              </Text>
              <Text style={styles.paragraphLine2}>
                  get started
              </Text>
            </View>


            <View style={styles.btnView}>
              
              <View style={{alignItems:'center'}}>
              <LoginButton
                //style={styles.btnFb}
                //publishPermissions={["publish_actions"]}
                //readPermissions={["email","public_profile"]}
                readPermissions={["email","public_profile"]}
                onLoginFinished={
                  (error, result) => {
                    console.log("onLoginFinished: ", result);
                    if (error) {
                      console.log("login has error: ", result.error);
                    } else if (result.isCancelled) {
                      console.log("login is cancelled.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          let accessToken = data.accessToken
                          console.log("accessToken.toString(): ", accessToken.toString())

                          const responseInfoCallback = (error, result) => {
                            if (error) {
                              console.log(error)
                              //alert('Error fetching data: ' + error.toString());
                            } else {
                              console.log("responseInfoCallback:", result)
                              this.state.fbobj = result;
                              this.sendAjax();
                              //alert('Success fetching data: ' + result.toString());
                            }
                          }

                          const infoRequest = new GraphRequest(
                            '/me',
                            {
                              accessToken: accessToken,
                              parameters: {
                                fields: {
                                  string: 'email,name,first_name,link,last_name,gender,cover,age_range,picture,timezone,locale,token_for_business'
                                }
                              }
                            },
                            responseInfoCallback
                          );

                          // Start the graph request.
                          new GraphRequestManager().addRequest(infoRequest).start()

                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => console.log("logout.")}
              />
              </View>
             
{/*
              <Button style={styles.btnFb} onPress={this._fbAuth}>
                <Text style={styles.btnChild}>Facebook Login</Text>
              </Button>
*/}
              {this.state.loginProgress? <Spinner color='white' /> :
              <View>
                <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('ProperLogin')}>
                  <Text style={styles.btnChild}>Sign In</Text>
                </Button>
{/*
                <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.btnChild}>Register</Text>
                </Button>
*/}
              </View>
              }
            </View>
{/*
            <View style={{alignItems:'center'}}>
              <LoginButton
                //style={styles.btn}     
                //publishPermissions={["publish_actions"]}
                //readPermissions={["email","public_profile","user_about_me","user_birthday","user_location","user_hometown"]}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert("login has error: " + result.error);
                    } else if (result.isCancelled) {
                      alert("login is cancelled.");
                    } else {
                      AccessToken.getCurrentAccessToken().then(
                        (data) => {
                          alert(data.accessToken.toString())
                        }
                      )
                    }
                  }
                }
                onLogoutFinished={() => alert("logout.")}/>
            </View> 
*/}
           </Content>
       </Container>
    );
  }
}

export default StepFour;
