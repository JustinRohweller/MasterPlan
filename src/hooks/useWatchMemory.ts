import { useEffect, useState } from "react";
import { AppState } from "react-native";
import FastImage from "react-native-fast-image";

const useWatchMemory = () => {
  const [hasLowMemory, setHasLowMemory] = useState(false);

  const onLowMemory = async () => {
    // idea: on screens that use a lot of memory:
    // cause a re-render when the memory is low. ie.
    // withLoading(hasLowMemory, <Content />)
    // and then maybe in withLoading, we put if isMounted.
    // as it turns out, we can clear memory without re-rendering entire screen,
    // is better to do that (ie. leave what we have.)
    await setHasLowMemory(true);

    const promises = [];
    promises.push(FastImage.clearDiskCache());
    promises.push(FastImage.clearMemoryCache());
    promises.push(setHasLowMemory(false));
    await Promise.all(promises);

    // info: I think having recyclerview within the flatlist is bad.
    // Because I think it means it mounts everything,
    // and the whole point is that we don't re-render so much.
    // ie. we should just use CustomHeaderedContainer as much as possible.
  };

  useEffect(() => {
    // INFO: we get memory warnings even when we aren't crashing.=
    // eh it still does a good job.
    AppState.addEventListener("memoryWarning", onLowMemory);

    // We want to be listening on every screen. But Context is the root (all except signup)
    // only unmounts when not on signup.
    return () => {
      AppState.removeEventListener("memoryWarning", onLowMemory);
    };
  }, []);

  return [hasLowMemory];
};

export default useWatchMemory;
