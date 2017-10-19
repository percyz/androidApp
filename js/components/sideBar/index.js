
import React, { Component } from 'react';
import { TouchableOpacity, Image, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, ListItem } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';

import styles from './style';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  async userLogout() {
    console.log('logout AsyncStorage error: ');
    try {
      await AsyncStorage.removeItem('intialEmail');
      this.props.closeDrawer();
      Actions.login({ type: ActionConst.RESET }); 
      //Alert.alert('Logout Success!');     
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    };
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        {/*
        <ListItem button onPress={() => { Actions.leaderBoard(); this.props.closeDrawer(); }} >
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.contactUs(); this.props.closeDrawer(); }} >
          <Text>Contact Us</Text>
        </ListItem>
        */}
        <ListItem button onPress={() => { Actions.profile(); this.props.closeDrawer(); }} >
          <Text>Your account</Text>
        </ListItem>

        <ListItem button transparent onPress={() => this.userLogout()} >
          <Text>Sign out</Text>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

export default connect(null, bindAction)(SideBar);
