import React from "react";
import { useWindowDimensions, View, ViewStyle } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

interface SafeAreaEscapingViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeAreaEscapingView = ({
  children,
  style,
}: SafeAreaEscapingViewProps) => {
  const { width, height } = useWindowDimensions();
  let initMetrics = { insets: { top: 0, left: 0, bottom: 0, right: 0 } };
  if (initialWindowMetrics) {
    initMetrics = initialWindowMetrics;
  }

  console.log(initMetrics?.insets.bottom);
  return (
    <View
      style={{
        flex: 1,
        // vertical
        // height: height + initMetrics?.insets.top + initMetrics?.insets.bottom,
        height: height,
        marginTop: -initMetrics?.insets.top,
        marginBottom: -initMetrics?.insets.bottom,

        // hrozontal
        marginLeft: -initMetrics?.insets.left,
        marginRight: -initMetrics?.insets.right,
        width: width,
        zIndex: 100,
        ...style,
      }}
    >
      {/* could do this for getting safearea back: <SafeAreaView
        style={{
          backgroundColor: "#00000050",
        }}
      /> */}
      {/* @ts-ignore */}
      {children}
    </View>
  );
};

export default SafeAreaEscapingView;
