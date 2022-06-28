import { useEffect, useState } from "react";
import { Image } from "react-native";

//prefetch images
const useCacheImages = (APP_LOCAL_IMAGES: any) => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    loadResourcesAsync();
  }, []);

  const cacheImages = (images: any) => {
    return images.map((image: any) => {
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
      // this should take us back to our error boundary.
      throw new Error("Error Loading Images");
    }
  };

  return [isLoadingComplete];
};

export default useCacheImages;
