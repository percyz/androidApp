
import React, { Component } from 'react';
import { Image, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right,
  Body, Input, InputGroup, Item, ListItem, CheckBox } from 'native-base';
import sha256 from 'crypto-js/sha256';
import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';

class EditUser extends Component {

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
        phone: ''
      };
    };


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
                      nameArray = json.profile.name.split(" ");
                      this.setState({
                            firstname: nameArray[0],
                            lastname: nameArray[1],
                            email: this.props.name,
                            phone: json.profile.phone,
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

    sendAjax = () => {

      if(this.props.name != ''){
        console.log("props get value", this.props.name);
        const olde = encodeURIComponent(this.props.name);
        const fn = encodeURIComponent(this.state.firstname);
        const ln = encodeURIComponent(this.state.lastname);
        const e = encodeURIComponent(this.state.email).toLowerCase();   
        const h = encodeURIComponent(this.state.phone);
        const requestBody = `oldemail=${olde}&firstname=${fn}&lastname=${ln}&email=${e}&phone=${h}`;
        
        //POST
        fetch("https://geia-app.herokuapp.com/users/edit", {
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
                        Alert.alert("Edit successfully!");
                        Actions.login();
                    }else{
                        Alert.alert("Edit fail, please try again");
                    }
                });
            }else{
                Alert.alert('Noted','request failed',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                next();
            }
        })
        .then((res) => {
          //Alert.alert("then working"); 
        })
        .catch(function (e) {
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

        <NewHeader />
        <Content padder>
          <Text style={styles.title}>Edit your account</Text>
          <Text>Enter your details to edit your info</Text>
           <Item>
             <Icon active name='person' /><Text note>First Name: </Text>
             <Input placeholder='First Name'                
                    value={this.state.firstname}
                    autoFocus={true}
                    maxLength={20} 
                    onChangeText={(firstname) => this.setState({firstname})}
              /> 
           </Item>
           <Item>
             <Icon active name='person' /><Text note>Last Name: </Text>
             <Input placeholder='Last Name'                   
                    value={this.state.lastname}
                    maxLength={20} 
                    onChangeText={(lastname) => this.setState({lastname})}
              />
           </Item>
           <Item>
             <Icon active name='mail' /><Text note>Email: </Text>
             <Input placeholder='Your Email'
                    value={this.state.email}
                    //keyboardType={'email-address'}
                    maxLength={50} 
                    onChangeText={(email) => this.setState({email})}
              />
           </Item>
           <Item>
             <Icon active name='phone-portrait' /><Text note>Phone: </Text>
             <Input placeholder='Your Phone Number'
                    value={this.state.phone}
                    keyboardType={'phone-pad'}
                    maxLength={15} 
                    onChangeText={(phone) => this.setState({phone})}
              />
           </Item>
           <Text></Text>
           <Button block success
                disabled={!this.state.firstname || !this.state.lastname || !this.state.email ||!this.state.phone} 
                onPress={this.sendAjax}
           >
               <Text>Save</Text>
           </Button>
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


export default connect(mapStateToProps, bindAction)(EditUser);
