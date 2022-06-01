import { MotiPressable } from "moti/interactions";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Stext, Sview } from "../Sview";
import { COLORS, THEME } from "../../constants";
import { StextProps } from "../Stext/Stext";
import { getStandardProps, SviewProps } from "../Sview/Sview";
import Helper from "./Helper";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

type TouchableWithoutStyle = Omit<TouchableOpacityProps, "style">;

interface SbuttonProps extends SviewProps, TouchableWithoutStyle {
  stextProps?: StextProps;
  status?: "success" | "fail";
  gradientProps?: LinearGradientProps;
}

const Sbutton = (props: SbuttonProps) => {
  const {
    children,
    disabled,
    status,
    onPress,
    stextProps,
    gradientProps,
    ...otherProps
  } = props;
  // only onpress, style
  // can pass
  // return (
  //   <TouchableOpacity onPress={onPress}>
  //     <LinearGradient
  //       colors={
  //         status === "success"
  //           ? [COLORS.ACCENT_TWO, COLORS.ACCENT_ONE]
  //           : [COLORS.BRAND_FOUR_DARK, COLORS.BRAND_FOUR_LIGHT]
  //       }
  //       // start={{ x: 0, y: 0.5 }}
  //       // end={{ x: 1, y: 1 }}
  //       style={{
  //         width: "100%",
  //         alignSelf: "center",
  //         padding: 3,
  //         borderRadius: THEME.radii.xl,
  //         height: 50,
  //         alignItems: "center",
  //         // overflow: "hidden",
  //         justifyContent: "center"
  //       }}
  //       {...gradientProps}
  //     >
  //       {/* <Sview
  //         padding={"$10"}
  //         {...getStandardProps(props)}
  //         {...otherProps}
  //         // borderRadius={"massive"}
  //         borderRadius={20}
  //       > */}
  //       <Stext
  //         textAlignVertical={"center"}
  //         textAlign={"center"}
  //         color={COLORS.WHITE}
  //         {...props.stextProps}
  //       >
  //         {props.children}
  //       </Stext>
  //       {/* </Sview> */}
  //     </LinearGradient>
  //     {/* <Sview padding={"$10"} {...getStandardProps(props)} {...otherProps}>
  //       <Stext textAlign={"center"} color={COLORS.WHITE} {...props.stextProps}>
  //         {props.children}
  //       </Stext>
  //     </Sview> */}
  //   </TouchableOpacity>
  // );

  return (
    <MotiPressable onPress={onPress}>
      <Helper {...props} />
    </MotiPressable>
  );
};

export default Sbutton;
