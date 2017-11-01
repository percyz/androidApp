
import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
//import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Thumbnail,
         Left, Right, Body, Item, Input, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const greenFlags = require('../../../images/greenFlags.png');
const blueFlags = require('../../../images/blueFlags.png');
const blackFlags = require('../../../images/blackFlags.png');

const starIcon = (<Icon name="star" size={30} color='#f4f400' />);
const validIcon = (<Icon name="check-circle" size={25} color='#0060f4' />);
const rewardsIcon = (<Icon name="gift" size={25} color='#5cb85c' />);
const paperclipIcon = (<Icon name="paperclip"size={25} color='#838383' />);
const arrowIcon = (<Icon name="arrow-circle-right" size={25} color='#838383' />);

class OrgList extends Component {

  constructor(props) {
      super(props);
      this.state = {
          viewLoaded: false,
          orgInfo: [],
      };
    }

    _onPress = (item) => {
        console.log("on Press item working", item);
        //console.log("Nav State:",this.props.navigation.state);
        //this.props.navigation.navigate("Profile");
        //Actions.orgProfile({"id":this.props.id});
    }

    renderBackgroundImage = () => {
        if(this.props.authstatus == 'champ'){
            return(
                <Image source={greenFlags} style={styles.itemBackground}>

                    <Text style={styles.scoreFont}>{this.props.scores}</Text>
                </Image>
            )
        }else if(this.props.authstatus == 'valid'){
            return(
                <Image source={blueFlags} style={styles.itemBackground}>
                    <Text style={styles.scoreFont}>{this.props.scores}</Text>
                </Image>
            )
        }else{
            return(
                <Image source={blackFlags} style={styles.itemBackground}>
                    <Text style={styles.scoreFontSelf}>        Self {'\n'}   Assessed</Text>
                </Image>
            )
        }
    }

    renderStats = () => {
        if(this.props.stars == '3'){
            return (
            <Text>
                {starIcon}
                {starIcon}
                {starIcon}
            </Text>
            )
        }else if(this.props.stars == '2'){
            return(
            <Text>
                {starIcon}
                {starIcon}
            </Text>
            )
        }else if(this.props.stars == '1'){
            return(
            <Text>
                {starIcon}
            </Text>
            )
        }else{
            return null;
        }
    }

    rendervalidated = () => {
        if(this.props.validated == true){
            return (
            <Text>
                {validIcon}
            </Text>
            )
        }else{
            return null;
        }
    }

    renderrewards = () => {
        if(this.props.rewards == true){
            return (
            <Text>
                {rewardsIcon}
            </Text>
            )
        }else{
            return null;
        }
    }

    render(){
      console.log("Checking...",this.props);
        return(

        <View>
            <Card style={styles.card}>

                <CardItem>
                    <Image source={{uri:this.props.logo}} style={{width:50, height:50}}/>
                    <Body style={styles.leftCard}>
                        <Text style={styles.upLeftcard}>{this.props.orgName}</Text>
                        <Text style={styles.downLeftcard}>
                        {this.rendervalidated()}
                        <Text> </Text>
                        {this.renderStats()}

                        {this.renderrewards()}
                        </Text>
                     </Body>

                    <Right style={styles.rightCard}>
                        {this.renderBackgroundImage()}
                    </Right>
                </CardItem>

                <CardItem>
                    <Left>
                       {paperclipIcon}
                    <View >
                    <Text note >{this.props.city}</Text>
                    {/* <Icon active name="briefcase" /> <Icon active name="flag" />  forward*/}
                    <Text note >{this.props.industry}</Text>
                    </View>
                    </Left>

                    {/*<TouchableOpacity onPress={() => this.props.navigate(this.props.destination, {id: this.props.id})} >
                    <View>
                    <Right>
                        {arrowIcon}
                    </Right>
                    </View>
                    </TouchableOpacity>*/}
                </CardItem>

            </Card>
        </View>

        )
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

export default connect(mapStateToProps, bindAction)(OrgList);
