import { renderScreens } from "@jrohweller/mycomponents.ui.constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as navigators from "../../navigator";
import * as screens from "../../screens";

// TODO: DRY THIS MORE. ie. this and global stack are super simliar.
// maybe pass in an object of the type of navigation structure?
// ie.
// goal is just to say how the navigators are configured.
// maybe pass this in, and the screens?
const navigationStructure = {
  Switch: {
    Stack: {
      Drawer: true,
      Tabs: true,
    },
  },
};
const Tab = createBottomTabNavigator();

// const NavigationCreator = ({ screens, navStructure }) => {

// };

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
      {Object.values(navigators).map((item, index: number) =>
        renderScreens(item, index, Tab, "shouldBeInTabs", navigators)
      )}
      {Object.values(screens).map((item, index: number) =>
        renderScreens(item, index, Tab, "shouldBeInTabs", screens)
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;
