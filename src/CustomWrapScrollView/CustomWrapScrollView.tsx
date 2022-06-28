import { PERCENTS } from "@jrohweller/mycomponents.ui.constants";
import { Spacer, Sview } from "@jrohweller/mycomponents.ui.molecules";
import { SviewProps } from "@jrohweller/mycomponents.ui.molecules/dist/Sview/Sview";
import React from "react";
import { StyleSheet } from "react-native";
import type { KeyboardAwareFlatListProps } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

// https://github.com/APSL/react-native-keyboard-aware-scroll-view
// https://reactnative.dev/docs/flatlist

interface CustomWrapScrollViewProps {
  renderFooter?: () => JSX.Element;
  // headerProps?: CustomHeaderedContainerProps;
  containerViewProps?: SviewProps;
  outerViewProps?: SviewProps;
  children?: React.ReactNode;
  noMarginTop?: boolean;
  flatlistProps?: KeyboardAwareFlatListProps<null>;
  headerProps?: CustomHeaderedContainerProps;
  onlyKeyboardView?: boolean;
  noHeader?: boolean;
  renderHeader?: () => JSX.Element;
}

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
            // backgroundColor={COLORS.BACKGROUND_ONE}
            {...props.containerViewProps}
          >
            <Sview
              width={"90%"}
              sCenter
              // backgroundColor={COLORS.BACKGROUND_ONE}
              {...props.outerViewProps}
            >
              {!props.noMarginTop && <Spacer height={PERCENTS.HEIGHT[5]} />}
              {props.children}
            </Sview>
          </Sview>
        }
        data={[{ id: "-1" }]}
        style={styles.flatlist}
        renderItem={() => null}
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

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: COLORS.BACKGROUND_ONE,
  },
});
