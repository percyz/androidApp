
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner } from 'native-base';
//import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import { setUser } from '../../actions/user';
import styles from './styles';

var phoneWidth = 1 / PixelRatio.get();

const background1 = require('../../../images/Home-Screen-Icon.png');
const background2 = require('../../../images/Shop_White_2.png');
const background3 = require('../../../images/QR_White_1.png');
const background4 = require('../../../images/Cash_White.png');

class Tour extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Container>
           <Content style={styles.container}>
             {/*
             <View style={styles.title}>
               <Text style={styles.paragraphTitle}>
                   Welcome To
               </Text>
               <Text />
             </View>

             <View style={styles.bg}>
               <Image source={background} style={styles.shadow} />
             </View>

             <View>
               <Text style={styles.paragraph}>
                   Geia Rewards
               </Text>
             </View>

             <View style={styles.btnView}>
                <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('StepOne')}>
                  <Text style={styles.btnChild}>Get Started</Text>
                </Button>
            </View>
*/}
            <Swiper style={styles.wrapper} 
                    showsButtons={false}
                    activeDotColor='white'
                    loop={false}
            >
              <View style={styles.slide1}>
                  <Text style={styles.paragraphTitle}>
                      Welcome To
                  </Text>

                  <Image source={background1} style={styles.shadow} />

                  <Text style={styles.paragraph}>
                   Geia Rewards
                  </Text>
              </View>

              <View style={styles.slide2}>
                  <Text style={styles.paragraphTitle}>
                      Step 1
                  </Text>
                  <Text style={styles.paragraph}>
                      Shop with Geia 
                  </Text>
                  <Text style={styles.paragraphLine2}>
                      Reward Partners
                  </Text>

                  <Image source={background2} style={styles.shadow} />
                  <Text style={{marginBottom:30}} />  
              </View>

              <View style={styles.slide3}>
                  <Text style={styles.paragraphTitle}>
                      Step 2
                  </Text>
                  <Text style={styles.paragraph}>
                      Scan QR codes to
                  </Text>
                  <Text style={styles.paragraphLine2}>
                      collect points
                  </Text>

                  <Image source={background3} style={styles.shadow} />

                  <Text style={styles.subParagraph}>
                      Each point counts as 1 entry
                  </Text>
                  <Text style={styles.subParagraphLine2}>
                      into our cash prize draw
                  </Text>
              </View>

              <View style={styles.slide4}>
                  <Text style={styles.paragraphTitle}>
                      Step 3
                  </Text>
                  <Text style={styles.paragraph}>
                      Watch the FB live stream
                  </Text>
                  <Text style={styles.paragraphLine2}>
                      prize draw to win cash!
                  </Text>
                  
                  <Image source={background4} style={styles.shadow} />

                  <Text style={styles.subParagraph}>
                      3 x $50 cash prizes given
                  </Text>
                  <Text style={styles.subParagraphLine2}>
                      way each week on Friday @3pm
                  </Text>
              </View>
            </Swiper>

            <View style={styles.btnView}>
            <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.btnChild}>CREATE ACCOUNT</Text>
            </Button>

            <Button success style={styles.btn} onPress={() => this.props.navigation.navigate('StepFour')}>
              <Text style={styles.btnChild}>LOG IN</Text>
            </Button>
            </View>
           </Content>
       </Container>
    );
  }
}

export default Tour;
