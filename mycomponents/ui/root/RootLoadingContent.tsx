import React, { useContext } from "react";
import RootAlertHelper from "./RootAlertHelper";
import { LoadingContext } from "./RootLoadingProvider";

interface RootLoadingContentProps {
  content: any;
}

const RootLoadingContent = ({ content }: RootLoadingContentProps) => {
  const loadingContext = useContext(LoadingContext);
  return <RootAlertHelper content={content} show={loadingContext.loading} />;
};

export default RootLoadingContent;
