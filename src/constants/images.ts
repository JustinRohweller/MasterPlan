import { Image, Platform } from "react-native";
import * as Images from "../assets/images";

const imageKeys = Object.keys(Images);
const imageValues = Object.values(Images);
const finalImages: { [key: string]: any } = {};

for (let i = 0; i < imageValues.length; i++) {
  if (Platform.OS === "web") {
    finalImages[imageKeys[i]] = { uri: imageValues[i] };
  } else {
    finalImages[imageKeys[i]] = Image.resolveAssetSource(imageValues[i]);
  }
}

export const APP_LOCAL_IMAGES = finalImages;
