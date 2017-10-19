
import React, { Component } from 'react';
import { TouchableOpacity, Image, Linking, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right,
         Body, Card, CardItem, Input, InputGroup, Item } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';

class ContactUs extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  render() {

    const { props: { name, index, list } } = this;
    StatusBar.setBarStyle('light-content', true);

    return (
      <Container style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          //style={{height:300}}
        />
        <NewHeader />
        <Content padder>
        <Text style={styles.title}>Find Us</Text>
        <Card>
            <CardItem>
                <Text onPress={() => Linking.openURL('https://www.geia.nz')}>Our Website: https://wwww.geia.nz</Text>
            </CardItem>
        </Card>
        <Text></Text>

        <Text style={styles.title}>Contact Us</Text>
        <Text>If you can't find what you are looking or want to give
        us feedback? Use the form below.</Text>
        <Card>
            <CardItem>
                <Item regular>
                    <Input placeholder="Your Name" />
                </Item>
            </CardItem>

            <CardItem>
                <Item regular>
                    <Input placeholder="Your Email" />
                </Item>
            </CardItem>

            <CardItem>
                <Item regular>
                    <Input placeholder="Your Message" />
                </Item>
            </CardItem>
            <Button block primary onPress={() => Actions.home()}>
                <Text>Send</Text>
            </Button>
        </Card>
          {/*
          <Text>
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}
            This is first try!
          </Text>
          */}
        </Content>
        <NewFooter />
      </Container>
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


export default connect(mapStateToProps, bindAction)(ContactUs);
