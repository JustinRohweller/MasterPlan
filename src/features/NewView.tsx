import { SxProp, View } from 'dripsy';
import React from 'react';
import { getStandardProps } from '../../mycomponents/ui/molecules/Sview/Sview';

type ViewType = typeof View;
type Props = ViewType & {
  contentContainerSx?: SxProp,
}

const NewView = ({}: Props) => {

  return (
    <View sx={{
      backgroundColor: "transparent",
      ...getStandardProps(props),
      ...otherProps,
    }}
  );
};

export default NewView;