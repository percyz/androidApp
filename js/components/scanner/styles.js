GLOBAL = require('../../globals');

const React = require('react-native');
const { StyleSheet } = React;

export default{
  container: {
    backgroundColor: '#FBFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  newContent: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    //textAlign: 'center',
    backgroundColor: '#5998ff',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  preview: {
    //flex: 1,
    width: GLOBAL.WIDTH / 1.2,
    height: GLOBAL.HEIGHT / 1.9,
    //justifyContent: 'center', 
    //alignItems: 'center'
  },
  capture: {
    //flex: 1,
    //width:90,
    textAlign: 'center',
    backgroundColor: '#307fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 10
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};
