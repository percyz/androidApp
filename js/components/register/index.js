
import React, { Component } from 'react'; 
import { Image, PixelRatio, Dimensions, Alert, Switch, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button,
         Icon, Left, Right, Body, Input, InputGroup, Item,
         ListItem, CheckBox } from 'native-base'; 

import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import styles from './styles';
import sha256 from 'crypto-js/sha256';

const Regex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

class Register extends Component {

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
        ownOrg: false
      };
    };


    sendAjax = () => {

      if(!Regex.test(this.state.email)){
        Alert.alert("Invalid email address!");
      }else if(this.state.password != this.state.confirmPwd){
        Alert.alert("The passwords don't match!");
      }else{
        const fn = encodeURIComponent(this.state.firstname);
        const ln = encodeURIComponent(this.state.lastname);
        const e = encodeURIComponent(this.state.email.toLocaleLowerCase().trim());
        const p = encodeURIComponent(this.state.password);       
        const h = encodeURIComponent(this.state.phone);
        const o = encodeURIComponent(this.state.ownOrg);
        console.log("own org o:", o );
        const hashDigest = sha256(p);
        const requestBody = `firstname=${fn}&lastname=${ln}&password=${hashDigest}&email=${e}&phone=${h}&ownorg=${o}`;
        
        //POST
        fetch("https://geia-app.herokuapp.com/users", {
            method: "POST",
            mode: "cors",
            headers: {
                //"Accept": "application/json", 
                "Content-Type": "application/x-www-form-urlencoded"
                //"Content-Type": "application/json"
            },
            body: requestBody
        }).then(function (res, next) {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then(function (json) {
                    console.info(json);
                    console.info(json.registerstate);
                    if(json.registerstate){
                        Alert.alert("Register success, please login");
                        Actions.login();
                    }else{
                        Alert.alert("Login fail, please try again");
                    }
                });
            }else{
                Alert.alert('Noted','request failed',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                next();
            }
        })
        .then((res) => {
          Alert.alert("then working"); 
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
    
  render() {

    const { props: { name, index, list } } = this;
    console.log("own org:", this.state.ownOrg);
    console.log("Regex", Regex.test(this.state.email)); 

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
              <Title>Welcome</Title>
          </Body>

          <Right>
          {/*
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" /> 
            </Button>
            */}
          </Right>
        </Header>

        <Content padder>
          <Text style={styles.title}>Sign up for Geia account</Text>
          <Text>Enter your details to create a personal account</Text>
          {/*
          <Text>
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'} 
            This is first try!
          </Text>
           */}
           <Item>
             <Icon active name='person' />
             <Input placeholder='First Name'
                    ref='1'
                    //returnKeyType="next"
                    autoFocus={true}
                    blurOnSubmit={false} 
                    maxLength={20}                
                    value={this.state.firstname}
                    onChangeText={(firstname) => this.setState({firstname})}
                    //onSubmitEditing={() => this.refs.test.focus()}
              /> 
           </Item>
           <Item>
             <Icon active name='person' />
             <Input placeholder='Last Name (Optional)' 
                    ref='test' 
                    //returnKeyType="next"    
                    blurOnSubmit={false}             
                    value={this.state.lastname}
                    maxLength={20}    
                    onChangeText={(lastname) => this.setState({lastname})}
                    //onSubmitEditing={() => this.focusNextField('3')}
              />
           </Item>
           <Item>
             <Icon active name='mail' />
             <Input placeholder='Your Email'
                    ref='3'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    maxLength={50} 
                    onChangeText={(email) => this.setState({email})}
                    //onSubmitEditing={() => this.focusNextField('4')}
              />
           </Item>
           <Item>
             <Icon active name='unlock' />
             <Input placeholder='Your Password'
                    ref='4'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    maxLength={30} 
                    onChangeText={(password) => this.setState({password})}
                    //onSubmitEditing={() => this.focusNextField('5')}
                />
           </Item>
          <Item>
             <Icon active name='unlock' />
             <Input placeholder='Confirm Password'
                    ref='5'
                    //returnKeyType="next"
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    value={this.state.confirmPwd}
                    maxLength={30} 
                    onChangeText={(confirmPwd) => this.setState({confirmPwd})}
                    //onSubmitEditing={() => this.focusNextField('6')}
                />
           </Item>
           <Item>
             <Icon active name='phone-portrait' />
             <Input placeholder='Your Phone Number'
                    ref='6'
                    value={this.state.phone}
                    keyboardType={'phone-pad'}
                    maxLength={15} 
                    onChangeText={(phone) => this.setState({phone})}
              />
           </Item>
           <Text></Text>
           <Item>
             <Icon active name='paper' />
              <Text>Do you own a business?</Text>
              <Switch
                onValueChange={(value) => this.setState({ownOrg: value})}
                onTintColor="#33cc33"
                thumbTintColor="#0066cc"
                tintColor="#c4c4c4"  
                value={this.state.ownOrg} /> 
                <Text>{'\n'} </Text>
           </Item>
           <Text> </Text>
           
           <Button block success 
                disabled={!this.state.firstname || !this.state.password || !this.state.email ||!this.state.phone} 
                onPress={this.sendAjax}
           >
               <Text>Submit</Text>
           </Button>
        </Content>

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


export default connect(mapStateToProps, bindAction)(Register);
