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
  return (
    <View
      style={{
        flex: 1,
        // TOP * 2 because of our custom status bar.
        // vertical
        height:
          height + initMetrics?.insets.top * 2 + initMetrics?.insets.bottom,
        marginTop: -(initMetrics?.insets.top * 2 + initMetrics?.insets.bottom),
        marginBottom: -(initMetrics?.insets.top + initMetrics?.insets.bottom),

        // hrozontal
        marginLeft: -(initMetrics?.insets.left + initMetrics?.insets.right),
        marginRight: -(initMetrics?.insets.left + initMetrics?.insets.right),
        width: width + initMetrics?.insets.left + initMetrics?.insets.right,
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
