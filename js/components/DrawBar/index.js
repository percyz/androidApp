import React from "react";
import { AppRegistry, Image, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';
//const routes = ["Home", "BlankPage2","Profile","LeaderBoard","Scanner"];
const routes = ["Profile","Scanner","LeaderBoard"]

class DrawBar extends React.Component {

  static navigationOptions = {
    header: null
  };

  async userLogout() {
    console.log('logout AsyncStorage error: ');
    try {
      let keys = ['intialEmail','intialToken']
      await AsyncStorage.multiRemove(keys);
      AsyncStorage.multiGet(['intialEmail','intialToken']).then((asyncStore) => {
        console.log("login asyncStore[0][1]: ", asyncStore[0][1]);

      })
      //this.props.closeDrawer();
      //Actions.login({ type: ActionConst.RESET });
      Alert.alert('Logout Success!');
      this.props.navigation.navigate("Login");
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    };
  }
  render() {
    return (
      <Container>
        <Content>
          <Image
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("DrawerClose")}
            >
            </TouchableOpacity>
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
          <ListItem button transparent onPress={() => this.userLogout()} >
          <Text>Sign out</Text>
        </ListItem>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

export default connect(null, bindAction)(DrawBar);
