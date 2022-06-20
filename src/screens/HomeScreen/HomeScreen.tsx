import { Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import React from "react";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <Sview flex={1} justifyContent="space-between">
      <Stext>fsdffd</Stext>
      <Stext>aaa</Stext>
    </Sview>
  );
};

HomeScreen.title = "Home";
HomeScreen.shouldBeInStack = true;

export default HomeScreen;
