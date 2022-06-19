// Renders extras
// ie. stuff all the app can access: public.
// Perhaps rename to publicNavigator
// stacknav to random user profile
// stacknav to public winnings, ect.

// https://reactnavigation.org/docs/stack-navigator

// https://akveo.github.io/react-native-ui-kitten/docs/guides/configure-navigation#configure-navigation

import { renderScreens } from "@jrohweller/mycomponents.ui.constants";
import { createStackNavigator } from "@react-navigation/stack";
import * as screens from "../../screens";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  animationEnabled: false,
  detachPreviousScreen: false,
};

// const navigationStructure = {
//   name: "Switch",
//   props: { screenOptions },
//   contents: {
//     name: "Stack",
//     props: { screenOptions },
//     contents: {
//       name: "Drawer",
//       props: { screenOptions },
//       contents: {
//         name: "Tabs",
//         props: { screenOptions },
//         contents: null,
//       },
//     },
//   },
// };

const navStructure = {
  screenKey: "shouldBeInStack",
  navigator: Stack,
  props: { screenOptions },
  contents: null,
};

const GlobalStackNavigator = ({}: any) => {
  const createNavigator = (navigationStructure: any) => {
    const Nav = navigationStructure.navigator;

    return (
      // @ts-ignore
      <Nav.Navigator {...navigationStructure.props}>
        {navigationStructure.contents &&
          createNavigator(navigationStructure.contents)}
        {Object.values(screens).map((item, index: number) =>
          renderScreens(
            item,
            index,
            Nav,
            navigationStructure.screenKey,
            screens
          )
        )}
      </Nav.Navigator>
    );
  };

  return createNavigator(navStructure);
};

export default GlobalStackNavigator;
