import { Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import React from "react";
import CustomHeaderedContainer from "../../CustomHeaderedContainer";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <CustomHeaderedContainer>
      <Sview flex={1}>
        <Stext>there</Stext>
      </Sview>
    </CustomHeaderedContainer>
  );
};

HomeScreen.title = "Home";
HomeScreen.shouldBeInStack = true;

export default HomeScreen;
