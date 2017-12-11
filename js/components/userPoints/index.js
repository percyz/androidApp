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
    console.log("called");
    /*
    if(!this.props.navigation.state.params){
      return ("")
    }
    //var newEmail = this.props.navigation.state.params.email
   if(!this.props.navigation.state.params.points){
      return ("")
    }*/
    //this.setState({points: this.props.navigation.state.params.points})
    //this.props.navigation.state.params
    AsyncStorage.multiGet(['initialUser','initialEmail','initialPoints']).then((asyncStore) => {
      console.log("userPoints asyncStore inital info: ", asyncStore);
      if (asyncStore[1][1] !== null && asyncStore[1][1].length > 0){
        this.setState({user: asyncStore[0][1], points: asyncStore[2][1], email: asyncStore[1][1]});
      }else {
        //this.setState({user: newEmail})
        console.log("can not get initial email and points");
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
    if(!this.state.user){
      console.log("waiting....")
      return (<View style={styles.subContainer}></View>)
    }
    return (
      <Container>
          <Header style={styles.header}>
            <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" className="angle-left"/>
            </Button>
            </Left>

            <Body style={styles.headerBody}>
                <Icon style={{color: 'white', fontSize:30}} name="ios-home" />
            </Body>

            <Right style={{flex:1}}>
              <Text> </Text>
            {/*
              <Button transparent onPress={this.props.openDrawer}>
                <Icon name="ios-menu" />
              </Button>
              */}
            </Right>
          </Header>

        <Content style={styles.subContainer}>
        <Image source={greenBackground} style={styles.shadow} />
          <View style={{marginTop:20}}>
            <Text style={styles.subParagraph}>
                {this.state.user}
            </Text>
          </View>

          <View style={{marginTop:10}}>
            <Text style={{fontSize:14, color:'white', textAlign:'center'}}>
                Geia Points
            </Text>
          </View>
          
          <View style={{marginTop:3}}>
            <Text style={styles.points}>
                {this.state.points}
            </Text>
          </View>

          <View style={{marginTop:3}}>
            <Text style={styles.points}>
              <Icon style={{color: 'white', fontSize:60}} name="ios-cart" />
            </Text>
          </View>

          <View style={{marginTop:3}}>
            <Text style={{fontSize:14, color:'white', textAlign:'center'}}>
                Your Rewards
            </Text>
          </View>

         <View style={styles.subParagraphView}>
           <Text style={{color:'white', fontSize:20}}>
               Next Prize Draw
           </Text>
           <Text style={{color:'white', fontSize:30}}>
               3   11   5 
           </Text>
           <Text style={{color:'white', fontSize:14}}>
               Days     Hours     Mins 
           </Text>
           <Text style={{color:'white', fontSize:14, marginTop:10}}>
               Prize Pool:
           </Text>
           <Text style={{color:'white', fontSize:14}}>
               3x $50 Cash Prize 
           </Text>
         </View>
{/*
         <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/geia.ltd/')}>
          <Image source={fbIcon} style={styles.fbButton} />
         </TouchableOpacity>

         <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image source={scanIcon}  style={styles.scannerButton} />
         </TouchableOpacity>
  
         <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Scanner', { cameraView: true})}> 
*/}

        
        </Content>

        <NewFooter
          navigate={this.props.navigation.navigate}
          destinationLeaderboard="LeaderBoard"
          destinationSpin="Spin"
          destinationUserPoints="UserPoints"
        />
     </Container>
    );
  }

};

export default UserPoints;
