import React from "react";
import { TouchableOpacity } from "react-native";
import { Sview } from "..";
import { SviewProps } from "../Sview/Sview";

export interface SbuttonProps extends SviewProps {
  onPress?: () => void;
  buttonComponent?: any;
}

const Sbutton = (props: SbuttonProps) => {
  const { onPress, buttonComponent, ...otherProps } = props;
  if (buttonComponent) {
    const ButtonComponent = buttonComponent;
    return (
      <ButtonComponent onPress={onPress}>
        <Sview {...otherProps} />
      </ButtonComponent>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Sview {...otherProps} />
    </TouchableOpacity>
  );
};

export default Sbutton;
