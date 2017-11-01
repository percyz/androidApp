//import styles from './styles';
GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default{
  container: {
      flex: 1,
      //justifyContent: "center",
      //alignItems: "center",
      backgroundColor: "transparent",
      zIndex:2,
      //flexDirection: 'column'
  },
  shadow: {
    //flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 0,
    paddingBottom: 0,
    //width: GLOBAL.WIDTH / 6.8,
    //height: GLOBAL.HEIGHT / 12,
    //alignItems: 'center'
  },
  points: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    color: GLOBAL.COLOR.GREEN
  },
  fbscan: {
    flex: 1,
    width: GLOBAL.WIDTH / 7.65,
    height: GLOBAL.HEIGHT / 13.5,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  newScan: {
    flex: 1,
    width: GLOBAL.WIDTH / 6,
    height: GLOBAL.HEIGHT / 10,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    bottom: 0
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: deviceHeight / 1.5,
    //marginTop: 20,
    //marginBottom: 20,
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
  subParagraph: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
  },
  subView: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: deviceHeight,
  },
  subContainer: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "black",
  },
};
