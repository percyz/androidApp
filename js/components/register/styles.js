//import styles from './styles';
GLOBAL = require('../../globals');
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

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
    height:30,
    justifyContent:'center',
    paddingLeft:8,
  },
  reg: {
    height:50,
    marginTop:20,
    backgroundColor: GLOBAL.COLOR.BLUE,
    borderRadius:0,
  },
  headerBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
