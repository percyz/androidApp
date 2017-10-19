import React, { Component } from 'react'; 
import { TouchableOpacity, Image, View, Modal, Linking, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Badge, Content, Text, Button, Icon, Body, 
         Left, Right, Title, Fab, Toast } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const background = require('../../../images/newlogo.png');

class NewHeader extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
      super(props);
      this.state = {
          modalVisible: false,
      };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    const { props: { name, index, list } } = this;

    return (
        <Header style={styles.newheader}>

        <Left style={styles.newheaderL}>
        <Button transparent onPress={this.props.openDrawer}>
          <Icon active name="menu" />
        </Button>
        </Left>

        <Body style={styles.newheaderB}>
        {/*
        <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
        <Button transparent onPress={() => Actions.login({ type: ActionConst.RESET })}>
          <Icon active name="power" />
        </Button> 
        */}
        <Button transparent onPress={() => Actions.scanner({ type: ActionConst.RESET })} >
            <Image source={background} style={styles.logo} />
            </Button>
        </Body>

        <Right style={styles.newheaderR}> 
        <Button transparent  onPress={() => {this.setModalVisible(!this.state.modalVisible)}}> 
            <Icon name="share" />
        </Button>
{/*
          <Button onPress={()=> Toast.show({
              text: 'Wrong password!',
              position: 'top',
              buttonText: 'Okay',
              type:'danger'
            })}>
            <Text>Toast</Text>
          </Button>
*/}
          <View>
          <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >

         <View style={styles.headContainer}>
         <View style={styles.headInnerContainer}>
 
            <View style={styles.headInnerContainerSocial}>
                <Button rounded style={{ backgroundColor: '#0077B5', width: 60, justifyContent:'center' }} onPress={() => Linking.openURL('https://www.linkedin.com/company/geia-ltd')}>
                    <Icon name="logo-linkedin" /> 
                </Button>
                <Text> </Text>
                <Button rounded style={{ backgroundColor: '#3b5998', width: 60, justifyContent:'center'}}   onPress={() => Linking.openURL('https://wwww.facebook.com/geia.ltd')}>
                    <Icon name="logo-facebook" />
                </Button>
                <Text> </Text>
                <Button rounded style={{ backgroundColor: '#0084b4', width: 60 ,justifyContent:'center' }} onPress={() => Linking.openURL('https://twitter.com/Geia_NZ')}>
                    <Icon name="logo-twitter" />
                </Button>
                <Text> </Text>
                <Button rounded style={{ backgroundColor: '#f7de00', width: 60, justifyContent:'center' }} onPress={() => Linking.openURL('https://www.geia.nz')}>
                    <Icon name="md-laptop" />
                </Button>
            </View>
            <View>
              <Text> </Text>
            <Button rounded 
                    style={{ backgroundColor: 'rgb(92, 184, 92)', width: 100, justifyContent:'center' }} 
                    onPress={() => {this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Close</Text> 
            </Button>
            </View>

         </View>   
        </View>  
        </Modal>
        </View>

        </Right>
        </Header>
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

export default connect(mapStateToProps, bindAction)(NewHeader);
