import { FlexAlignType } from "react-native";

export const getStandardProps = (props: any) => {
  let justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  let alignItems: FlexAlignType | undefined;
  let alignSelf: FlexAlignType | "auto" | undefined;
  let flexDirection: "row" | "column" | undefined;

  if (props.row) {
    flexDirection = "row";
  }

  if (props.center) {
    justifyContent = "center";
    alignItems = "center";
  }

  if (justifyContent || alignItems || alignSelf || flexDirection) {
    return { justifyContent, alignItems, alignSelf, flexDirection };
  }
  return {};
};
