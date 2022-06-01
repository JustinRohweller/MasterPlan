//Sview is a component that:
// renders a view/layout of
import React, { ReactNode } from "react";
import type { FlexAlignType, ViewProps } from "react-native";
import { View } from "react-native";

type ViewPropsWithoutStyle = Omit<ViewProps, "style">;

// can have all the style props + a viewprops that has viewprops.
export interface SviewProps extends ViewProps {
  center?: boolean;
  viewProps?: ViewPropsWithoutStyle;
  row?: boolean;
  component?: ReactNode;
}

// TODO: ideally we'd export from <Sview like a SviewComponentProvider
// and then Sview would have a hook?
// eh, just make a component if you want something else that bad.

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

  if (justifyContent || alignItems || alignSelf || flexDirection) {
    return { justifyContent, alignItems, alignSelf, flexDirection };
  }
  return {};
};

const Sview = (props: SviewProps): JSX.Element => {
  const { viewProps, children, ...otherProps } = props;

  if (props.component) {
    const Component = props.component;
    return (
      // @ts-ignore
      <Component
        style={{
          backgroundColor: "transparent",
          ...getStandardProps(props),
          ...otherProps,
        }}
        {...viewProps}
      >
        {children}
      </Component>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "transparent",
        ...getStandardProps(props),
        ...otherProps,
      }}
      {...viewProps}
    >
      {children}
    </View>
  );
};

export default Sview;
