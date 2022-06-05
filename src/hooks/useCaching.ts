import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { APP_LOCAL_FONTS, APP_LOCAL_IMAGES } from "../constants";
//prefetch images
// If you know you're importing it correctly,
// but still getting an error
// You can do: https://github.com/expo/expo/issues/8368
const useCaching = () => {
  const [loaded, error] = useFonts(APP_LOCAL_FONTS);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    loadResourcesAsync();
  }, []);

  const cacheImages = images => {
    return images.map(image => {
      return Image.prefetch(image.uri);
    });
  };

  const loadResourcesAsync = async () => {
    try {
      /* eslint-disable import/no-unresolved */
      const imageAssets = cacheImages(Object.values(APP_LOCAL_IMAGES));

      await Promise.all([...imageAssets]);
      setIsLoadingComplete(true);
    } catch (error) {
      console.info("error loading images");
      console.info(error);
      setIsLoadingComplete(true);
      setErrorLoading(true);
    }
  };

  return [loaded && isLoadingComplete, errorLoading];
};

export default useCaching;
