
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
//import { Base64 } from "js-base64";
import { setUser } from '../../actions/user';
import styles from './styles';

var phoneWidth = 1 / PixelRatio.get();

const background = require('../../../images/shadow.png');

class Login extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthentic: true,
      loginProgress: false,
      //loginToken: '', 
    };
  }

  componentWillMount(){
        console.log("ComponentWillMount is working");

        AsyncStorage.multiGet(['intialEmail','intialToken']).then((asyncStore) => {
          console.log("login asyncStore[0][1]: ", asyncStore[0][1]);
          if (asyncStore[0][1] !== null){
                // We have data!! 
                console.log("iEmail is : ", asyncStore);
                this.setUser(asyncStore[0][1]);
                const e = encodeURIComponent(asyncStore[0][1]);
                const t = encodeURIComponent(asyncStore[1][1]);
                const requestBody = `email=${e}&token=${t}`;
                console.log("token login info: ",requestBody);
                //POST 
                fetch("https://geia-app.herokuapp.com/users/auth/refresh", {
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
                }).then((res, next) => {
                    console.log("token fetch request ", JSON.stringify(res.ok));
                    if(res.ok){
                        res.json().then((json) => {
                            console.info(json);
                            console.info(json.verifystate);
                            if(json.verifystate){
                                //Actions.leaderBoard();
                                Actions.scanner({ type: ActionConst.RESET });
                            }
                            else{
                              //Alert.alert("invalid token, please login with email and password");
                              this.setState({isAuthentic:false});
                            }
                        });
                    }else{
                        Alert.alert('Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                        next();
                    }
                })
                .then((res) => {
                  //Alert.alert("then working"); 
                })
                .catch(function (e) {
                    console.log("fetch fail");
                    Alert.alert('Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
                });
            }
            else{
                //Alert.alert("no tokens, please login with email and password");
                this.setState({isAuthentic:false});
            }
        });
  }
 
  setUser(name) {
    console.log("setUser name: ",name);
    newName = name.toLowerCase().trim();
    this.props.setUser(newName);
    this.setState({email:newName});
  }

  async saveItem() {
    //var loginToken = Base64.encode(this.state.email);
    try {
      await AsyncStorage.multiSet([['intialEmail', this.state.email],['intialToken', this.state.email]]);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    };
    console.log("async data: ")
  }

   sendAjax = () => { 
        
        this.setState({loginProgress:true});

        const m = encodeURIComponent(this.state.email);
        const p = encodeURIComponent(this.state.password);
        const hashDigest = sha256(p); 
        console.log("new p is", hashDigest);
        const requestBody = `email=${m}&password=${hashDigest}`;
        console.log("login info: ",requestBody);
        //POST
        fetch("https://geia-app.herokuapp.com/users/auth", {
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
        }).then((res, next) => {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then((json) => {
                    console.info(json);
                    console.info(json.verifystate);
                    if(json.verifystate == 1){
                        //Alert.alert("Login success");
                        //Actions.leaderBoard();
                        Actions.scanner();
                        this.saveItem();
                        this.setState({loginProgress:false});
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
                Alert.alert('Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                next();
            }
        })
        .then((res) => {
          //Alert.alert("then working");
        })
        .catch(function (e) {
            console.log("fetch fail");
            Alert.alert('Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
  }


  render() {
    return (
     <Container>
     {this.state.isAuthentic ? <Spinner /> :
        <View style={styles.container}>
          <Content>
          <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Text style={styles.paragraph}>
                    Geia helps you make sustainability easy, clear, and profitable.
                </Text>
                <Item style={styles.input}>
                  <Icon active name="mail" />
                  <Input placeholder="EMAIL"
                         autoFocus={true} 
                         keyboardType={'email-address'}
                         maxLength={50} 
                         onChangeText={(email) => this.setUser(email)} 
                         //value={this.state.email}
                   />
                </Item>
                <Item style={styles.input}>
                  <Icon name="unlock" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry={true}
                    maxLength={30} 
                    //defaultvalue="abc"
                     onChangeText={(password) => this.setState({ password })}
                     value={this.state.password}
                  />
                </Item>
                
                <Text style={styles.forgetPw} onPress={() => Actions.forgetPw()} >Forget Password?</Text>
                {/*
                <Text>email:{this.state.email}, password:{this.state.password}</Text>
                */}
                {this.state.loginProgress? <Spinner /> :
                <Button success style={styles.btn} 
                        disabled={!this.state.email || !this.state.password}
                        onPress={this.sendAjax}
                >
                   <Text>Sign in</Text>
                </Button>
                }

                <Button success style={styles.btn} onPress={() => Actions.register()}>
                  <Text>Sign up</Text>
                </Button>
              </View>
             </Image>
          </Content>
        </View>
       }
      </Container>
    );
  }
}

/*
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthentic: false,
      loginToken: '',
    };
  }

  ComponentWillMount(){

  }

  render(){
    return(
      <Container>
          {this.state.isAuthentic ?  <Spinner /> : <PasswordLogin />}
      </Container>
    )
  }
}
*/

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
  };
}

export default connect(null, bindActions)(Login);
