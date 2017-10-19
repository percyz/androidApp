const React = require('react-native', 'native-base');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FBFAFA',
  },

  newheader: {
    backgroundColor: '#303030',
    justifyContent: 'center',
    //noShadow: false,
    shadowOffset: {
      heigth: 5,
    },
    shadowColor: '#25a000',
  },

  newheaderL: {
    flex: 1,
  },

  newheaderB: {
    flex: 1,
    flexDirection: 'row',
    //textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  headInnerContainer: {
    //flex:1,
    //marginTop: 40,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: '#fff',
    width:300,
    height:150,
  },

  headInnerContainerSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },

  socialButton: {
    flex: 1,
    marginTop: 55,
    //alignItems: 'right',
    //textAlign: 'right'
  },

  newheaderR: {
    flex: 1,
  },

  logo: {
    height: 40,
    width: 40
  }
};
