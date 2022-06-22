import { Sview } from "@jrohweller/mycomponents.ui.molecules";
import { SviewProps } from "@jrohweller/mycomponents.ui.molecules/dist/Sview/Sview";
import React from "react";

export interface CustomHeaderedContainerProps extends SviewProps {
  children?: React.ReactNode;
  title?: string;
  noHeader?: boolean;
  renderLeftAction?: () => React.ReactNode;
  renderRightAction?: () => React.ReactNode;
  header?: React.ReactNode;
  backgroundColor: string;
}

const CustomHeaderedContainer = (props: CustomHeaderedContainerProps) => {
  const { children, header, title, backgroundColor, ...otherProps } = props;

  if (props.noHeader) {
    return (
      <Sview backgroundColor={backgroundColor} flex={1}>
        {props.children}
      </Sview>
    );
  }
  return (
    <Sview backgroundColor={backgroundColor} flex={1} {...otherProps}>
      {header}
      <Sview backgroundColor={backgroundColor} flex={1}>
        {children}
      </Sview>
    </Sview>
  );
};

export default CustomHeaderedContainer;
