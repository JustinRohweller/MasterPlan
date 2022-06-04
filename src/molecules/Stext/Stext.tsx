//Stext is a component that:
//
import React, { useContext } from "react";
import { FlexAlignType, Text, TextProps, TextStyle } from "react-native";
import { MoleculeThemeContext } from "..";
// import { COLORS, DEFAULT_FONT } from "../../constants";

// TODO: make component library with: https://github.com/callstack/react-theme-provider
// have default fonts with:
// https://github.com/react-native-training/react-native-fonts

type StextTextProps = Omit<TextProps, "style">;

export interface StextProps extends TextStyle {
  children?: React.ReactNode;
  textProps?: StextTextProps;
  center?: boolean;
}

export const getStyleProps = (props: any, otherProps: any) => {
  let justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  let alignItems: FlexAlignType | undefined;
  let textAlign = "auto" as "auto" | "left" | "right" | "center";

  const theme = useContext(MoleculeThemeContext);

  if (props.center) {
    justifyContent = "center";
    alignItems = "center";
    textAlign = "center";
  }
  let DEFAULT_PROPS = {
    // THESE ARE DEFAULT PROPS YOU CAN ADD.
    fontFamily: theme?.fontFamily || undefined,
    fontWeight: undefined,
    backgroundColor: "transparent",
    color: theme?.textColor || undefined,
    ...otherProps,
  };

  console.log("default", DEFAULT_PROPS);
  if (justifyContent || alignItems || textAlign) {
    return {
      // THESE ARE DEFAULT PROPS YOU CAN ADD.
      textAlign,
      justifyContent,
      alignItems,
      ...DEFAULT_PROPS,
    };
  }
  return DEFAULT_PROPS;
};

// https://akveo.github.io/react-native-ui-kitten/docs/components/text/overview#text
const Stext = (props: StextProps): JSX.Element => {
  const { center, children, textProps, ...otherProps } = props;

  console.log(getStyleProps(props, otherProps));

  return (
    <Text style={{ ...getStyleProps(props, otherProps) }} {...textProps}>
      {props.children}
    </Text>
  );
};

Stext.defaultProps = {};

export default Stext;
