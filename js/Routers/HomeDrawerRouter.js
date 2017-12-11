import React, { Component } from "react";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import Register from '../components/register';
import { DrawerNavigator } from "react-navigation";
import DrawBar from "../components/DrawBar";
import NewFooter from "../components/newFooter";
import LeaderBoard from "../components/leaderBoard";
import Scanner from "../components/scanner";
import Profile from "../components/editUser";
//import orgProfile from "../components/orgProfile";
import OrgList from "../components/orgList";
export default (DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    //BlankPage2: { screen: BlankPage2 },
    Register: { screen: Register },
    Profile: { screen: Profile },
    LeaderBoard: { screen: LeaderBoard },
    NewFooter: { screen: NewFooter },
    Scanner: { screen: Scanner },
    //orgProfile: { screen: orgProfile },
    OrgList: { screen: OrgList }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
));
