const React = require('react-native');
GLOBAL = require('../../globals');

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
  mapView: {
    flex: 1, 
    flexDirection: 'row',
    //alignContent: 'center', 
    justifyContent: 'center',
    paddingTop: 5
  },
  mapContent: {
    width: GLOBAL.WIDTH / 1.05,
    height: GLOBAL.HEIGHT / 2.2,
  },
  searchBoxLocation: {
    width: GLOBAL.WIDTH / 3.2,
  },
  searchBoxIndustry: {
    width: GLOBAL.WIDTH / 1.32,
  },
  autocompleteContainer: {
    flex: 1,
    //height: 'auto',
    //left: 0,
    position: 'relative',
    //right: 0,
    //top: 0,
    zIndex: 1,
    paddingTop: 5
  },
  autocompleteInputContainer: {
    backgroundColor: 'white'
  },
  itemText: {
    fontSize: 18,
    margin: 2
    //width: GLOBAL.WIDTH / 1.32,
  },
};
