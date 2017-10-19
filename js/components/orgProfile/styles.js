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
  contentHeader: {
    flex: 1,
    flexDirection: 'row',
    //textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentHeaderRight: {
    flex: 1,
    flexDirection: 'column',
    //textAlign: 'center',
    alignItems: 'center'
    //justifyContent: 'centert',
  },
  contentBody: {
    flex: 1,
    flexDirection: 'column',
    //textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  mapView: {
    flex: 1, 
    flexDirection: 'row',
    //alignContent: 'center', 
    justifyContent: 'center',
    paddingTop: 5
  },
  mapContent: {
    width: GLOBAL.WIDTH / 1.1,
    height: GLOBAL.HEIGHT / 2.5,
  },
};
