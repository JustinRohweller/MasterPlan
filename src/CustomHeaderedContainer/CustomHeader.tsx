import { Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

interface CustomHeaderProps {
  title?: string;
  renderLeftAction?: () => React.ReactNode;
  renderRightAction?: () => React.ReactNode;
}

const HOME_TABS: { [key: string]: boolean } = {};

const CustomHeader = (props: CustomHeaderProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderCenterAction = () => {
    if (props.title) {
      return <Stext>{props.title}</Stext>;
    }
    return <Stext>{route.name}</Stext>;
  };

  const renderLeftAction = () => {
    if (props.renderLeftAction) {
      return props.renderLeftAction();
    }
    if (navigation.canGoBack() && !HOME_TABS[route.name]) {
      return (
        <Appbar.Action icon={"chevron-left"} onPress={navigation.goBack} />
      );
    }
    return null;
  };

  const renderRightAction = () => {
    if (props.renderRightAction) {
      return props.renderRightAction();
    }
    return null;
  };

  return (
    <Sview width={"100%"} row>
      {renderLeftAction()}
      {renderCenterAction()}
      {renderRightAction()}
    </Sview>
  );
};

export default CustomHeader;
