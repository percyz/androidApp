
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
//import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Footer, FooterTab, Badge, Content, Text, Button, Icon, Body, View, Right, Left } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';
//import { Tabs } from "../../Routers/FooterRoute";

class NewFooter extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  leaderBoard(){
    alert("leaderboard called");
    this.props.navigation.navigate("Leaderboard")
  }

  scanner(){
    alert("scanner called");
  }

  render() {

    const { props: { name, index, list } } = this;

    return (
        <Footer>
            <FooterTab style={styles.newfooter}>
                <Button onPress={() => this.props.navigate(this.props.destinationLeaderboard)} >
                    <Icon name="ios-apps" />
                    <Text>Leaderboard</Text>
                </Button>
                <Button onPress={() => this.props.navigate(this.props.destinationProfile)} >
                    <Icon name="ios-home" />
                    <Text>Home</Text>
                </Button>
                <Button onPress={() => this.props.navigate(this.props.destinationScanner)} >
                    <Icon name="ios-camera" />
                    <Text>Scanner</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(NewFooter);
