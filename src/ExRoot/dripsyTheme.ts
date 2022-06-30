import { makeTheme } from "dripsy";

export const THEME = makeTheme({
  // colors: COLORS,
  // adding a lot of space options causes crash idk.
  space: {
    $0: 0,
    $1: 1,
    $3: 3,
    $5: 5,
    $7: 7,
    $10: 10,
    $20: 20,
  },
  radii: {
    none: 0,
    tiny: 2,
    small: 4,
    medium: 8,
    large: 16,
    xl: 23,
    massive: 30,
  },
  types: {
    onlyAllowThemeValues: "always",
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32,
  },
  customFonts: {
    OpenSans: {
      default: "OpenSans-Regular",
      bold: "OpenSans-Bold",
      italic: "OpenSans-Italic",
      boldItalic: "OpenSans-BoldItalic",
      extraBold: "OpenSans-ExtraBold",
      extraBoldItalic: "OpenSans-ExtraBoldItalic",
      light: "OpenSans-Light",
      lightItalic: "OpenSans-LightItalic",
      semiBold: "OpenSans-SemiBold",
      semiBoldItalic: "OpenSans-SemiBoldItalic",
    },
  },
  fonts: {
    root: "OpenSans-Regular",
  },
  // sizes: {
  //   width: {
  //     "100%": "100%",
  //     "90%": "90%",
  //     "75%": "75%",
  //     "50%": "50%",
  //     "25%": "25%",
  //     "10%": "10%",
  //   },
  // },
});
type MyTheme = typeof THEME;
declare module "dripsy" {
  interface DripsyCustomTheme extends MyTheme {}
}
