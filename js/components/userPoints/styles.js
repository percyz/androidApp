//import styles from './styles';
GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

var subParagraphNum = '';
var btnNum = '';
if(deviceHeight > 600){
  subParagraphNum = 40;
  btnNum = 5;
}else {
  subParagraphNum = 10;
  btnNum = 8;
}

export default{
  container: {
      flex: 1,
      //justifyContent: "center",
      //alignItems: "center",
      backgroundColor: "transparent",
      zIndex:2,
      //flexDirection: 'column'
  },
  header: {
    backgroundColor: GLOBAL.COLOR.GREEN
  },
  headerBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    //flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: GLOBAL.HEIGHT / 13.5,
    marginBottom: 0,
    paddingBottom: 0,

    //width: GLOBAL.WIDTH / 2.55,
    //height: GLOBAL.HEIGHT / 4.5,
    //alignItems: 'center'
  },
  points: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    color: GLOBAL.COLOR.GREEN,
    fontSize:40,
  },
  fbButton: {
    flex: 1,
    width: GLOBAL.WIDTH / 7.65,
    height: GLOBAL.HEIGHT / 13.5,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:20,
  },
  scannerButton: {
    flex: 1,
    //width: GLOBAL.WIDTH / 7.65,
    //height: GLOBAL.HEIGHT / 13.5,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: GLOBAL.HEIGHT / 8,
  },
  newScan: {
    flex: 1,
    //width: GLOBAL.WIDTH / 6,
    //height: GLOBAL.HEIGHT / 10,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: GLOBAL.HEIGHT / btnNum,
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 25,
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
  subParagraphView:{
    marginTop: subParagraphNum,
    //textAlign: 'center',
    alignItems: 'center',
  },
  subParagraph: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize:20,
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
      flexDirection:'column',
      //justifyContent: "space-between",
      //alignItems: "center",
      backgroundColor: "black",
  },
};
