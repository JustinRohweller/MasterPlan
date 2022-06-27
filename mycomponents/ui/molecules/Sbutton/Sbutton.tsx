import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MoleculeThemeContext, Sview } from "..";
import { getStandardProps } from "../Sview/standardProps";
import { SviewProps } from "../Sview/Sview";

export interface SbuttonProps extends SviewProps {
  onPress?: () => void;
  buttonComponent?: any;
}
// Sbutton is done, should be tested.
const Sbutton = (props: SbuttonProps) => {
  const { onPress, buttonComponent, children, ...otherProps } = props;
  const theme = useContext(MoleculeThemeContext);

  let buttComponent = TouchableOpacity;
  if (theme?.buttonComponent) {
    // @ts-ignore
    imgComponent = theme.buttonComponent;
  }
  if (buttonComponent) {
    // @ts-ignore
    buttComponent = buttonComponent;
  }

  const ButtonComponent = buttComponent;
  return (
    <ButtonComponent
      onPress={onPress}
      style={{
        // @ts-ignore
        backgroundColor: "transparent",
        ...getStandardProps(props),
        ...otherProps,
      }}
    >
      <Sview {...otherProps}>{children}</Sview>
    </ButtonComponent>
  );
};

export default Sbutton;
