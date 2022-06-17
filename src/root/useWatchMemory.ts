import { useEffect, useState } from "react";
import { AppState } from "react-native";

const useWatchMemory = (props: any) => {
  const [hasLowMemory, setHasLowMemory] = useState(false);

  const onLowMemory = async () => {
    setHasLowMemory(true);
    if (props.onLowMemory) {
      props.onLowMemory();
    }
  };

  useEffect(() => {
    const listener = AppState.addEventListener("memoryWarning", onLowMemory);

    return () => {
      listener.remove();
    };
  }, []);

  return [hasLowMemory];
};

export default useWatchMemory;
