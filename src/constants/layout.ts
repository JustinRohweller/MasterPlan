import { Dimensions, PixelRatio } from "react-native";

const { height, width } = Dimensions.get("window");

// paste your mockup sizes
const MOCKUP_WIDTH = 375;
const MOCKUP_HEIGHT = 778;

// use this to scale sizes to different phone sizes and screen resolutions
// https://stackoverflow.com/questions/62485177/responsive-in-react-native

export const getWidthWithScaleFactor = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * (width / MOCKUP_WIDTH));
};

export const getHeightWithScaleFactor = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * (height / MOCKUP_HEIGHT));
};

export function getFontWithScaleFactor(size: number) {
  return PixelRatio.roundToNearestPixel(size * (height / MOCKUP_HEIGHT));
}
