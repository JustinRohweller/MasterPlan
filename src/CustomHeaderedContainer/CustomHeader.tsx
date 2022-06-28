import { Entypo } from "@expo/vector-icons";
import { PERCENTS } from "@jrohweller/mycomponents.ui.constants";
import { Sicon, Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import { SviewProps } from "@jrohweller/mycomponents.ui.molecules/dist/Sview/Sview";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

interface CustomHeaderProps {
  title?: string;
  renderLeftAction?: () => React.ReactNode;
  renderRightAction?: () => React.ReactNode;
  noBack?: boolean;
  height?: number;
  headerSviewProps?: SviewProps;
}

const DEFAULT_HEIGHT = 30;

const CustomHeader = (props: CustomHeaderProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderCenterAction = () => {
    return (
      <Stext flex={1} alignSelf={"center"} textAlign={"center"} center>
        {props.title || route.name}
      </Stext>
    );
  };

  const renderLeftAction = () => {
    if (props.renderLeftAction) {
      return props.renderLeftAction();
    }
    if (navigation.canGoBack() && !props.noBack) {
      return (
        <Sicon
          flex={1}
          justifyContent={"center"}
          onPress={navigation.goBack}
          iconComponent={Entypo}
          iconProps={{
            name: "chevron-small-left",
            size: 30,
            color: "black",
          }}
        />
      );
    }
    return <Sview flex={1} />;
  };

  const renderRightAction = () => {
    if (props.renderRightAction) {
      return props.renderRightAction();
    }
    return <Sview flex={1} />;
  };

  return (
    <Sview
      width={"100%"}
      row
      height={props.height || DEFAULT_HEIGHT}
      backgroundColor={"orange"}
      alignItems="center"
      // @ts-ignore
      paddingHorizontal={PERCENTS.WIDTH[5]}
      {...props.headerSviewProps}
    >
      {renderLeftAction()}
      {renderCenterAction()}
      {renderRightAction()}
    </Sview>
  );
};

export default CustomHeader;
