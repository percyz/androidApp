import React, { Component } from 'react'; 
import { View, Alert, Linking } from 'react-native'; 
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Left, Right, Body, Spinner } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewFooter from '../newFooter';
import NewHeader from '../newHeader';
import styles from './styles';
import BarcodeScanner from 'react-native-barcodescanner';
//import Camera from 'react-native-camera'; 

const SCANINTERVAL = 2;

class Scanner extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }
 
  constructor(props){
    super(props);
    this.state = {
      cameraView: false,
      torchMode: 'off',
      cameraType: 'back',
      user: '',
      qrcode: '',
      codeArray: [],
      currentPoints: 0,
      cameraLoading: false
    }
  } 

  componentWillMount() {

    if(this.props.name != ''){
      console.log("props get value", this.props.name);
      this.setState({
            user: this.props.name, 
      });
    
    //POST 
      const u = encodeURIComponent(this.props.name);
      const requestBodyPoint = `user=${u}`; 
      console.log("requestBodyPoint info: ", requestBodyPoint);
      fetch("https://geia-app.herokuapp.com/scanner/points", {
              method: "POST",
              mode: "cors",
              headers: {
                  "Accept": "application/json",  
                  "Content-Type": "application/x-www-form-urlencoded"
                  //"Content-Type": "application/json"  
              },

              body: requestBodyPoint
      }).then((res) => {
              console.log("fetch request ", JSON.stringify(res.ok));
              if(res.ok){
                  res.json().then((json) => {
                      console.info(json);
                      console.info(json.points); 
                      if(json.points){
                        this.setState({
                            currentPoints: json.points,
                            //cameraView: true,
                        });               
                      }else{
                          Alert.alert("server is busying, try again later");
                      }
                  });
              }else{
          //Alert.alert("server is busying, try again later");
          console.log("server is busying, try again later");
        }
      })
      .catch(function(err){
        //Alert.alert("server is busying, try again later", err);
        console.log("server is busying, try again later", err);
      })
  }else{
    console.log("waiting props name");
  }
};

  componentDidMount() {
    //this.setState({cameraView:true}); 
    setTimeout(() => {this.setState({cameraView: true})}, 1000);
  }

  barcodeReceived = (e) => {  

    this.state.codeArray.push(e.data);
    if(this.props.name != ''){
      console.log("props get value");
      this.setState({
            user: this.props.name,
            qrcode: e.data,
      });
    };


    console.log("e.data3: ", this.state.codeArray.length);
    console.log("e.data4: ", this.state.qrcode);
    console.log("e.data5: ", this.state.user);

    // set waiting the leagth become to 15, make sure we got qrcode and user id
    //if(codeArray.length == 5 && this.state.qrcode !='' && !this.state.user !='') { 
      if(this.state.codeArray.length == SCANINTERVAL) {      
        console.log('Barcode: ' + e.data);
        console.log('Type: ' + e.type);
        //Alert.alert("Thank you for using Geia Rewards"); 
        this.sendAjax();
        //Actions.leaderBoard();     
    }else{
      //Alert.alert("Please try again"); 
    }
  };

 sendAjax = () => {

        const u = encodeURIComponent(this.state.user);
        const q = encodeURIComponent(this.state.qrcode);
        const requestBody = `user=${u}&qr=${q}`; 
        console.log("requestBody info: ", requestBody);
        //POST
        fetch("https://geia-app.herokuapp.com/scanner", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",  
                "Content-Type": "application/x-www-form-urlencoded"
                //"Content-Type": "application/json"
            },

            body: requestBody
        }).then((res, next) => {
            console.log("fetch request ", JSON.stringify(res.ok));
            if(res.ok){
                res.json().then((json) => {
                    console.info("json.verifystate1", json);
                    if(json.verifystate > 0){
                        Alert.alert("Thank you for using Geia Rewards");                      
                        newPoints = Number(this.state.currentPoints) + json.verifystate;                                  
                        this.setState({
                            currentPoints: newPoints,
                        });
                         
                    }else if(json.verifystate == 0){
                        Alert.alert("Please scan again after 10 mins");
                    }else{
                        Alert.alert("Invalid qr code!");
                    }
                });
            }else{
                Alert.alert('Noted','request failed',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]); 
                next();
            }
        })
        .then((res) => {
            setTimeout(() => {
              this.setState({codeArray: []});
               console.log("this.state.array: ", this.state.codeArray); 
            }, 5000); 
        })
        .catch(function (e) {
            console.log("fetch fail");
            Alert.alert('Noted','system error',[{text: 'confirm', onPress: () => console.log('OK Pressed!')},]);
        });
  }
/*
    componentDidMount(){
          //this.setState({cameraLoading:true});
        //setTimeout(() => {Alert.alert("load camera worked")}, 8000);
        setTimeout(() => {this.setState({
                          cameraLoading:true,
                          torchMode: 'off',
                          cameraType: 'back'
                        })}, 1000); 
        //setTimeout(() => {console.log("load camera worked")}, 8000);  
        //Actions.refresh(key="scanner");
        //Actions.scanner(type="reset");
  }
*/

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>

        <NewHeader />
        <Content padder>
          <Text style={styles.title}>Win Cash Prizes</Text>
          
          <Text style={styles.instructions} >
              Scan QR codes and collect Geia points to win. 
              {/*
              <Text style={{color:'#008910', fontWeight:'bold'}} onPress={() => Linking.openURL('https://www.geia.nz/Leaderboard')}> Click here </Text> 
              to see participating businesses or to find out more.
              */}
          </Text>

          <Text style={styles.instructions}>
          Your total points: <Text style={{fontWeight:'bold', color:'#5cb85c'}}> {this.state.currentPoints} </Text>
          </Text> 
         
          {/* <Text> </Text>
        {!this.state.cameraLoading ? <Spinner /> :  
          <BarcodeScanner
              onBarCodeRead={this.barcodeReceived}
              style={styles.preview}
              torchMode={this.state.torchMode}
              cameraType={this.state.cameraType}
          />
        }
        */}
        {!this.state.cameraView? <Spinner /> :
        <View style={styles.cameraPreview}>
          <BarcodeScanner
              onBarCodeRead={this.barcodeReceived}
              style={styles.preview}
              torchMode={this.state.torchMode}
              cameraType={this.state.cameraType}
          />
          </View>
        }
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

export default connect(mapStateToProps, bindAction)(Scanner);
