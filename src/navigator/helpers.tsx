import React from "react";

interface ScreenType {
  (props: unknown): JSX.Element;
  title: string;
  shouldBeInStack: boolean;
  shouldBeInModal: boolean;
  shouldBeInDrawer: boolean;
  shouldBeInTabs: boolean;
  tabId?: number;
  isInitialTab?: boolean;
}

// const foo = <T,>(x: T) => x;

export const isScreenType = <Type,>(screen: any, type: Type): boolean => {
  if (screen[type]) {
    return true;
  }
  return false;
};

export const isStackScreen = (screen: unknown): screen is ScreenType => {
  return (screen as ScreenType).title !== undefined;
};

export const renderScreens = (
  item: any,
  index: number,
  nav: any,
  type: string,
  screens: any
): JSX.Element | null => {
  if (isStackScreen(item)) {
    if (isScreenType(item, type)) {
      const Nav = nav;

      return (
        <Nav.Screen
          key={Object.keys(screens)[index]}
          name={item.title}
          component={item}
        />
      );
    }
  }
  return null;
};

// Ex.
// import * as screens from "./screens";
// {Object.values(screens).map((item, index: number) =>
// renderScreens(item, index, Stack, "shouldBeInStack", screens)
// )}

// SpecificScreen.title = "My Screen";
// SpecificScreen.shouldBeInStack = true;
