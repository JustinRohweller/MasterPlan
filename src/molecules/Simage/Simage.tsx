//Simage is a component that:
//
import React from "react";
import type {
  FlexAlignType,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { Image } from "react-native";
import { APP_LOCAL_IMAGES, PERCENTS } from "../../constants";

type SimageImageProps = Omit<ImageProps, "style">;

interface SimageProps extends ImageStyle {
  children?: React.ReactNode;
  imageProps?: SimageImageProps;
  source: ImageSourcePropType;
  center?: boolean;
}

const DEFAULT_PROPS = {
  source: APP_LOCAL_IMAGES.icon,
};

// https://akveo.github.io/react-native-ui-kitten/docs/components/text/overview#text
const Simage = (props: SimageProps): JSX.Element => {
  const { center, source, children, imageProps, ...otherProps } = props;

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

  return (
    <Image
      style={{
        resizeMode: "contain",
        width: PERCENTS.WIDTH[15],
        height: PERCENTS.WIDTH[15],
        flex: 1,
        ...getStyleProps(),
      }}
      source={source ? source : DEFAULT_PROPS.source}
      {...imageProps}
    />
  );
};

Simage.defaultProps = {};

export default Simage;
