import { renderScreens } from "@jrohweller/mycomponents.ui.constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as navigators from "../../navigator";
import * as screens from "../../screens";

// TODO: DRY THIS MORE. ie. this and global stack are super simliar.
// maybe pass in an object of the type of navigation structure?
// ie.

// goal is just to say how the navigators are configured.

// name of screen, navigator it belongs to
// const navigationStructure = {
//   auth: {
//     login: "Switch",
//     signUp: "Switch",
//     globalStack: {
//       drawerNav: {

//       }
//       profileDetails: "Stack"
//       tabs: {
//         home: "Tab",
//         profile: "Tab",
//         settings: "Tab",
//       },
//     },
//   },
// };

const navigationStructure2 = {
  Switch: {
    Stack: {
      Drawer: true,
      Tabs: true,
    },
  },
};
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
