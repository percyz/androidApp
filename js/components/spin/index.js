
import React, { Component } from 'react';
import { Image, PixelRatio, Dimensions, Alert, AsyncStorage, Linking, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Item, Input, Button, Icon, View, Text, Spinner, Header, Left, Right, Body } from 'native-base';
import NewFooter from '../newFooter';
//import { Actions } from 'react-native-router-flux';
import sha256 from 'crypto-js/sha256';
//import { Base64 } from "js-base64";
import { setUser } from '../../actions/user';
import styles from './styles';

var phoneWidth = 1 / PixelRatio.get();

const background = require('../../../images/Geia_Logo_Green.png');
const pointMarker = require('../../../images/validMarker.png');

class Spin extends Component {

  constructor (props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.opacityValue = new Animated.Value(0);
    this.rotateXValue = new Animated.Value(0);
    this.state = {
      stopSpin: false,
      spinRemain: 3,
    }
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount () {

  };

  spin () {
    {/*
    this.spinValue.setValue(0);
    Animated.decay(
      this.spinValue,
      {
        velocity: {x: 1, y: 1},
        deceleration: 0.98,
      }
    ).start(() => this.spin())
  */};
    var spinNum = this.state.spinRemain;
    this.setState({spinRemain: spinNum -1});

    setTimeout(() =>  this.setState({ stopSpin:true }), 4000);

    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 0.1,
        duration: 4000,
        easing: Easing.swing,
      }
    )
    .start(() => {
      if(!this.state.stopSpin){
        this.spin();
      }
    })
  }

  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '3600deg']
    });

    const opacity = this.opacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    });

    const rotateX = this.rotateXValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    });

    return (
      <Container>
          <Header style={styles.header}>
            <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{color: 'white', fontSize:35}} name="ios-arrow-back" className="angle-left"/>
            </Button>
            </Left>

            <Body style={styles.headerBody}>
                <Icon style={{color: 'white', fontSize:30}} name="ios-ionic" />
            </Body>

            <Right style={{flex:1}}>
                <Icon onPress={() => this.props.navigation.navigate('Trophy')} style={{color: 'white', fontSize:30}} name="ios-cart" />
            </Right>
          </Header>

          <Content style={styles.container}>
             <View style={styles.bg}>
               {/*
               <Image source={pointMarker} style={styles.pointMarker} />
               <Image source={background} style={styles.shadow} />
               */}
               <Animated.Image
                  style={{
                    width: 250,
                    height: 250,
                    transform: [{ rotate: spin }, { rotateX: rotateX }],
                    opacity,
                    }}
                    
                    //source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
                    source={background}
                />   
             </View>

            <Button success style={styles.btn} 
                    onPress={() => this.spin()}
                    disabled={this.state.spinRemain <= 0}>
              <Text style={styles.btnChild}>Spin</Text>
            </Button>
           
            <Text style={styles.subParagraph}>
                Spins Remaining:
            </Text>
            <Text style={styles.subParagraphLine2}>
                {this.state.spinRemain}
            </Text>
     
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
}

export default Spin;
