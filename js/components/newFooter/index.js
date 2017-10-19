
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Footer, FooterTab, Badge, Content, Text, Button, Icon, Body } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

class NewFooter extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  render() {

    const { props: { name, index, list } } = this;

    return (
        <Footer>
            <FooterTab style={styles.newfooter}>
                
                <Button onPress={() => Actions.scanner({ type: ActionConst.RESET })} >
                    <Icon name="camera" />
                    <Text>Scanner</Text>
                </Button>

                <Button onPress={() => Actions.leaderBoard()} >
                    <Icon name="apps" />
                    <Text>Leaderboard</Text> 
                </Button>
                {/*
                <Button badge vertical onPress={() => Actions.orgMap()}>
                  
                    <Badge ><Text>3</Text></Badge>
                    <Icon name="map" />
                    <Text>Map</Text>
                </Button>
               
                <Button onPress={() => Actions.orgMap({text:"map"})}>
                    <Icon name="map" />
                    <Text>Map</Text>
                </Button>
                 */}

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
