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

// const navigatorScreens = Object.values(navigators).map((item, index: number) =>
//   renderScreens(item, index, Stack, "shouldBeInStack", navigators)
// );

const regularScreens = Object.values(screens).map((item, index: number) =>
  renderScreens(item, index, Stack, "shouldBeInStack", screens)
);

const screenOptions = {
  headerShown: false,
  animationEnabled: false,
  detachPreviousScreen: false,
};

const GlobalStackNavigator = ({ myNavigationProps }: any) => {
  return (
    // @ts-ignore
    <Stack.Navigator screenOptions={screenOptions} {...myNavigationProps}>
      {/* {navigatorScreens} */}
      {Object.values(screens).map((item, index: number) =>
        renderScreens(item, index, Stack, "shouldBeInStack", screens)
      )}
    </Stack.Navigator>
  );
};

export default GlobalStackNavigator;
