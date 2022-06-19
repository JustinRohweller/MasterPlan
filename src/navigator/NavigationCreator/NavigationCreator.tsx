import { renderScreens } from "@jrohweller/mycomponents.ui.constants";

interface NavigationCreator {
  screens: any;
  navStructure: any;
}

const NavigationCreator = ({ screens, navStructure }: any) => {
  const createNavigator = (navigationStructure: any) => {
    const Nav = navigationStructure.navigator;

    const NavComponent = () => {
      return createNavigator(navigationStructure.contents);
    };

    return (
      // @ts-ignore
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
