//Stext is a component that:
//
import { Text } from "dripsy";
import React, { ComponentType, useContext } from "react";
import { FlexAlignType, TextProps, TextStyle } from "react-native";
import { MoleculeThemeContext } from "..";

type StextTextProps = Omit<TextProps, "style">;

export interface StextProps extends TextStyle {
  children?: React.ReactNode;
  textProps?: StextTextProps;
  center?: boolean;
  textComponent?: ComponentType<any>;
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

  // This is working, but shouldn't be done?
  const theme = useContext(MoleculeThemeContext);

  if (props.center) {
    justifyContent = "center";
    alignItems = "center";
    textAlign = "center";
  }
  let DEFAULT_PROPS = {
    fontFamily: theme?.fontFamily || undefined,
    fontWeight: undefined,
    backgroundColor: "transparent",
    color: theme?.textColor || undefined,
    ...otherProps,
  };

  if (justifyContent || alignItems || textAlign) {
    return {
      textAlign,
      justifyContent,
      alignItems,
      ...DEFAULT_PROPS,
    };
  }
  return DEFAULT_PROPS;
};

// do dripsy shit.

// https://akveo.github.io/react-native-ui-kitten/docs/components/text/overview#text
const Stext = (props: StextProps): JSX.Element => {
  const { center, textComponent, children, textProps, ...otherProps } = props;

  let newcomponent = Text;
  if (textComponent) {
    // @ts-ignore
    newcomponent = textComponent;
  }

  const Newcomponent = newcomponent;

  return (
    <Newcomponent
      style={{ ...getStyleProps(props, otherProps) }}
      {...textProps}
    >
      {/* @ts-ignore */}
      {props.children}
    </Newcomponent>
  );
};

Stext.defaultProps = {};

export default Stext;
