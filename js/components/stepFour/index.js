
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

class StepFour extends Component {

  static navigationOptions = {
    header: null
  };

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
              <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('ProperLogin')}>
                <Text style={styles.btnChild}>Sign In</Text>
              </Button>
              <Text />
              <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.btnChild}>Register</Text>
              </Button>
            </View>
           </Content>

       </Container>
    );
  }
}

export default StepFour;
