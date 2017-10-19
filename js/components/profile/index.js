
import React, { Component } from 'react';
import { View, Alert, StatusBar } from 'react-native'; 
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, 
         Card, CardItem, Item, Input, InputGroup } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';

class Profile extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
      super(props);
      this.state = {
          userName: '',
          userEmail: '',
          userPhone: '',
          userPoints: '',
          resetView: false,
          buttonView: true,
          userCurPassword: '',
          userNewPassword: '',
          userConPassword: ''
      };
  }

  componentWillMount() {

    if(this.props.name != ''){
      console.log("props get value", this.props.name);
    
    //POST
      const u = encodeURIComponent(this.props.name);
      const requestBodyPoint = `email=${u}`; 
      console.log("requestBodyPoint info: ", requestBodyPoint);
      return fetch("https://geia-app.herokuapp.com/users/info", {
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
                            userName: json.profile.name,
                            userEmail: json.emails.address,
                            userPhone: json.profile.phone,
                            userPoints: json.profile.points,
                      });
                  });
                  //console.info("waiting props name1",this.state.userEmail); 
              }else{
          Alert.alert("server is busying, try again later");
        }
      })
      .catch(function(err) {
        Alert.alert("get fail", err);
        //console.info("waiting props name2",this.state.userName);
      })
  }else{
    //console.info("waiting props name",this.state.userEmail);
  }
};

showResetView = () => {
  this.setState({
    resetView: true,
    buttonView: false
  });
}

sendAjax = () => {

        const m = encodeURIComponent(this.props.name);
        const p = encodeURIComponent(this.state.userCurPassword);
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
            body: requestBody
        }).then((res, next) => {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then((json) => {
                    console.info(json);
                    console.info(json.verifystate);
                    if(json.verifystate == 1){
                        //Alert.alert("valid password success");
                        //Actions.leaderBoard();
                          if(this.state.userNewPassword == this.state.userConPassword){
                            //Alert.alert("Password reset successfully!");
                            this.setState({
                              resetView: false,
                              buttonView: true
                            });
                            this.resetPwd();
                          }else{
                            Alert.alert("Password does not match!");
                          }
                    }else if(json.verifystate == 2){
                       Alert.alert("invalid current password, please try again");
                    }
                    else{
                       Alert.alert("invalid current password, please try again");
                    }
                });
            }else{
                //Alert.alert('invalid password, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                next();
            }
        })
        .then((res) => {
          //Alert.alert("then working");
        })
        .catch(function (e) {
            console.log("fetch fail");
            Alert.alert('invalid current password, please try again',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
  }

  resetPwd = () => {

      if(this.props.name != ''){
        const olde = encodeURIComponent(this.props.name);
        const p = encodeURIComponent(this.state.userNewPassword);       
        const hashDigest = sha256(p);
        const requestBody = `oldemail=${olde}&password=${hashDigest}`;
        
        //POST
        fetch("https://geia-app.herokuapp.com/users/reset", {
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
                    console.info(json.editstate);
                    if(json.editstate){
                        Alert.alert("Password reset successfully!");
                        //Actions.login();
                    }else{
                        Alert.alert("reset fail, please try again");
                    }
                });
            }else{
                Alert.alert('request failed',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                next();
            }
        })
        .then((res) => {
          //Alert.alert("then working"); 
        })
        .catch(function (e) {
            console.log("fetch fail");
            Alert.alert('system error',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
    }else{
      Alter.alert("Load...");
    }
  }

  render() {

    const { props: { name, index, list } } = this;
    StatusBar.setBarStyle('light-content', true);

    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor="red"
          barStyle="light-content"
          //style={{height:300}}
        />
        <NewHeader />
        <Content padder>
        {/*
          <Text>contact us now</Text>
          <Text>
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}  
            This is first try! 
          </Text>
        */}
        <Card>
           <CardItem>
              <Text style={styles.title}>Your Profile</Text>
           </CardItem>

           <CardItem>
               <Text>Name: {this.state.userName}</Text>    
           </CardItem>

           <CardItem>
                <Text>Phone: {this.state.userPhone}</Text>
           </CardItem>

           <CardItem>
                <Text>Email: {this.props.name}</Text>
           </CardItem>

           <CardItem>
                <Text>Geia Points: {this.state.userPoints}</Text>
           </CardItem>

           <CardItem>
           </CardItem>
        </Card>
         
        <Button success block onPress={() => Actions.editUser()} > 
            <Icon name="person" />
            <Text>Edit your detail</Text>
        </Button>
        <Text></Text>

        {!this.state.resetView ? null : 
        <View>
            <Item>
             <Icon active name='person' />
             <Input placeholder='Current Password'                
                    value={this.state.userCurPassword}
                    secureTextEntry={true}
                    maxLength={20} 
                    onChangeText={(userCurPassword) => this.setState({userCurPassword})}
                    onSubmitEditing={this.verifyPwd}
              /> 
           </Item>
           <Item>
             <Icon active name='person' />
             <Input placeholder='New Password'                   
                    value={this.state.userNewPassword}
                    secureTextEntry={true}
                    maxLength={20} 
                    onChangeText={(userNewPassword) => this.setState({userNewPassword})}
              />
           </Item>
           <Item>
             <Icon active name='mail' />
             <Input placeholder='Confirm New Password'
                    value={this.state.userConPassword}
                    secureTextEntry={true}
                    maxLength={20} 
                    onChangeText={(userConPassword) => this.setState({userConPassword})}
              />
           </Item>
           <Button success block onPress={this.sendAjax} > 
              <Icon name="lock" />
              <Text>Save</Text>
           </Button>
        </View>
        }
        {!this.state.buttonView ? null : 
        <Button success block onPress={this.showResetView} > 
            <Icon name="unlock" />
            <Text>Reset Password</Text>
        </Button>
        }

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


export default connect(mapStateToProps, bindAction)(Profile);
