
import React, { Component } from 'react';
import { TouchableOpacity, Image, Linking} from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Fab, Badge, Title, Content, Text, Button, Icon,
         Left, Body, Right, Card } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';

class Home extends Component {

  constructor() {
      super();
      this.state = {
          active: false,
      };
  }

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  render() {
    return (
      <Container style={styles.container}>

        <NewHeader />
        <Fab
          active={this.state.active} 
          direction="down"
          containerStyle={{ marginTop: 10 }}
          style={{ backgroundColor: '#5067FF'}}
          position="topRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="share" />
          <Button style={{ backgroundColor: '#DD5144' }} onPress={() => Linking.openURL('https://www.linkedin.com/company/geia-ltd')}>
              <Icon name="logo-linkedin" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}   onPress={() => Linking.openURL('https://wwww.facebook.com/geia.ltd')}>
              <Icon name="logo-facebook" />
          </Button>
          <Button disabled style={{ backgroundColor: '#34A34F' }} onPress={() => Linking.openURL('https://twitter.com/Geia_NZ')}>
              <Icon name="logo-twitter" />
          </Button>
        </Fab>

        <Content padder>
  {/*
          <Grid style={styles.mt}>
            {this.props.list.map((item, i) =>
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => this.newPage(i)}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            )}
          </Grid>


          <Card style={{height:450}}>


          </Card>
*/}
        </Content>

        <NewFooter />

      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(Home);
