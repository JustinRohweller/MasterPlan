//Stext is a component that:
//
import React from "react";
// could use regular react native one as well.
import { Text } from "react-native";
import type { TextProps, TextStyle, FlexAlignType } from "react-native";
import { COLORS, DEFAULT_FONT } from "../../constants";

// TODO: make component library with: https://github.com/callstack/react-theme-provider
// have default fonts with:
// https://github.com/react-native-training/react-native-fonts

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
  let DEFAULT_PROPS ={
    // THESE ARE DEFAULT PROPS YOU CAN ADD.
    fontFamily: DEFAULT_FONT,
    fontWeight: undefined,
    backgroundColor: "transparent",
    color: COLORS.WHITE,
    ...otherProps
  };
  if (justifyContent || alignItems || textAlign) {
    return {
      // THESE ARE DEFAULT PROPS YOU CAN ADD.
      textAlign,
      justifyContent,
      alignItems,
      ...DEFAULT_PROPS
    };
  }
  return DEFAULT_PROPS;
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
