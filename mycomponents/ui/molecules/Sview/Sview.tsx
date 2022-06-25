//Sview is a component that:
// renders a view/layout of
import React, { ComponentType, ReactNode } from "react";
import type { FlexAlignType, ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";

type ViewPropsWithoutStyle = Omit<ViewProps, "style">;

// can have all the style props + a viewprops that has viewprops.
export interface SviewProps extends ViewStyle {
  center?: boolean;
  viewProps?: ViewPropsWithoutStyle;
  row?: boolean;
  viewComponent?: ComponentType<any>;
  children?: ReactNode;
}

// ideally we'd export from <Sview like a SviewComponentProvider? no a componentsettingsprovider
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
  const { viewProps, viewComponent, children, ...otherProps } = props;

  let newcomponent = View;
  if (viewComponent) {
    // @ts-ignore
    newcomponent = viewComponent;
  }

  const Newcomponent = newcomponent;
  // https://stackoverflow.com/questions/71852153/type-is-not-assignable-to-type-reactnode
  return (
    // @ts-ignore
    <Newcomponent
      style={{
        backgroundColor: "transparent",
        ...getStandardProps(props),
        ...otherProps,
      }}
      {...viewProps}
    >
      {children}
    </Newcomponent>
  );
};

export default Sview;
