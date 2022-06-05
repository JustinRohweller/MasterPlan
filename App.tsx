import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  MoleculeProvider,
  Sbutton,
  Sicon,
  Simage,
  Spacer,
  Stext,
  Sview,
} from "@jrohweller/mycomponents.ui.molecules";
import { TouchableHighlight } from "react-native";
import { APP_LOCAL_IMAGES } from "./src/constants/images";
// makeTHeme from dripsy forces double refresh.

const theme = { textColor: "#019123" };
const App = () => {
  return (
    <MoleculeProvider theme={theme}>
      <Sview flex={1}>
        <Spacer />
        <Simage source={{ uri: APP_LOCAL_IMAGES.icon.uri }} />
        <Sbutton
          onPress={() => console.log("onPress")}
          center
          buttonComponent={TouchableHighlight}
        >
          <Stext>Hi</Stext>
        </Sbutton>
        <Sicon iconComponent={MaterialCommunityIcons} name="home" />
      </Sview>
    </MoleculeProvider>
  );
};

export default App;
