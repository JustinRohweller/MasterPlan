import React from "react";
import Sbutton from "../Sbutton";
import { SbuttonProps } from "../Sbutton/Sbutton";

interface SiconProps extends SbuttonProps {
  iconComponent: React.ComponentType<any>;
  iconProps: any;
}

// Sicon is done, should be tested.

const Sicon = (props: SiconProps) => {
  const { iconComponent, iconProps, ...otherProps } = props;
  const IconComponent = props.iconComponent;

  return (
    <Sbutton {...otherProps}>
      {/* @ts-ignore */}
      <IconComponent {...iconProps} />
    </Sbutton>
  );
};

export default Sicon;
