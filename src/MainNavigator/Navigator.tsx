import { NavigationCreator } from "@jrohweller/mycomponents.ui.navigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// @ts-ignore
import * as screens from "../screens";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navStructure = {
  title: "Main",
  includeKey: "shouldBeInTabs",
  navigator: Tab,
  props: {
    backBehavior: "none",
    tabBar: () => null,
    screenOptions: {
      unmountOnBlur: true,
      headerShown: false,
    },
  },
  contents: {
    title: "Global Stack",
    includeKey: "shouldBeInStack",
    navigator: Stack,
    props: {
      screenOptions: {
        headerShown: false,
        animationEnabled: false,
        detachPreviousScreen: false,
      },
    },
    contents: null,
  },
};

const Navigator = ({}: any) => {
  return <NavigationCreator screens={screens} navStructure={navStructure} />;
};

export default Navigator;
