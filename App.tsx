// import { makeTheme } from "dripsy";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MoleculeProvider, Spacer } from "./src/molecules";
// import { Spacer } from "./src/molecules";

// export const THEME = makeTheme({
//   // colors: COLORS,
//   // adding a lot of space options causes crash idk.
//   space: {
//     $0: 0,
//     $1: 1,
//     $3: 3,
//     $5: 5,
//     $7: 7,
//     $10: 10,
//     $20: 20,
//   },
//   radii: {
//     none: 0,
//     tiny: 2,
//     small: 4,
//     medium: 8,
//     large: 16,
//     xl: 23,
//     massive: 30,
//   },
//   types: {
//     onlyAllowThemeValues: "always",
//   },
//   fontSizes: {
//     $0: 12,
//     $1: 14,
//     $2: 16,
//     $3: 18,
//     $4: 24,
//     $5: 28,
//     $6: 32,
//   },
//   // customFonts: {
//   //   OpenSans: {
//   //     default: "OpenSans-Regular",
//   //     bold: "OpenSans-Bold",
//   //     italic: "OpenSans-Italic",
//   //     boldItalic: "OpenSans-BoldItalic",
//   //     extraBold: "OpenSans-ExtraBold",
//   //     extraBoldItalic: "OpenSans-ExtraBoldItalic",
//   //     light: "OpenSans-Light",
//   //     lightItalic: "OpenSans-LightItalic",
//   //     semiBold: "OpenSans-SemiBold",
//   //     semiBoldItalic: "OpenSans-SemiBoldItalic"
//   //   }
//   // },
//   // fonts: {
//   //   root: "OpenSans"
//   // },
//   sizes: {
//     width: {
//       "100%": "100%",
//       "90%": "90%",
//       "75%": "75%",
//       "50%": "50%",
//       "25%": "25%",
//       "10%": "10%",
//     },
//   },
// });

// FOR WHATEVER STUPID REASON: it requires two refreshes (ALL THE TIME?)
//  to show changes to empty react native view

// https://stackoverflow.com/questions/63788454/fast-refresh-in-react-native-always-fully-reload-the-app

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
