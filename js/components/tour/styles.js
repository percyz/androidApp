//import styles from './styles';
GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

var titleNum = '';
var btnNum = '';
if(deviceHeight > 600){
  titleNum = 5;
  btnNum = 8;
}else {
  titleNum = 8;
  btnNum = 8;
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
  shadow: {
    marginTop: 20,
    marginBottom: 20,
    //flex: 1,
    //width: GLOBAL.WIDTH / 3,
    //height: GLOBAL.HEIGHT / 4,
    //alignItems: 'center'
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: deviceHeight / 2,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    bottom: 0,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginTop: GLOBAL.HEIGHT / titleNum,
  },
  paragraphTitle: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    color: 'white',
    fontSize: GLOBAL.BIG,
  },
  paragraph: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    color: 'white',
    fontSize:GLOBAL.BIG,
  },
  input: {
    flex: 1,
    marginBottom: 20,
  },
  forgetPw: {
    flex: 1,
    alignSelf: 'center',
    color: '#a5a5a5',
  },
  btnView: {
    marginTop: GLOBAL.HEIGHT / btnNum,
  },
  btn: {
    flex: 1,
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
