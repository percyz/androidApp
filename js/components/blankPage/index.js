
import React, { Component } from 'react';
import { View, Alert } from 'react-native'; 
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import BarcodeScanner from 'react-native-barcodescanner';
import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';

class BlankPage extends Component {

  static defaultProps = {
    text: true,
  }

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

   constructor(props) {
    super(props);

    this.state = {
      torchMode: 'on',
      cameraType: 'back',
    };
  }

    barcodeReceived(e) {
    if(e.data) {
        console.log('Barcode: ' + e.data);
        console.log('Type: ' + e.type);
        Alert.alert("Welcome to", e.data); 
        //Alert.alert('Welcome to'+e.data,[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
    }else{
      Alert.alert("Please try again");
    }
  }


  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
      
        <NewHeader />
        <Content padder>
                      {/*
          <Text>
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}
            This is first try!
          </Text>
           */}
          
          <Text>
            name is {this.props.name} 
            {'\n'}
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome index. . .'}
            {(!isNaN(name)) ? name : 'Create Something Awesome name. . .'}
            {'\n'} 
            This is first try!
          </Text>
          {/*
        <BarcodeScanner
            onBarCodeRead={this.barcodeReceived}
            style={{ width: 300, height: 300 }}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
        />
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


export default connect(mapStateToProps, bindAction)(BlankPage);
