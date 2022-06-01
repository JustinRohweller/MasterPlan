import React from "react";
import { Stext, Sview } from "../Sview";
import { COLORS } from "../../constants";
import { getStandardProps } from "../Sview/Sview";
import { useMotiPressable } from "moti/interactions";
import { MotiView } from "moti";

// TODO: make MotiOpacity file in components.

const Helper = props => {
  const { children, disabled, onPress, status, stextProps, ...otherProps } =
    props;
  const state = useMotiPressable(({ pressed }) => {
    "worklet";

    return {
      opacity: pressed ? 0.5 : 1,
      scale: pressed ? 0.98 : 1
    };
  }, []);

  return (
    <MotiView state={state}>
      <Sview padding={"$10"} {...getStandardProps(props)} {...otherProps}>
        <Stext textAlign={"center"} color={COLORS.WHITE} {...props.stextProps}>
          {props.children}
        </Stext>
      </Sview>
    </MotiView>
  );
};

export default Helper;
