//Sview is a component that:
// renders a view/layout of
import React from "react";
import type { FlexAlignType, ViewProps } from "react-native";
import { View as RNView } from "react-native";

let View = RNView;
let Sx = null;
try {
  View = require("dripsy").View;
  Sx = require("dripsy").Sx;
} catch (error) {
  if (__DEV__) {
    console.info("dripsy is not installed");
  }
}
type SviewViewProps = Omit<ViewProps, "style">;

// can have all the style props + a viewprops that has viewprops.
export interface SviewProps extends Sx {
  center?: boolean;
  jStart?: boolean;
  jEnd?: boolean;
  jCenter?: boolean;
  aStart?: boolean;
  aEnd?: boolean;
  aCenter?: boolean;
  sCenter?: boolean;
  sStart?: boolean;
  sEnd?: boolean;
  viewProps?: SviewViewProps;
  children?: React.ReactNode;
  row?: boolean;
}

// TODO: I pretty much only use "center", the other ones maybe could be improved.
// idea: maybe make the properties that can be passed in properties of the object.
// could be interesting.
// IE. <Sview Sview.aStart />

export const getStandardProps = (props: any) => {
  let justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  let alignItems: FlexAlignType | undefined;
  let alignSelf: FlexAlignType | "auto" | undefined;
  let flexDirection: "row" | "column" | undefined;

  if (props.row) {
    flexDirection = "row";
  }

  if (props.center) {
    justifyContent = "center";
    alignItems = "center";
  }

  if (props.jStart) {
    justifyContent = "flex-start";
  }

  if (props.jEnd) {
    justifyContent = "flex-end";
  }

  if (props.jCenter) {
    justifyContent = "center";
  }

  if (props.aStart) {
    alignItems = "flex-start";
  }

  if (props.aEnd) {
    alignItems = "flex-end";
  }

  if (props.aCenter) {
    alignItems = "center";
  }

  if (props.sCenter) {
    alignSelf = "center";
  }

  if (props.sStart) {
    alignSelf = "flex-start";
  }

  if (props.sEnd) {
    alignSelf = "flex-end";
  }
  if (justifyContent || alignItems || alignSelf || flexDirection) {
    return { justifyContent, alignItems, alignSelf, flexDirection };
  }
  return {};
};

const Sview = (props: SviewProps): JSX.Element => {
  const { viewProps, children, ...otherProps } = props;

  // return (
  //   <View
  //     style={{
  //       backgroundColor: "transparent",
  //       ...getStandardProps(props),
  //       ...otherProps
  //     }}
  //     {...viewProps}
  //   >
  //     {children}
  //   </View>
  // );
  return (
    <View
      sx={{
        backgroundColor: "TRANSPARENT",
        ...getStandardProps(props),
        ...otherProps
      }}
      {...viewProps}
    >
      {children}
    </View>
  );
};

// https://medium.com/maxime-heckel/react-sub-components-513f6679abed

export default Sview;
