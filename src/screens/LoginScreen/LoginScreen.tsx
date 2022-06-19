import { Stext } from "@jrohweller/mycomponents.ui.molecules";
import React from "react";

interface LoginScreenProps {}

const LoginScreen = ({}: LoginScreenProps) => {
  return <Stext>Hi</Stext>;
};

LoginScreen.title = "Login";
LoginScreen.shouldBeInTabs = true;

export default LoginScreen;
