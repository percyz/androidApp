
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage, Linking, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner, Header, Body, Title, Left, Right } from 'native-base';
//import { Actions } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
//import { Base64 } from "js-base64";
import { setUser } from '../../actions/user';
import styles from './styles';

var phoneWidth = 1 / PixelRatio.get();

const background = require('../../../images/Home-Screen-Icon.png');

class ProperLogin extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
  }

  static navigationOptions = {
    header: null
  };

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

  /*componentWillMount(){
        console.log("ComponentWillMount is working");

        AsyncStorage.multiGet(['initialEmail','initialToken']).then((asyncStore) => {
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
                fetch("https://geiaiostest.herokuapp.com/users/auth/refresh", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                        //"Content-Type": "application/json"
                    },

                    // body: JSON.stringify({
                    //   username: "percy",
                    //   userpassword: "12345678"
                    // })

                    body: requestBody
                }).then((res) => {
                    console.log("token fetch request ", JSON.stringify(res.ok));
                    if(res.ok){
                        res.json().then((json) => {
                            console.info(json);
                            console.info(json.verifystate);
                            if(json.verifystate){
                                //Alert.alert("token authenticated");
                                this.props.navigation.navigate('Home')
                            }
                            else{
                              //Alert.alert("invalid token, please login with email and password");
                              this.setState({isAuthentic:false});
                            }
                        });
                    }else{
                        Alert.alert('Login fail, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
                        //next();
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
  }*/

  setUser(name) {
    console.log("setUser name: ",name);
    newName = name.toLowerCase().trim();
    this.props.setUser(newName);
    this.setState({email:newName});
  }

  async saveItem(user) {
    console.log("Save Item called",user);
    //var loginToken = Base64.encode(this.state.email);
    try {
      await AsyncStorage.multiSet([['initialEmail', this.state.email],['initialToken', 'false'],['initialUser', user]]);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    };
    console.log("async data: ")
  }

   sendAjax = () => {
        //this.setState({isAuthentic:false});
        this.setState({loginProgress:true});
        console.log("Email is :",this.state.email,"password is :",this.state.password)
        const m = encodeURIComponent(this.state.email.toLocaleLowerCase().trim());
        const p = encodeURIComponent(this.state.password);
        const hashDigest = sha256(p);
        const t = encodeURIComponent('ANDROID');
        console.log("new p is", hashDigest);
        const requestBody = `email=${m}&password=${hashDigest}&appType=${t}`;
        console.log("login info: ",requestBody);
        //POST
        fetch("https://geiaiostest.herokuapp.com/users/auth", {
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
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then((json) => {
                    console.info(json);
                    console.info(json.verifystate);
                    if(typeof json.user == "string" || json.verifystate == 1){
                        //Alert.alert("Login success");
                        this.props.navigation.navigate('Scanner')
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


  render() {
    return (
     <Container>
     <Header style={styles.header}>
       <Left>
       <Button transparent onPress={() => this.props.navigation.goBack()}>
         <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" />
       </Button>
       </Left>

       <Body>
           <Title style={{color: 'white'}}>Sign In</Title>
       </Body>

       <Right>
       {/*
         <Button transparent onPress={this.props.openDrawer}>
           <Icon name="ios-menu" />
         </Button>
         */}
       </Right>
     </Header>

     <Content style={styles.container}>
          <View style={{marginTop:40, alignSelf:'center'}}>
              <Image source={background} style={styles.shadow} />
          </View>

          <View style={styles.bg}>
              {/*
                <Text style={styles.paragraph}>
                    Sign In
                </Text>
                  <Icon active name="person" />
                  <Input placeholder="EMAIL"
                         autoFocus={true}
                         keyboardType={'email-address'}
                         maxLength={50}
                         onChangeText={text => {
                             clearTimeout(this.textTimeout);
                             this.textTimeout = setTimeout(()=>this.setState({email: text}), 200);
                         }}
                         //onChangeText={(email) => this.setUser(email)}
                         //value={this.state.email}
                   />
                   */}
                   <TextInput
                     style={styles.input}
                     underlineColorAndroid='white'
                     placeholder="Email"
                     placeholderTextColor='grey'
                     keyboardType='email-address'
                     secureTextEntry={false}
                     onChangeText={text => {
                         clearTimeout(this.textTimeout);
                         this.textTimeout = setTimeout(()=>this.setState({email: text}), 200);
                     }}
                   />
                {/*
                  <Icon name="unlock" />
                  <Input
                    placeholder="PASSWORD"
                    secureTextEntry={true}
                    maxLength={30}

                    //defaultvalue="abc"
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({password: text}), 200);
                    }}
                     //onChangeText={(password) => this.setState({ password })}
                     //value={this.state.password}
                  />
                  */}
                  <TextInput
                    style={styles.input}
                    //color='black'
                    placeholder="Password"
                    underlineColorAndroid='white'
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({password: text}), 200);
                    }}
                  />

                {/*
                <Text style={styles.forgetPw} onPress={() => Actions.forgetPw()} >Forget Password?</Text>
                <Text>email:{this.state.email}, password:{this.state.password}</Text>
                */}
                <Text style={styles.forgetPw}
                      onPress={() => Linking.openURL('https://www.geia.nz/resetPassword')}>
                  Forgot password?
                </Text>

                {this.state.loginProgress? <Spinner color='white' /> :
                  <Button success style={styles.btn}
                          disabled={!this.state.email || !this.state.password}
                          onPress={this.sendAjax}
                  >
                    <Text style={styles.btnChild}>Sign In</Text>
                  </Button>
                 }
          </View>
          </Content>
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

export default connect(null, bindActions)(ProperLogin);
