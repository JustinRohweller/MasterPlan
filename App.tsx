// import { makeTheme } from "dripsy";
import React from "react";
import { StyleSheet } from "react-native";
import { MoleculeProvider, Spacer, Stext, Sview } from "./src/molecules";

// makeTHeme from dripsy forces double refresh.

// now spacer just straight up does not reload

const theme = { textColor: "#019123" };
const App = () => {
  return (
    <MoleculeProvider theme={theme}>
      <Sview flex={1} center>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Stext>Hi</Stext>
      </Sview>
    </MoleculeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
