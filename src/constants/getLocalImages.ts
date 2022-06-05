import { Image, Platform } from "react-native";

export const getLocalImages = (images: any) => {
  const imageKeys = Object.keys(images);
  const imageValues = Object.values(images);
  const finalImages: { [key: string]: any } = {};

  for (let i = 0; i < imageValues.length; i++) {
    if (Platform.OS === "web") {
      finalImages[imageKeys[i]] = { uri: imageValues[i] };
    } else {
      // @ts-ignore
      finalImages[imageKeys[i]] = Image.resolveAssetSource(imageValues[i]);
    }
  }
  return finalImages;
};

// usage:
// import * as Images from "./assets/images";
// export const APP_LOCAL_IMAGES = getFinalImages(Images);
