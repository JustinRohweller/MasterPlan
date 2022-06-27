/* eslint-disable no-nested-ternary */
import React from "react";
import { Dimensions } from "react-native";
import Sview, { SviewProps } from "../Sview/Sview";

const WINDOW = Dimensions.get("window");
const DEFAULT_HEIGHT = WINDOW.height * 0.025;
const DEFAULT_WIDTH = WINDOW.width * 0.025;
const DEFAULT_SMALL_WIDTH = WINDOW.width * 0.01;
const DEFAULT_SMALL_HEIGHT = WINDOW.height * 0.01;

interface SpacerProps extends SviewProps {
  height?: number;
  width?: number;
  small?: boolean;
}

const DEFAULT_PROPS = {
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WIDTH,
};

const Col = (props: SpacerProps): JSX.Element => {
  return (
    <Sview
      // @ts-ignore
      backgroundColor={"transparent"}
      {...props}
      // @ts-ignore
      height={
        props.small
          ? DEFAULT_SMALL_HEIGHT
          : props.height
          ? props.height
          : DEFAULT_PROPS.height
      }
      // @ts-ignore
      width={DEFAULT_SMALL_WIDTH}
    />
  );
};

const Row = (props: SpacerProps): JSX.Element => {
  return (
    <Sview
      backgroundColor={"transparent"}
      {...props}
      // @ts-ignore
      width={
        props.small
          ? DEFAULT_SMALL_WIDTH
          : props.width
          ? props.width
          : DEFAULT_PROPS.width
      }
      height={DEFAULT_SMALL_HEIGHT}
    />
  );
};

const Spacer = (props: SpacerProps): JSX.Element => {
  if (props.row) {
    const { row, ...otherProps } = props;
    return <Row {...otherProps} />;
  }
  return <Col {...props} />;
};

export default Spacer;
