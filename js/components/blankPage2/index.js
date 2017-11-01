import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  View,
  Right,
  Body
} from "native-base";
import NewFooter from '../newFooter'

class BlankPage2 extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    //console.log(this.props.navigation, "1111111");
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Blank page</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Text>
            Create Something Awesome-ish ..
          </Text>
        </Content>
        <NewFooter
          navigate={this.props.navigation.navigate}
          destinationLeaderboard="LeaderBoard"
          destinationScanner="Scanner"
        />
      </Container>
    );
  }
}

export default BlankPage2;
