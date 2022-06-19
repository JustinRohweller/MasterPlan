import { renderScreens } from "@jrohweller/mycomponents.ui.constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as navigators from "../../navigator";
import * as screens from "../../screens";

const Tab = createBottomTabNavigator();

const navigatorScreens = Object.values(navigators).map((item, index: number) =>
  renderScreens(item, index, Tab, "shouldBeInTabs", navigators)
);

const regularScreens = Object.values(screens).map((item, index: number) =>
  renderScreens(item, index, Tab, "shouldBeInTabs", screens)
);

const MainNavigator = ({ myNavigationProps }: any) => {
  return (
    // @ts-ignore
    <Tab.Navigator
      backBehavior={"none"}
      tabBar={() => null}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
      {...myNavigationProps}
    >
      {navigatorScreens}
      {regularScreens}
    </Tab.Navigator>
  );
};

export default MainNavigator;
