
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

const background = require('../../../images/Shop_White_2.png');

class StepOne extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    return (
     <Container>
          <Content style={styles.container}>
            <View style={styles.title}>
              <Text style={styles.paragraphTitle}>
                  Step 1
              </Text>
              <Text />
            </View>

            <View style={styles.bg}>
              <Text style={styles.paragraph}>
                  Shop with Geia
              </Text>
              <Text style={styles.paragraphLine2}>
                  Reward Partners
              </Text>
              <Image source={background} style={styles.shadow} />
            </View>

           <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('StepTwo')}>
             <Text style={styles.btnChild}>Next</Text>
           </Button>
          </Content>
      </Container>
    );
  }
}

export default StepOne;
