import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { getStandardProps } from "../Sview/Sview";

type TouchableWithoutStyle = Omit<TouchableOpacityProps, "style">;

interface SiconProps extends ViewStyle {
  iconComponent: React.ComponentType<any>;
  onPress?: () => void;
}

// TODO: have a look at old CustomIcon component.
// ie. pass in all the things.

const Sicon = (props: any) => {
  const { iconComponent, onPress, ...otherProps } = props;
  const IconComponent = props.iconComponent;
  // only onpress, style
  // can pass
  return (
    <TouchableOpacity onPress={onPress} {...getStandardProps(props)}>
      {/* @ts-ignore */}
      <IconComponent {...otherProps} />
    </TouchableOpacity>
  );
};

export default Sicon;
