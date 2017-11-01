const React = require('react-native');
GLOBAL = require('../../globals');
const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
var titleNum = '';
var btnNum = '';
if(deviceHeight > 600){
  titleNum = 8;
  btnNum = 8;
}else {
  titleNum = 11;
  btnNum = 9;
}

export default{
  container: {
    backgroundColor: GLOBAL.COLOR.GRAY,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  header: {
    backgroundColor: GLOBAL.COLOR.GREEN
  },
  gray: {
    backgroundColor: GLOBAL.COLOR.GRAY,
    height: 30,
    alignItems: 'flex-start',
    padding: 5
  },
  reg: {
    flex:1,
    backgroundColor: 'white',
    marginBottom: 2,
    alignItems: 'center'
  },
  newScan: {
    flex: 1,
    //width: GLOBAL.WIDTH / 6,
    //height: GLOBAL.HEIGHT / 10,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: GLOBAL.HEIGHT / btnNum,
    //bottom:  GLOBAL.HEIGHT / 8,
  },
  save: {
    marginTop: 5,
    backgroundColor: GLOBAL.COLOR.BLUE,
    borderRadius:0,
    alignItems:'center',
    justifyContent:'center',
  },
  headerBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
