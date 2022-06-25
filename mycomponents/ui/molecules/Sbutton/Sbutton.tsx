import React from "react";
import { TouchableOpacity } from "react-native";
import { Sview } from "..";
import { getStandardProps, SviewProps } from "../Sview/Sview";

export interface SbuttonProps extends SviewProps {
  onPress?: () => void;
  buttonComponent?: any;
}

const Sbutton = (props: SbuttonProps) => {
  const { onPress, buttonComponent, children, ...otherProps } = props;

  let buttComponent = TouchableOpacity;
  if (buttonComponent) {
    buttComponent = buttonComponent;
  }

  const ButtonComponent = buttComponent;
  return (
    <ButtonComponent
      onPress={onPress}
      style={{
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
