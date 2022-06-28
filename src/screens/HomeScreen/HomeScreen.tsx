import React from "react";
import { Sbutton, Stext, Sview } from "../../../mycomponents/ui/molecules";
import CustomHeaderedContainer from "../../CustomHeaderedContainer";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <CustomHeaderedContainer>
      <Sview flex={1} backgroundColor={"orange"} borderRadius={"massive"}>
        <Stext>Hello There</Stext>
        <Sbutton width={200} borderRadius={"small"} backgroundColor={"black"}>
          <Stext>Hi</Stext>
        </Sbutton>
      </Sview>
    </CustomHeaderedContainer>
  );
};

HomeScreen.title = "Home";
HomeScreen.shouldBeInStack = true;

export default HomeScreen;
