const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

var btnNum = '';
if(deviceHeight > 600){
  btnNum = 7;
}else {
  btnNum = 8;
}

export default{
  container: {
    backgroundColor: '#FBFAFA',
    height: deviceHeight
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
  subContainer: {
    flexDirection:'column',
    flex: 1,
    backgroundColor: GLOBAL.COLOR.GRAY
  },
  subTitle:{
    alignItems:'center',
    flexDirection:'row',
    height: 35,
  },
  moreText: {
    alignItems:'center',
    flexDirection:'row',
    //height: 80,
  },
  gray: {
    marginRight: 'auto',
    padding: 5,
    marginLeft: 15,
  },
  items: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop:5,
  },
  reg: {
    flex:1,
    backgroundColor: 'white',
    marginBottom: 2,
    alignItems: 'flex-start'
  },
  newScan: {
    flex: 1,
    bottom: 40,
    //width: GLOBAL.WIDTH / 6,
    //height: GLOBAL.HEIGHT / 10,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: GLOBAL.HEIGHT / btnNum,
  },
  save: {
    width: GLOBAL.WIDTH,
    backgroundColor: GLOBAL.COLOR.BLUE
  }, 
  headerBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    flex: 1, 
    flexDirection: 'row',
    //alignContent: 'center',  
    justifyContent: 'center',
    //paddingBottom: 0,
    zIndex: 1,
  },
  mapContent: {
    flex: 1,
    flexDirection:'column',
    width: GLOBAL.WIDTH,
    height: GLOBAL.HEIGHT/1.4,
  },
  searchBar: {
    backgroundColor: GLOBAL.COLOR.GREEN, 
    zIndex:2,
  },
  searchBarName: {
     width: GLOBAL.WIDTH / 1.5,
     color: 'black',
  },
};
