import { Entypo } from "@expo/vector-icons";
import { Sicon, Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

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
      <Stext flex={1} alignSelf={"center"} textAlign={"center"} center>
        {props.title || route.name}
      </Stext>
    );
  };

  const renderLeftAction = () => {
    // if (props.renderLeftAction) {
    //   return props.renderLeftAction();
    // }
    // if (navigation.canGoBack() && !props.noBack) {
    return (
      <Sview flex={1}>
        <Sicon
          onPress={navigation.goBack}
          iconComponent={Entypo}
          name="chevron-small-left"
          size={24}
          color="black"
        />
      </Sview>
    );
    // }
    // return <Sview flex={1} />;
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