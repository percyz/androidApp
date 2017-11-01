//import styles from './styles';
//GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: GLOBAL.WIDTH,
    height: GLOBAL.HEIGHT / 1.04,
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    marginTop: deviceHeight / 2,
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
  btn: {
    flex: 1,
    marginTop: 10,
    alignSelf: 'center',
    //backgroundColor: '#74ba00',
  },
};
