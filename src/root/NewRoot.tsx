import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getLocalImages,
  ignoreSettingATimer,
} from "@jrohweller/mycomponents.ui.constants";
import {
  MoleculeProvider,
  Sbutton,
  Sicon,
  Simage,
  Spacer,
  Stext,
  Sview,
} from "@jrohweller/mycomponents.ui.molecules";
import { useFonts } from "expo-font";
import { TouchableHighlight } from "react-native";
import * as Fonts from "../assets/fonts";
import * as Images from "../assets/images";

export const APP_LOCAL_IMAGES = getLocalImages(Images);

ignoreSettingATimer.ignore();
// makeTHeme from dripsy forces double refresh.

const App = () => {
  const [loaded, error] = useFonts(Fonts);
  if (error || !loaded) {
    // return <Sview>{/* <Stext>Error</Stext> */}</Sview>;
    return null;
  }
  if (loaded) {
    const theme = {
      textColor: "#019123",
      fontFamily: "OpenSansBold",
    };
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
  }
};

export default App;
