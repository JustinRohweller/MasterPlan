//Stext is a component that:
//
import React from "react";
// could use regular react native one as well.
import { Text } from "react-native";
import type { TextProps, TextStyle, FlexAlignType } from "react-native";
import { COLORS, DEFAULT_FONT } from "../../constants";

type StextTextProps = Omit<TextProps, "style">;

export interface StextProps extends TextStyle {
  children?: React.ReactNode;
  textProps?: StextTextProps;
  center?: boolean;
}

export const getStyleProps = (props, otherProps) => {
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

  if (props.center) {
    justifyContent = "center";
    alignItems = "center";
    textAlign = "center";
  }
  if (justifyContent || alignItems || textAlign) {
    return {
      // THESE ARE DEFAULT PROPS YOU CAN ADD.
      fontFamily: DEFAULT_FONT, //TODO: have this be DEFAULT_FONT Proxima Nova
      fontWeight: undefined,
      textAlign,
      justifyContent,
      alignItems,
      backgroundColor: "transparent",
      color: COLORS.WHITE,
      ...otherProps
    };
  }
  return {
    // THESE ARE DEFAULT PROPS YOU CAN ADD.
    fontFamily: DEFAULT_FONT,
    fontWeight: undefined,
    backgroundColor: "transparent",
    color: COLORS.WHITE,
    ...otherProps
  };
};

// https://akveo.github.io/react-native-ui-kitten/docs/components/text/overview#text
const Stext = (props: StextProps): JSX.Element => {
  const { center, children, textProps, ...otherProps } = props;

  return (
    <Text style={{ ...getStyleProps(props, otherProps) }} {...textProps}>
      {children}
    </Text>
  );
};

Stext.defaultProps = {};

export default Stext;
