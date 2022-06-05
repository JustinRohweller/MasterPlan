import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableHighlight } from "react-native";
import {
  MoleculeProvider,
  Sicon,
  Simage,
  Spacer,
  Stext,
  Sview,
} from "./src/molecules";
import Sbutton from "./src/molecules/Sbutton";

// makeTHeme from dripsy forces double refresh.

const theme = { textColor: "#019123" };
const App = () => {
  return (
    <MoleculeProvider theme={theme}>
      <Sview flex={1}>
        <Spacer />
        <Simage source={{ uri: "https://picsum.photos/200" }} />
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
