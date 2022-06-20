import React from "react";

interface RootAlertHelperProps {
  content: any;
  show: boolean;
}

const RootAlertHelper = ({ show, content }: RootAlertHelperProps) => {
  if (content) {
    const Content = content;
    if (show) {
      return <Content />;
    }
  }
  return null;
};

export default RootAlertHelper;
