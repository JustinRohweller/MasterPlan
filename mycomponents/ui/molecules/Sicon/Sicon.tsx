import React from "react";
import Sbutton from "../Sbutton";
import { SbuttonProps } from "../Sbutton/Sbutton";

interface SiconProps extends SbuttonProps {
  iconComponent: React.ComponentType<any>;
  iconProps: any;
}

const Sicon = (props: SiconProps) => {
  const { iconComponent, onPress, ...otherProps } = props;
  const IconComponent = props.iconComponent;

  return (
    <Sbutton onPress={onPress} {...otherProps}>
      {/* @ts-ignore */}
      <IconComponent {...iconProps} />
    </Sbutton>
  );
};

export default Sicon;
