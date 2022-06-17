import React, { useContext, useEffect } from "react";
import { LoadingContext } from "./src/root/RootLoadingProvider";

interface ExampleLoadingOffProps {}

const ExampleLoadingOff = ({}: ExampleLoadingOffProps) => {
  const loading = useContext(LoadingContext);

  useEffect(() => {
    setTimeout(() => {
      loading.updateLoading(false);
    }, 5000);
  }, []);
  return <></>;
};

export default ExampleLoadingOff;
