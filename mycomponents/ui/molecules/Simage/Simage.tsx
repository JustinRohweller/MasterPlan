//Simage is a component that:
//
import { Image } from "dripsy";
import React, { ComponentType, useContext } from "react";
import type {
  FlexAlignType,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { Dimensions } from "react-native";
import { MoleculeThemeContext } from "..";
import { SviewProps } from "../Sview/Sview";

const WINDOW = Dimensions.get("window");
const DEFAULT_HEIGHT = WINDOW.height * 0.15;
const DEFAULT_WIDTH = WINDOW.width * 0.15;

// Simage is done, just needs to be tested.

type SimageImageProps = Omit<ImageProps, "style">;

interface SimageProps extends SviewProps {
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

  const theme = useContext(MoleculeThemeContext);

  const getStyleProps = (): ImageStyle => {
    let alignSelf = "auto" as FlexAlignType | "auto" | undefined;
    if (props.center) {
      alignSelf = "center";
    }
    // @ts-ignore
    return {
      // @ts-ignore
      alignSelf,
      // @ts-ignore
      backgroundColor: "transparent",
      ...otherProps,
    };
  };

  let imgComponent = Image;
  if (theme?.imageComponent) {
    // @ts-ignore
    imgComponent = theme.imageComponent;
  }
  if (imageComponent) {
    // @ts-ignore
    imgComponent = imageComponent;
  }

  const ImgComponent = imgComponent;

  return (
    // @ts-ignore
    <ImgComponent
      // @ts-ignore
      sx={{
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
