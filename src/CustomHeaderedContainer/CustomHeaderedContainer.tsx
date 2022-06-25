import { Sview } from "@jrohweller/mycomponents.ui.molecules";
import { SviewProps } from "@jrohweller/mycomponents.ui.molecules/dist/Sview/Sview";
import React from "react";
import CustomHeader from "./CustomHeader";

export interface CustomHeaderedContainerProps extends SviewProps {
  children?: React.ReactNode;
  title?: string;
  noHeader?: boolean;
  renderLeftAction?: () => React.ReactNode;
  renderRightAction?: () => React.ReactNode;
  header?: React.ReactNode;
  backgroundColor?: string;
  innerSviewProps?: SviewProps;
}

const CustomHeaderedContainer = (props: CustomHeaderedContainerProps) => {
  const {
    children,
    header,
    title,
    backgroundColor,
    innerSviewProps,
    ...otherProps
  } = props;

  if (props.noHeader) {
    return (
      <Sview backgroundColor={backgroundColor} flex={1} {...innerSviewProps}>
        {props.children}
      </Sview>
    );
  }
  return (
    <Sview backgroundColor={backgroundColor} flex={1} {...otherProps}>
      {header || <CustomHeader />}
      <Sview backgroundColor={backgroundColor} flex={1} {...innerSviewProps}>
        {children}
      </Sview>
    </Sview>
  );
};

export default CustomHeaderedContainer;
