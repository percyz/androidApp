
import React, { Component } from 'react';
import { StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { Router, Scene, Reducer, Switch, Modal, Actions, ActionConst } from 'react-native-router-flux';
import { closeDrawer } from './actions/drawer';
import PropTypes from 'prop-types';
import Login from './components/login';
import Home from './components/home';
import Register from './components/register';
import Profile from './components/profile';
import Scanner from './components/scanner';
import OrgMap from './components/orgMap';
import OrgProfile from './components/orgProfile';
import EditUser from './components/editUser';
import ForgetPw from './components/forgetPw';
import ContactUs from './components/contactUs';
import LeaderBoard from './components/leaderBoard';
import BlankPage from './components/blankPage';
import SideBar from './components/sideBar';
import Tour from './components/tour';
import StepOne from './components/stepOne';
import StepTwo from './components/stepTwo';
import StepThree from './components/stepThree';
import StepFour from './components/stepFour';
import { statusBarColor } from './themes/base-theme';


const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  }


  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }


  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'contactUs':
          return <ContactUs />;
      case 'register':
          return <Register />;
      case 'profile':
          return <Profile />;
      case 'scanner':
          return <Scanner />;
      case 'orgMap':
          return <OrgMap />;
      case 'orgProfile':
          return <OrgProfile />;
      case 'editUser':
          return <EditUser />;
      case 'forgetPw':
          return <ForgetPw />;
      case 'leaderBoard':
          return <LeaderBoard />;
      case 'blankPage':
        return <BlankPage />;
      case 'tour':
          return <Tour />;
      case 'stepOne':
          return <StepOne />;
      case 'stepTwo':
          return <StepTwo />;
      case 'stepThree':
        return <StepThree />;
      case 'stepFour':
        return <StepFour />;
      default :
        return <Login />;
    }
  }

  render() {
    console.log("app navigator load");
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="default"
        />
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar />
            <Scene key="home" component={Home} />
            <Scene key="register" component={Register} />
            <Scene key="tour" component={Tour} hideNavBar initial/>
            <Scene key="stepOne" component={StepOne} />
            <Scene key="stepTwo" component={StepTwo} />
            <Scene key="stepThree" component={StepThree} />
            <Scene key="stepFour" component={StepFour} />
            <Scene key="profile" component={Profile}   
                onSelect={el => {
                    if (typeof Actions !== 'object') return;
                    const {
                      sceneKey,
                      statusBarStyle
                    } = el.props
                    StatusBar.setBarStyle("light-content", true)
                    Actions[sceneKey]()
                    }}/>
            <Scene key="scanner" component={Scanner} hideNavBar />
            <Scene key="orgMap" component={OrgMap} />
            <Scene key="orgProfile" component={OrgProfile} />
            <Scene key="editUser" component={EditUser} />
            <Scene key="forgetPw" component={ForgetPw} />
            <Scene key="contactUs" component={ContactUs} statusBarStyle="light-content" />
            <Scene key="leaderBoard" component={LeaderBoard} 
                   onSelect={() => {
                    StatusBar.setBarStyle("light-content", true)
                    }}/>
            <Scene key="blankPage" component={BlankPage} />
          </Scene>
        </RouterWithRedux>
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
//type={ActionConst.RESET}