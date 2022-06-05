import { Dimensions, Platform } from "react-native";

export const WINDOW = Dimensions.get("window");

const HEIGHT: { [key: number]: number } = {};
const WIDTH: { [key: number]: number } = {};
const NUMBER: { [key: number]: string } = {};
if (Platform.OS === "web") {
  for (let i = 0; i < 1001; i++) {
    HEIGHT[i * 0.1] = WINDOW.height * i * 0.001 * 0.8;
    WIDTH[i * 0.1] = WINDOW.width * i * 0.001 * 0.8;
    NUMBER[i * 0.1] = `${i * 0.1}%`;
  }
} else {
  for (let i = 0; i < 1001; i++) {
    HEIGHT[i * 0.1] = WINDOW.height * i * 0.001;
    WIDTH[i * 0.1] = WINDOW.width * i * 0.001;
    NUMBER[i * 0.1] = `${i * 0.1}%`;
  }
}

export const PERCENTS = {
  HEIGHT,
  WIDTH,
  NUMBER,
};
