//import styles from './styles';
GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

var shadowNum = '';
var bgNum = '';
var btnNum = '';
if(deviceHeight > 600){
  shadowNum = 20;
  bgNum = 60;
  btnNum = 12;
}else {
  shadowNum = 0;
  bgNum = 0;
  btnNum = 18;
}

export default {
  container: {
    flex: 1,
    flexDirection:'column',
    //alignItems:'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: GLOBAL.WIDTH,
    height: GLOBAL.HEIGHT,
    backgroundColor: GLOBAL.COLOR.GREEN,
  },
  header: {
    backgroundColor: GLOBAL.COLOR.GREEN
  },
  shadow: {
    marginTop: shadowNum,
    marginBottom: 20,
    margin: 'auto',
    //flex: 1,
    //width: GLOBAL.WIDTH / 2.55,
    //height: GLOBAL.HEIGHT / 4.5,
    //alignItems: 'center'
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    alignSelf:'center',
    marginTop: bgNum,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    bottom: 0,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  paragraph: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginBottom: 20,
    height:40,
    width: 220,
    backgroundColor:'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 'auto',
    color:'black',
  },
  forgetPw: {
    flex: 1,
    alignSelf: 'center',
    color: 'white',
  },
  btn: {
    flex: 1,
    marginTop: GLOBAL.HEIGHT / btnNum,
    alignSelf: 'center',
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 200
  },
  btnChild: {
    flex: 1,
    textAlign: 'center'
  }
};
