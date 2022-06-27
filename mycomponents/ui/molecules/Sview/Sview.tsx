//Sview is a component that:
// renders a view/layout.
import { Sx, View } from "dripsy";
import React, { ComponentType, ReactNode } from "react";
import type { FlexAlignType, ViewProps } from "react-native";

type ViewPropsWithoutStyle = Omit<ViewProps, "style">;

export interface SviewProps extends Sx {
  center?: boolean;
  viewProps?: ViewPropsWithoutStyle;
  row?: boolean;
  viewComponent?: ComponentType<any>;
  children?: ReactNode;
}

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

  // https://stackoverflow.com/questions/71852153/type-is-not-assignable-to-type-reactnode
  return (
    // @ts-ignore
    <View
      // @ts-ignore
      sx={{
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
