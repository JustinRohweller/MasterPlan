import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { getStandardProps } from "../Sview/Sview";

type TouchableWithoutStyle = Omit<TouchableOpacityProps, "style">;

interface SbuttonProps extends TouchableWithoutStyle {
  iconLib: React.ComponentType;
  name: "string";
  size?: number;
  color?: string;
}

// TODO: have a look at old CustomIcon component.
// ie. pass in all the things.

const Sicon = (props: SbuttonProps) => {
  const IconLib = props.iconLib;
  // only onpress, style
  // can pass
  return (
    <TouchableOpacity onPress={props.onPress} {...getStandardProps(props)}>
      <IconLib {...props} />
    </TouchableOpacity>
  );
};

export default Sicon;
