import React from "react";
import { renderScreens } from "./helpers";

interface NavStructure {
  title: string;
  includeKey: string;
  navigator: any;
  props: any;
  contents: NavStructure | null;
}

interface NavigationCreator {
  screens: { [key: string]: any };
  navStructure: NavStructure;
}

const NavigationCreator = ({ screens, navStructure }: NavigationCreator) => {
  const createNavigator = (navigationStructure: any) => {
    const Nav = navigationStructure.navigator;

    const NavComponent = () => {
      return createNavigator(navigationStructure.contents);
    };

    return (
      <Nav.Navigator {...navigationStructure.props}>
        {navigationStructure.contents && (
          <Nav.Screen
            name={navigationStructure.title}
            component={NavComponent}
          />
        )}
        {Object.values(screens).map((item, index: number) =>
          renderScreens(
            item,
            index,
            Nav,
            navigationStructure.includeKey,
            screens
          )
        )}
      </Nav.Navigator>
    );
  };

  return createNavigator(navStructure);
};

export default NavigationCreator;

// example. tab within a stack.
// const navStructure = {
//   title: "Main",
//   includeKey: "shouldBeInTabs",
//   navigator: Tab,
//   props: {
//     backBehavior: "none",
//     tabBar: () => null,
//     screenOptions: {
//       unmountOnBlur: true,
//       headerShown: false,
//     },
//   },
//   contents: {
//     title: "Global Stack",
//     includeKey: "shouldBeInStack",
//     navigator: Stack,
//     props: {
//       screenOptions: {
//         headerShown: false,
//         animationEnabled: false,
//         detachPreviousScreen: false,
//       },
//     },
//     contents: null,
//   },
// };
