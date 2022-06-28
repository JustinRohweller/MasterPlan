import React from "react";
import { Sbutton, Stext, Sview } from "../../../mycomponents/ui/molecules";
import CustomHeaderedContainer from "../../CustomHeaderedContainer";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <CustomHeaderedContainer>
      <Sview flex={1} backgroundColor={"orange"} borderRadius={"massive"}>
        <Stext>Hello There</Stext>
        <Sbutton
          borderRadius={"massive"}
          backgroundColor={"blue"}
          width={30}
          center
          alignSelf="center"
        >
          <Stext center alignSelf={"center"}>
            Hi
          </Stext>
        </Sbutton>
      </Sview>
    </CustomHeaderedContainer>
  );
};

HomeScreen.title = "Home";
HomeScreen.shouldBeInStack = true;

export default HomeScreen;
