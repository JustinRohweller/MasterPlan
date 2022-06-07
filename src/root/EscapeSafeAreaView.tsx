import { PERCENTS } from "@jrohweller/mycomponents.ui.constants";
import { initialWindowMetrics } from "react-native-safe-area-context";

// https://github.com/microsoft/vscode/issues/25312
interface EscapeSafeAreaViewProps {}

const EscapeSafeAreaView = ({}: EscapeSafeAreaViewProps) => {
  return (
    <Sview
      flex={1}
      backgroundColor={"orange"}
      height={
        PERCENTS.HEIGHT[100] +
        initialWindowMetrics?.insets.top +
        initialWindowMetrics?.insets.bottom
      }
      marginTop={
        -(
          initialWindowMetrics?.insets.top + initialWindowMetrics?.insets.bottom
        )
      }
      marginBottom={
        -(
          initialWindowMetrics?.insets.top + initialWindowMetrics?.insets.bottom
        )
      }
      width={PERCENTS.WIDTH[100]}
    />
  );
};

export default EscapeSafeAreaView;
