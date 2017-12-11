import React, { Component } from "react";
import Login from "../components/login/";
import ProperLogin from "../components/properLogin/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import Register from "../components/register";
import Profile from "../components/editUser";
import HomeDrawerRouter from "./HomeDrawerRouter";
import NewFooter from "../components/newFooter";
import Scanner from "../components/scanner";
import LeaderBoard from "../components/leaderBoard";
//import orgProfile from "../components/orgProfile";
import StepOne from "../components/stepOne";
import StepTwo from "../components/stepTwo";
import StepThree from "../components/stepThree";
import Spin from "../components/spin";
import Terms from "../components/terms";
import UserPoints from "../components/userPoints";
import Tour from "../components/tour";
import StepFour from "../components/stepFour";
import OrgList from "../components/orgList";
import Trophy from "../components/trophy";
import { StackNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});

 // export const FeedStack = StackNavigator({
 //   //LeaderBoard: { screen: LeaderBoard },
 //   LeaderBoard: { screen: LeaderBoard },
 //   Scanner: { screen: Scanner }
 // });

export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Terms: { screen: Terms},
  UserPoints: { screen: UserPoints},
  //Tour pages
  StepOne: { screen: StepOne},
  StepTwo: { screen: StepTwo},
  StepThree: { screen: StepThree},
  StepFour: { screen: StepFour},
  Spin: { screen: Spin},
  Tour: { screen: Tour},
  //End fo tour pages
  ProperLogin: { screen: ProperLogin },
  Home: { screen: Home },
  //BlankPage: { screen: BlankPage },
  Register: { screen: Register },
  Profile: { screen: Profile },
  //LeaderBoard: {
    //    screen: (navigation) => <LeaderBoard {...navigation} />
    //},
  LeaderBoard: { screen: LeaderBoard},
  Scanner: { screen: Scanner},
  Trophy: { screen: Trophy},
  Footer: {
    screen: (navigation) => <Footer {...navigation} />
  },
  //Scanner: { screen: Scanner },
  //orgProfile: { screen: orgProfile },
  //OrgList: { screen: OrgList },
  //Profile: { screen: Profile }
}));
