import {
  CustomHeaderedContainer,
  CustomHeaderedContainerProps,
} from "@jrohweller/mycomponents.custom-headered-container";
import { PERCENTS } from "@jrohweller/mycomponents.ui.constants";
import { Spacer, Sview } from "@jrohweller/mycomponents.ui.molecules";
import { SviewProps } from "@jrohweller/mycomponents.ui.molecules/dist/Sview/Sview";
import React from "react";
import type { KeyboardAwareFlatListProps } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

// https://github.com/APSL/react-native-keyboard-aware-scroll-view
// https://reactnative.dev/docs/flatlist

// TODO: have provider to give defaults
// ie. all these props in theme.

// Also get stuff from luvbucks.

interface CustomWrapScrollViewProps {
  renderFooter?: () => JSX.Element;
  containerViewProps?: SviewProps;
  outerViewProps?: SviewProps;
  children?: React.ReactNode;
  noMarginTop?: boolean;
  flatlistProps?: KeyboardAwareFlatListProps<null>;
  headerProps?: CustomHeaderedContainerProps;
  onlyKeyboardView?: boolean;
  noHeader?: boolean;
  renderHeader?: () => JSX.Element;
  backgroundColor?: string;
}

const renderItem = () => null;

const CustomWrapScrollView = (props: CustomWrapScrollViewProps) => {
  const renderFooter = () => {
    if (props.renderFooter) {
      return props.renderFooter();
    }
    return null;
  };

  const renderKeyboardAwareFlatList = () => {
    return (
      <KeyboardAwareFlatList
        keyboardShouldPersistTaps={"handled"}
        ListHeaderComponent={
          <Sview
            flex={1}
            backgroundColor={props.backgroundColor || "transparent"}
            {...props.containerViewProps}
          >
            <Sview
              width={"90%"}
              alignSelf="center"
              backgroundColor={props.backgroundColor || "transparent"}
              {...props.outerViewProps}
            >
              {!props.noMarginTop && <Spacer height={PERCENTS.HEIGHT[5]} />}
              {props.children}
            </Sview>
          </Sview>
        }
        data={[{ id: "-1" }]}
        style={{ backgroundColor: props.backgroundColor || "transparent" }}
        renderItem={renderItem}
        {...props.flatlistProps}
      />
    );
  };

  if (props.onlyKeyboardView) {
    return renderKeyboardAwareFlatList();
  }

  const renderHeader = () => {
    if (props.renderHeader) {
      return props.renderHeader();
    }
    return null;
  };

  return (
    <CustomHeaderedContainer {...props.headerProps} noHeader={props.noHeader}>
      {renderHeader()}
      {renderKeyboardAwareFlatList()}
      {renderFooter()}
    </CustomHeaderedContainer>
  );
};

export default CustomWrapScrollView;
