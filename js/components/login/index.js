
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner } from 'native-base';
//import { Actions } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
//import { Base64 } from "js-base64";
import { setUser } from '../../actions/user';
import styles from './styles';

var phoneWidth = 1 / PixelRatio.get();

const background = require('../../../images/Home-Screen-Icon.png');

class Login extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    setTimeout(() =>
      AsyncStorage.multiGet(['initialEmail','initialToken']).then((asyncStore) => {
        console.log("login asyncStore[0][1]: ", asyncStore[0][1]);
        /*return (
          this.props.navigation.navigate('Tour')
        )*/
        if (asyncStore[0][1] !== null){
          return (
            this.props.navigation.navigate('Scanner')
          )
        } else {
          return (
            this.props.navigation.navigate('Tour')
          )
        }
      })
    ,1000)
    return (
      <Container>
           <Content style={styles.container}>
             <View style={styles.title}>
               <Text style={styles.paragraphTitle}>

               </Text>
               <Text />
             </View>

             <View style={styles.bg}>

               <Image source={background} style={styles.shadow} />
               <Text style={styles.paragraph}>
                    Geia Rewards
               </Text>
             </View>
           </Content>
       </Container>
    );
  }
}

export default Login;
