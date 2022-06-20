import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import RootAlertHelper from "./RootAlertHelper";

interface RootNoInternetProps {
  content: any;
}

const RootNoInternet = ({ content }: RootNoInternetProps) => {
  const netInfo = useNetInfo();
  return <RootAlertHelper content={content} show={!netInfo?.isConnected} />;
};

export default RootNoInternet;
