
import React, { Component } from 'react';
import { View, Alert, WebView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Title, Content, Icon, Spinner, Body } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

var URL = 'https://www.geia.nz/resetpassword';

class ForgetPw extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
      super(props);
      this.state = {
          mapViewLoaded: false,
        }
  }


  render() {
    const { props: { name, index, list } } = this;
    console.log("this,state,view web",this.state.mapViewLoaded)

    return (
      <Container style={styles.container}>
      {/*
        <Content padder>
          <Text style={styles.title}>Password Reset</Text>
          <Text>To reset your password, enter the email address you use to sign in to Geia</Text>
           <Item>
             <Icon active name='mail' />
             <Input placeholder=''/>
           </Item>
           <Text> </Text>
           <Button block success onPress={() => Actions.home()} >
               <Text>Submit</Text>
           </Button>
        </Content>
        */}
      {!this.state.mapViewLoaded? <Spinner /> : null}
      <WebView
        source={{uri:URL}}
        //style={{marginTop: 0}}
        onLoad={() => this.setState({mapViewLoaded:true})}
        onLoadEnd={() => this.setState({mapViewLoaded:true})}
        //onLoadStart={() => this.setState({mapViewLoaded:true})}
      />
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


export default connect(mapStateToProps, bindAction)(ForgetPw);
