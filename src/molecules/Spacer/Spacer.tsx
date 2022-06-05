/* eslint-disable no-nested-ternary */
// Spacer is a component that:
//

import React from "react";
import { Dimensions } from "react-native";
import Sview from "../Sview/Sview";

const WINDOW = Dimensions.get("window");
const DEFAULT_HEIGHT = WINDOW.height * 0.025;
const DEFAULT_WIDTH = WINDOW.width * 0.025;
const DEFAULT_SMALL_WIDTH = WINDOW.width * 0.01;
const DEFAULT_SMALL_HEIGHT = WINDOW.height * 0.01;

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
          ? DEFAULT_SMALL_HEIGHT
          : props.height
          ? props.height
          : DEFAULT_PROPS.height
      }
      width={30}
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
          ? DEFAULT_SMALL_WIDTH
          : props.width
          ? props.width
          : DEFAULT_PROPS.width
      }
    />
  );
};

export default Spacer;
