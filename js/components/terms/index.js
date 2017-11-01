
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Text, Button,
         Icon, Left, Right, Body, Input, InputGroup, Item,
         ListItem, CheckBox, View } from 'native-base';
//import { Actions } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
//import { Base64 } from "js-base64";
import { setUser } from '../../actions/user';
import styles from './styles';

var phoneWidth = 1 / PixelRatio.get();

const background = require('../../../images/Home-Screen-Icon.png');

class Terms extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    return (
     <Container>
     <Header style={styles.header}>
       <Left style={{flex:1}}>
       <Button transparent onPress={() => this.props.navigation.goBack()}>
         <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" />
       </Button>
       </Left>

       <Body style={{flex:3}}>
           <Title style={{color: 'white'}}>Terms and Conditions</Title>
       </Body>


     </Header>
        <View style={styles.container}>
          <Content>
            <View>
                {/*
              <Text style={styles.h1}>
                  Geia Rewards Terms and Conditions
              </Text>
              */}
              <Text style={styles.paragraph}>
                  These terms and conditions apply when
                  participating with the Geia Rewards App.
                  By using this app, you acknowledge that you have
                  read and accepted these terms and conditions.
              </Text>
              <Text style={styles.paragraph}>
                  These terms and conditions are subject to change
                  and will be updated in this description accordingly.
              </Text>
              <Text style={styles.paragraph}>
                  Geia Rewards is an independently run contest and is not
                  sponsored or associated with Apple.
              </Text>
              <Text style={styles.h2}>
                  Being in the draw to win prizes
              </Text>
              <Text style={styles.paragraph}>
                  The purpose of this app is to allow you to scan QR codes
                  and collect Geia Points. Each point will count as one entry
                  into the weekly cash prize draw which will be announced via livestream
                  at 3pm every Friday (New Zealand time).
              </Text>
              <Text style={styles.h2}>
                  Winning prizes
              </Text>
              <Text style={styles.paragraph}>
                  Every Friday Geia will randomly select winners for the
                  3pm live stream announcement. The randomly selected winners
                  will each receive $50 NZD. This will be funded by up to 10% of
                  Geia’s weekly revenue.
              </Text>
              <Text style={styles.h2}>
                  Claiming prizes
              </Text>
              <Text style={styles.paragraph}>
                1) Prize winners must claim their prize within 60 days of them being publicly
                announced as winners. They will receive phone call, an email,
                and text notification on the day they win. If they do not respond
                and/or claim their prize within 14 days they will receive one more phone
                call, email, and text notification to claim their prize.
              </Text>
              <Text style={styles.paragraph}>
                  2) If a prize is not claimed within the 60-day period, then their full
                  prize allocation will be placed back into the prize pool and will be
                  reallocated in the next draw.
              </Text>
              <Text style={styles.paragraph}>
                  3) Prize winners will not engage in illegal activities with their prize
                  at any point. If they are proven to breach this condition, then they
                  will not be eligible to enter into another draw with Geia for 36 months.
              </Text>
              <Text style={styles.paragraph}>
                  4) If winners choose to pick up their prize as cash in person they must bring a
                  current form of identification. If they choose to receive it online,
                  they must provide Geia with a New Zealand bank account number which the
                  prize money can be transferred to. This must be provided to Geia within
                  60 days of winning the prize.
              </Text>
              <Text style={styles.paragraph}>
                  Prize winners may decline their prize, in which case it will be placed back into the prize
                  pool for the following draw. Prize winners may also choose to redirect their
                  prize to someone or something else, at the discretion of Geia.
              </Text>
              <Text style={styles.h2}>
                  Privacy
              </Text>
              <Text style={styles.paragraph}>
              When registering to use Geia Rewards we require information to allow us to identify and
              contact the weekly winners in order to redeem their prize. This includes their first name,
              last name, email address, and phone number.
              We do not share any of your personal details with participating businesses. We do share the total
              amount of scans their unique QR code receives.
              </Text>
              <Text style={styles.paragraph}>
                We take data security seriously. We have in place rigorous data security
                policies and practices aimed at mitigating the risks of unauthorised access
                to, and loss, misuse or wrongful alteration of, personal information held by us.
              </Text>
              <Text style={styles.paragraph}>
                  We take measures to destroy or ensure anonymity for personal information held by us
                  if we no longer need to use it for any lawful purpose
              </Text>
              <Text style={styles.paragraph}>
                  We are dedicated to keeping your Geia membership details safe and secure from scams and fraud. If
                  you are ever in any doubt about the authenticity of any communications that are or
                  seem to be from Geia please immediately email us at hello@geia.nz and include a copy of the email in question.
              </Text>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

export default Terms;
