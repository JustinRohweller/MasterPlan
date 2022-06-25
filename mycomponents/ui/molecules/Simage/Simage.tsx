//Simage is a component that:
//
import React, { ComponentType } from "react";
import type {
  FlexAlignType,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { Dimensions, Image } from "react-native";

const WINDOW = Dimensions.get("window");
const DEFAULT_HEIGHT = WINDOW.height * 0.15;
const DEFAULT_WIDTH = WINDOW.width * 0.15;

type SimageImageProps = Omit<ImageProps, "style">;

interface SimageProps extends ImageStyle {
  children?: React.ReactNode;
  imageProps?: SimageImageProps;
  source: ImageSourcePropType;
  center?: boolean;
  imageComponent?: ComponentType<any>;
}

const Simage = (props: SimageProps): JSX.Element => {
  const {
    center,
    source,
    imageComponent,
    children,
    imageProps,
    ...otherProps
  } = props;

  const getStyleProps = (): ImageStyle => {
    let alignSelf = "auto" as FlexAlignType | "auto" | undefined;
    if (props.center) {
      alignSelf = "center";
    }
    if (alignSelf) {
      return {
        alignSelf,
        backgroundColor: "transparent",
        ...otherProps,
      };
    }
    return {
      backgroundColor: "transparent",
      ...otherProps,
    };
  };

  let imgComponent = Image;
  if (imageComponent) {
    // @ts-ignore
    imgComponent = imageComponent;
  }

  const ImgComponent = imgComponent;

  return (
    <ImgComponent
      style={{
        resizeMode: "contain",
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        ...getStyleProps(),
      }}
      source={source}
      {...imageProps}
    />
  );
};

Simage.defaultProps = {};

export default Simage;
