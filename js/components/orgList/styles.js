const React = require('react-native');

const { StyleSheet } = React;

export default{
  container: {
    backgroundColor: '#FBFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  buttonlink: {
    height: 150,
  },
  card: {
    flex: 1,
    shadowColor:"#DD5144",
    zIndex:1
  },
  leftCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    zIndex: 1,
    //width: 30,
    marginLeft: 5,
    backgroundColor: 'transparent', 
    //backgroundColor: '#515150',
  },
  rightCard: {
    //width:80,
    //zIndex: 1,
  },
  upLeftcard: {
    flex: 1,
    fontSize: 16,
    //zIndex: 1,
    //fontWeight: 'bold'
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //color: 'transparent',
    backgroundColor: 'transparent',
    //backgroundColor: '#515150',
  },
  downCard:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  downLeftcard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    backgroundColor: 'transparent',
    //backgroundColor: 'red',
  },
  itemBackground: {
    flex: 1,
    //width: GLOBAL.WIDTH / 3.2,
    //height: GLOBAL.HEIGHT / 4.5,
    width: 150,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    marginTop: -5,
    marginRight: -10,
  },
  scoreFont: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 30,
    color: '#ffffff'
  },
  scoreFontSelf: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: -20,
    color: '#ffffff'
  }

};
