// import { makeTheme } from "dripsy";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MoleculeProvider, Spacer } from "./src/molecules";

// makeTHeme from dripsy forces double refresh.

const theme = { textColor: "#019123" };
const App = () => {
  return (
    // <DripsyProvider theme={THEME}>
    <View style={{ flex: 1, justifyContent: "center" }}>
      <MoleculeProvider theme={theme}>
        {/* <Sview flex={1} component={DView}> */}
        {/* <Sview height={300} /> */}
        {/* <View style={{ backgroundColor: "blue", height: 20, width: 20 }} /> */}
        {/* <Spacer backgroundColor={"orange"} height={500} width={500} /> */}
        <Spacer backgroundColor={"black"} />
        <Spacer backgroundColor={"black"} />
        <View style={{ backgroundColor: "blue" }}>
          <Text>Hi</Text>
        </View>
        {/* <Stext>
            Hif dak;ldfjk a;sdj f;aldajdk;j ;a;j;ja;;afdf;a;;d a;sdf
          </Stext> */}
      </MoleculeProvider>
      {/* </DripsyProvider> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
