const React = require('react-native');
GLOBAL = require('../../globals');

const { StyleSheet } = React;

export default{
  container: {
    backgroundColor: '#FBFAFA',
  },

  backgroundImage: {
    width: GLOBAL.WIDTH / 1,
    height: GLOBAL.HEIGHT / 1.05,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 15,
    textAlign: 'center',
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
    height: GLOBAL.HEIGHT / 2.6,
  },
  buttonlink: {
    height: 150,
  },
  searchBoxLocation: {
    width: GLOBAL.WIDTH / 2.4,
  },
  searchBoxIndustry: {
    width: GLOBAL.WIDTH / 1.16,
  },
  searchBoxName: {
     width: GLOBAL.WIDTH / 1.5,
     color: 'black',
  },
  arrowDropdown: {
    paddingRight:30
  },
  autocompleteContainer: {
    flex: 1,
    //backgroundColor: 'white', 
    //height: 'auto',
    //left: 0,
    position: 'relative',
    //right: 0,
    //top: 0,
    zIndex: 1,
    paddingTop: 5,
  },
  autocompleteInputContainer: {
    backgroundColor: 'white'
  },
  itemText: {
    fontSize: 18,
    margin: 2
    //width: GLOBAL.WIDTH / 1.32,
  },
  searchBoxIndustryNew: {
    color: 'black',
    width: GLOBAL.WIDTH / 1.2,
  }
};
