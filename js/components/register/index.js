
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, Switch, View, ListView, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button,
         Icon, Left, Right, Body, Input, InputGroup, Item,
         ListItem, CheckBox, Spinner } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import styles from './styles';
import sha256 from 'crypto-js/sha256';

import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";

import Home from '../home';

const Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

class Register extends Component {

  static navigationOptions = {
    header: null
  };

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props){
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPwd: '',
        phone: '',
        ownOrg: false,
        registerProgress: false,
      };
    };

    sendAjax = () => {
      //this.props.navigation.navigate('Login')
      this.setState({registerProgress:true});
      if(this.state.firstname == ''){
        Alert.alert("Please enter your first name");
        this.setState({registerProgress:false});
      }
      else if(this.state.lastname == ''){
        Alert.alert("Please enter your last name");
        this.setState({registerProgress:false});
      }
      else if(this.state.phone == ''){
        Alert.alert("Please enter your phone number");
        this.setState({registerProgress:false});
      }
      else if(!Regex.test(this.state.email)){
        Alert.alert("Invalid email address!");
        this.setState({registerProgress:false});
      }else if(this.state.password != this.state.confirmPwd){
        Alert.alert("The passwords don't match!");
        this.setState({registerProgress:false});
      }else{
        const fn = encodeURIComponent(this.state.firstname);
        const ln = encodeURIComponent(this.state.lastname);
        const e = encodeURIComponent(this.state.email.toLocaleLowerCase().trim());
        const p = encodeURIComponent(this.state.password);
        const h = encodeURIComponent(this.state.phone);
        const o = encodeURIComponent(this.state.ownOrg);
        const t = encodeURIComponent('ANDROID');
        const hashDigest = sha256(p);
        const requestBody = `firstname=${fn}&lastname=${ln}&password=${hashDigest}&email=${e}&phone=${h}&ownorg=${o}&appType=${t}`;

        //POST 
        fetch("https://geiaiostest.herokuapp.com/users", {
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
                res.json().then((json) => {
                    console.info(json);
                    console.info(json.registerstate);
                    if(json.registerstate == -1) {
                      Alert.alert('This email is already registered, please try again')
                      this.setState({registerProgress:false});
                    }else if(json.registerstate){
                        //Alert.alert("Register success, please login");
                        try {
                          var fullName = this.state.firstname + " " + this.state.lastname
                          console.log('name is :',fullName)
                          console.log("INITIALEMAIL####",this.state.email)
                          AsyncStorage.multiSet([['initialEmail', this.state.email],['initialToken', 'false'],['initialUser', fullName]]);
                        } catch (error) {
                          // Error saving data
                        }
                        //Adding auto Login
                        //End of adding auto Login
                        Alert.alert('Register success');
                        this.props.navigation.navigate('Scanner');
                        this.saveItem()
                    }else{
                        Alert.alert("Register fail, please try again");
                        this.setState({registerProgress:false});
                    }
                });
            }else{
                Alert.alert('Noted','request failed',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
                //next();
                this.setState({registerProgress:false});
            }
        })
        .then((res) => {

        })
        .catch(function (e) {
            console.log("fetch fail");
            Alert.alert('Noted','system error',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
      }
    }

  focusNextField(nextField){
    //this.refs[nextField].focus();
  }

  async saveItem() {
    console.log("Save Item called");
    //var loginToken = Base64.encode(this.state.email);
    try {
      var fullName = this.state.firstname + " " + this.state.lastname
      console.log('name is :',fullName)
      await AsyncStorage.multiSet([['initialEmail', this.state.email],['initialToken', 'false'],['initialUser', fullName]]);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    };
    console.log("async data: ")
  }

  render() {

    const { props: { name, index, list } } = this;
    //console.log("own org:", this.state.ownOrg);
    //console.log("Regex", Regex.test(this.state.email));
    console.log("@@@@@@FNMAE: ",this.state.firstname);

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left style={{flex:1}}>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" />
          </Button>
          </Left>

          <Body style={styles.headerBody}>
              <Title style={{color: 'white'}}>Register</Title>
          </Body>

          <Right style={{flex:1}}>
          {/*
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
            */}
          </Right>
        </Header>

        <Content>
          <View style={styles.gray}>
          <Text >My Details</Text>
          </View>
          {/*
          <Text>
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}
            This is first try!
          </Text>
           */}
           <Item style={{marginTop:2}}>
             <Input placeholder='First Name'
                    style={{backgroundColor:'white'}}
                    ref='1'
                    //returnKeyType="next"
                    autoFocus={true}
                    blurOnSubmit={false}
                    maxLength={20}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({firstname: text}), 200);
                    }}
                    //value={this.state.firstname}
                    //onChangeText={(firstname) => this.setState({firstname})}
                    //onSubmitEditing={() => this.refs.test.focus()}
              />
           </Item>
           <Item style={{marginTop:2}}>
             <Input placeholder='Last Name'
                    style={{backgroundColor:'white'}}
                    ref='test'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    //value={this.state.lastname}
                    maxLength={20}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({lastname: text}), 200);
                    }}
                    //onChangeText={(lastname) => this.setState({lastname})}
                    //onSubmitEditing={() => this.focusNextField('3')}
              />
           </Item>
           <Item style={{marginTop:2}}>
             <Input placeholder='Your Email'
                    style={{backgroundColor:'white'}}
                    ref='3'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    //value={this.state.email}
                    keyboardType={'email-address'}
                    maxLength={50}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({email: text}), 200);
                    }}
                    //onChangeText={(email) => this.setState({email})}
                    //onSubmitEditing={() => this.focusNextField('4')}
              />
           </Item>
           <Item style={{marginTop:2}}>
             <Input placeholder='Your Password'
                    style={{backgroundColor:'white'}}
                    ref='4'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    //value={this.state.password}
                    maxLength={30}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({password: text}), 200);
                    }}
                    //onChangeText={(password) => this.setState({password})}
                    //onSubmitEditing={() => this.focusNextField('5')}
                />
           </Item>
           <Item style={{marginTop:2}}>
             <Input placeholder='Confirm Password'
                    style={{backgroundColor:'white'}}
                    ref='5'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    //value={this.state.confirmPwd}
                    maxLength={30}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({confirmPwd: text}), 200);
                    }}
                    //onChangeText={(confirmPwd) => this.setState({confirmPwd})}
                    //onSubmitEditing={() => this.focusNextField('6')}
                />
           </Item>
           <Item style={{marginTop:2}}>
             <Input placeholder='Your Phone Number'
                    style={{backgroundColor:'white'}}
                    ref='6'
                    //value={this.state.phone}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    onChangeText={text => {
                        clearTimeout(this.textTimeout);
                        this.textTimeout = setTimeout(()=>this.setState({phone: text}), 200);
                    }}
                    //onChangeText={(phone) => this.setState({phone})}
              />
           </Item>
           {/*<Text></Text>
           <Item>
              <Text>Do you own a business?</Text>
              <Switch
                onValueChange={(value) => this.setState({ownOrg: value})}
                onTintColor="#33cc33"
                thumbTintColor="#0066cc"
                //tintColor="#ff0000"
                value={this.state.ownOrg} />
                <Text>{'\n'} </Text>
           </Item>
           <Text> </Text>*/}
           {this.state.registerProgress? <Spinner color='#88C040' /> :
             <Button style={styles.reg} block
                  //disabled={!this.state.firstname || !this.state.password || !this.state.email ||!this.state.phone}
                  onPress={this.sendAjax}
             >
                 <Text style={{color: 'white'}}>Continue</Text>
             </Button>
           }
        </Content>

      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(Register);
