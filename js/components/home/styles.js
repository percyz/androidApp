
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  shadow: {
    flex: 1,
    width: GLOBAL.WIDTH,
    height: GLOBAL.HEIGHT / 0.8,
    /* was 1.04 */
  },
  bg: {
    flex: 1,
    flexDirection: 'column',
    marginTop: deviceHeight / 1.5,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    bottom: 0,
  },
  paragraph: {
    flex: 2,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
};
