import { Entypo } from "@expo/vector-icons";
import { Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Sicon } from "../../mycomponents/ui/molecules";

interface CustomHeaderProps {
  title?: string;
  renderLeftAction?: () => React.ReactNode;
  renderRightAction?: () => React.ReactNode;
  noBack?: boolean;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderCenterAction = () => {
    return (
      <Stext
        flex={1}
        alignSelf={"center"}
        textAlign={"center"}
        center
        textAlignVertical={"bottom"}
      >
        {props.title || route.name}
      </Stext>
    );
  };

  const renderLeftAction = () => {
    if (props.renderLeftAction) {
      return props.renderLeftAction();
    }
    // if (navigation.canGoBack() && !props.noBack) {
    return (
      <Sicon
        // backgroundColor={"black"}
        // height={50}
        // width={100}
        flex={1}
        justifyContent={"center"}
        // alignItems={"flex-start"}
        // alignSelf={"center"}
        onPress={navigation.goBack}
        iconComponent={Entypo}
        iconProps={{
          name: "chevron-small-left",
          size: 24,
          color: "black",
        }}
      />
    );
    // }
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
      height={50}
      backgroundColor={"orange"}
      alignItems="center"
    >
      {renderLeftAction()}
      {renderCenterAction()}
      {renderRightAction()}
    </Sview>
  );
};

export default CustomHeader;
