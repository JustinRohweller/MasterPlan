// Renders extras
// ie. stuff all the app can access: public.
// Perhaps rename to publicNavigator
// stacknav to random user profile
// stacknav to public winnings, ect.

// https://reactnavigation.org/docs/stack-navigator

// https://akveo.github.io/react-native-ui-kitten/docs/guides/configure-navigation#configure-navigation

import { NavigationCreator } from "@jrohweller/mycomponents.ui.navigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as screens from "./src/screens";

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
