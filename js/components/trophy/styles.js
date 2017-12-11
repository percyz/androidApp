//import styles from './styles';
GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

var titleNum = '';
var btnNum = '';
if(deviceHeight > 600){
  titleNum = 6;
  btnNum = 20;
}else {
  titleNum = 8;
  btnNum = 40;
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
    //backgroundColor: GLOBAL.COLOR.GREEN,
    backgroundColor: 'white'
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
  headerSegment: {
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderColor:'white',
    borderWidth: 2,
  },
  pointMarker: {
    marginTop: 30,
    marginBottom: -1,
    //flex: 1,
    //width: GLOBAL.WIDTH / 2.2,
    //height: GLOBAL.HEIGHT / 4,
    //alignItems: 'center'
  },
  shadow: {
    //marginTop: -15,
    marginBottom: 10,
    //flex: 1,
    width: GLOBAL.WIDTH / 2.2,
    height: GLOBAL.HEIGHT / 4,
    //alignItems: 'center',
    transform:[{rotate:'40 deg'}],
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    marginTop: GLOBAL.HEIGHT / 8,
    //paddingTop: 0,
    //paddingLeft: 10,
    //paddingRight: 10,
    //paddingBottom: 10,
    //bottom: 0,
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
    fontSize: GLOBAL.MEDIUM,
  },
  paragraphLine2: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: -3,
    color: 'white',
    fontSize: GLOBAL.MEDIUM,
  },
  subParagraph: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
    color: 'black',
    fontSize: GLOBAL.SMALL,
  },
  subParagraphLine2: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: -3,
    color: 'black',
    fontSize: GLOBAL.BIG,
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
    marginTop: GLOBAL.HEIGHT / btnNum,
    alignSelf: 'center',
    backgroundColor: GLOBAL.COLOR.GREEN,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 'auto',
    width: GLOBAL.WIDTH / 1.3
  },
  btnChild: {
    flex: 1,
    textAlign: 'center',
    color:'black',
  }
};
