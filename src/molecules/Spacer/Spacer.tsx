/* eslint-disable no-nested-ternary */
// Spacer is a component that:
//

import React from "react";
import Sview from "../Sview/Sview";
import { PERCENTS } from "../../constants";

const DEFAULT_HEIGHT = PERCENTS.HEIGHT[2.5];
const DEFAULT_WIDTH = PERCENTS.WIDTH[2.5];

interface SpacerProps {
  height?: number;
  width?: number;
  small?: boolean;
}

const DEFAULT_PROPS = {
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
};

const Spacer = (props: SpacerProps): JSX.Element => {
  return (
    <Sview
      backgroundColor={"TRANSPARENT"}
      {...props}
      height={
        props.small
          ? PERCENTS.HEIGHT[1]
          : props.height
          ? props.height
          : DEFAULT_PROPS.height
      }
    />
  );
};

Spacer.W = (props: SpacerProps): JSX.Element => {
  return (
    <Sview
      backgroundColor={"TRANSPARENT"}
      {...props}
      width={
        props.small
          ? PERCENTS.WIDTH[1]
          : props.width
          ? props.width
          : DEFAULT_PROPS.width
      }
    />
  );
};

export default Spacer;
