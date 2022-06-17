import React, { useContext, useEffect } from "react";
import { LoadingContext } from "./src/root/RootLoadingProvider";
// would be getting this from the lib.

interface ExampleLoadingOffProps {}

const ExampleLoadingOff = ({}: ExampleLoadingOffProps) => {
  const loading = useContext(LoadingContext);

  useEffect(() => {
    setTimeout(() => {
      loading.updateLoading(false);
    }, 2000);
  }, []);
  return <></>;
};

export default ExampleLoadingOff;
