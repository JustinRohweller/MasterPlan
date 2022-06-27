import { Sx, Text } from "dripsy";
import React, { ComponentType, useContext } from "react";
import { TextProps } from "react-native";
import { MoleculeThemeContext } from "..";
import { getTextStyleProps } from "./getTextStyleProps";

// stext is complete, needs testing.

type StextTextProps = Omit<TextProps, "style">;

export interface StextProps extends Sx {
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
