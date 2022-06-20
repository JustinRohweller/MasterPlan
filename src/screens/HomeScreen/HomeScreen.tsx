import { Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import React from "react";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <Sview flex={1}>
      <Stext>dog</Stext>
    </Sview>
  );
};

HomeScreen.title = "Home";
HomeScreen.shouldBeInStack = true;

export default HomeScreen;
