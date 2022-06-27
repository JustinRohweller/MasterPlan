//Sview is a component that:
// renders a view/layout.
import { Sx, View } from "dripsy";
import React, { ComponentType, ReactNode } from "react";
import type { ViewProps } from "react-native";
import { getStandardProps } from "./standardProps";

type ViewPropsWithoutStyle = Omit<ViewProps, "style">;

export interface SviewProps extends Sx {
  center?: boolean;
  viewProps?: ViewPropsWithoutStyle;
  row?: boolean;
  viewComponent?: ComponentType<any>;
  children?: ReactNode;
}

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
