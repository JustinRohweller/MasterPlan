import { Text } from "dripsy";
import React, { ComponentType, useContext } from "react";
import { TextProps, TextStyle } from "react-native";
import { MoleculeThemeContext } from "..";
import { getTextStyleProps } from "./getTextStyleProps";

type StextTextProps = Omit<TextProps, "style">;

export interface StextProps extends TextStyle {
  children?: React.ReactNode;
  textProps?: StextTextProps;
  center?: boolean;
  textComponent?: ComponentType<any>;
}

const Stext = (props: StextProps): JSX.Element => {
  const { center, textComponent, children, textProps, ...otherProps } = props;
  const theme = useContext(MoleculeThemeContext);

  let newcomponent = Text;
  if (theme?.textComponent) {
    newcomponent = theme.textComponent;
  }

  if (textComponent) {
    // @ts-ignore
    newcomponent = textComponent;
  }

  const Newcomponent = newcomponent;

  return (
    <Newcomponent
      style={{ ...getTextStyleProps(props, otherProps, theme) }}
      {...textProps}
    >
      {/* @ts-ignore */}
      {props.children}
    </Newcomponent>
  );
};

Stext.defaultProps = {};

export default Stext;
