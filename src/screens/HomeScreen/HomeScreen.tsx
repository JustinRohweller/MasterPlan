import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { APP_LOCAL_IMAGES } from "../../../App";
import {
  Sbutton,
  Sicon,
  Simage,
  Spacer,
  Stext,
  Sview,
} from "../../../mycomponents/ui/molecules";
import CustomHeaderedContainer from "../../CustomHeaderedContainer";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <CustomHeaderedContainer>
      <Sview flex={1} backgroundColor={"orange"} borderRadius={"massive"}>
        <Stext>Hello There</Stext>
        <Sicon
          iconComponent={EvilIcons}
          iconProps={{ size: 30, name: "plus" }}
          onPress={() => {
            console.log("hi");
          }}
        />
        <Sview row>
          <Spacer row />
          <Simage
            source={{ uri: APP_LOCAL_IMAGES.splash.uri }}
            backgroundColor={"black"}
            height={500}
          />
        </Sview>
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
