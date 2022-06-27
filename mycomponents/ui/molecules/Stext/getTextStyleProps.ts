import { FlexAlignType } from "react-native";

export const getTextStyleProps = (props: any, otherProps: any, theme: any) => {
  let justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  let alignItems: FlexAlignType | undefined;
  let textAlign = "auto" as "auto" | "left" | "right" | "center";

  // This is working, but shouldn't be done?

  if (props.center) {
    justifyContent = "center";
    alignItems = "center";
    textAlign = "center";
  }
  let DEFAULT_PROPS = {
    fontFamily: theme?.fontFamily || undefined,
    fontWeight: undefined,
    backgroundColor: "transparent",
    color: theme?.textColor || undefined,
    ...otherProps,
  };

  if (justifyContent || alignItems || textAlign) {
    return {
      textAlign,
      justifyContent,
      alignItems,
      ...DEFAULT_PROPS,
    };
  }
  return DEFAULT_PROPS;
};
