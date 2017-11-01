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
  Animated,
  Linking,
} from 'react-native';
import { connect } from "react-redux";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import styles from './styles';
import { Container, Content, Spinner, Header, Left, Right, Title, Icon, Body, Button } from 'native-base';
import { openDrawer } from "../../actions/drawer";
import NewFooter from '../newFooter';
const greenBackground = require('../../../images/Geia_Logo_Green_small.png');
const fbIcon = require('../../../images/Fb_White.png');
const scanIcon = require('../../../images/Scanner_White.png')

//test dropdown
var isHidden = true;

//end of test dropdown

class UserPoints extends Component {

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
      email: '',
      points: '',
      user: '',
      fbEmail: true,
    };
  }

  componentWillMount(){
    console.log("called")
    if(!this.props.navigation.state.params){
      return ("")
    }
    var newEmail = this.props.navigation.state.params.email
    /*if(!this.props.navigation.state.params.points){
      return ("")
    }*/
    //this.setState({points: this.props.navigation.state.params.points})
    //this.props.navigation.state.params
    AsyncStorage.multiGet(['initialUser','initialEmail','initialPoints']).then((asyncStore) => {
      console.log("userPoints asyncStore inital info: ", asyncStore);
      if (asyncStore[1][1] !== null && asyncStore[1][1].length > 0){
        this.setState({user: asyncStore[0][1], points: asyncStore[2][1], email: asyncStore[1][1]})
      }else {
        this.setState({user: newEmail})
      }
    })
  }

/*
  componentDidMount() {
    this.setState({fbEmail:false});
    try{
      AsyncStorage.multiGet(['initialUser','initialFbEmail']).then((asyncStore) => {
        console.log("userPoints asyncStore inital info: ", asyncStore);
        if (asyncStore[1][1] !== null){
          this.setState({fbEmail: asyncStore[1][1]});
          console.log('this.state.fbEmail', this.state.fbEmail);
          if(typeof this.state.fbEmail == 'string'){
          Alert.alert(
            'Thank you for using Geia Rewards',
            'Do you mind fill in you email address, so we could inform you if you win',
            [
              {text:'Cancel', onPress:() => console.log("logout cancel")},
              {text:'OK',  onPress:()=> this.props.navigation.navigate('EditUser')}
            ]
          )
          }
        }else {
          this.setState({user: newEmail})
        }
      })

      console.log('this.state.fbEmail', this.state.fbEmail);

    }catch(error){
      console.log('get asyncstore initial fb email error: ', error);
    }
  }
*/

  render() {
    if(!this.props.navigation.state.params){
      console.log("waiting....")
      return (<View style={styles.subContainer}></View>)
    }
    return (
      <Container>

        <Content style={styles.subContainer}>
        <Image source={greenBackground} style={styles.shadow} />
          <View style={{marginTop:20}}>
            <Text style={styles.subParagraph}>
                {this.state.user}
            </Text>
          </View>

         <View style={{marginTop:10}}>
           <Text style={styles.points}>
               {this.state.points}
           </Text>
         </View>

         <View style={{marginTop:6}}>
           <Text style={{fontSize:15, color:'white', textAlign:'center'}}>
               Geia Points
           </Text>
         </View>

         <View style={styles.subParagraphView}>
           <Text style={styles.subParagraph}>
               Prize Draw 3pm
           </Text>
           <Text style={styles.subParagraph}>
               Every Week Live On
           </Text>
         </View>
         <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/geia.ltd/')}>
          <Image source={fbIcon} style={styles.fbButton} />
         </TouchableOpacity>

         <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image source={scanIcon}  style={styles.scannerButton} />
         </TouchableOpacity>

         <View style={styles.newScan}>
        {/*
         <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Scanner', { cameraView: true})}> 
        
        <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Scanner')}> 
        */}

         </View>
        </Content>
     </Container>
    );
  }

};

export default UserPoints;
