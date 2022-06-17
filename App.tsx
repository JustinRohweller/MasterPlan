import {
  getLocalImages,
  PERCENTS,
} from "@jrohweller/mycomponents.ui.constants";
import { Simage, Stext, Sview } from "@jrohweller/mycomponents.ui.molecules";
import ExampleLoadingOff from "./ExampleLoadingOff";
import * as Fonts from "./src/assets/fonts";
import * as Images from "./src/assets/images";
import Root from "./src/root";

export const APP_LOCAL_IMAGES = getLocalImages(Images);

const MyLoadingItem = () => {
  return (
    <Sview
      position="absolute"
      alignItems="center"
      justifyContent="center"
      left={0}
      right={0}
      top={0}
      bottom={0}
    >
      <Stext>we're loading</Stext>
    </Sview>
  );
};

const MyErrorItem = () => {
  return (
    <Sview
      position="absolute"
      alignItems="center"
      justifyContent="center"
      left={0}
      right={0}
      top={0}
      bottom={0}
    >
      <Stext>Hey Sorry we errored</Stext>
    </Sview>
  );
};

const App = () => {
  const renderImage = () => {
    // TODO: put this in customheaderedcontainer for "noSafeArea"
    // if (fullScreen) {
    //   return (
    //     <Sview
    //       flex={1}
    //       height={
    //         PERCENTS.HEIGHT[100] +
    //         initialWindowMetrics?.insets.top * 2 +
    //         initialWindowMetrics?.insets.bottom
    //       }
    //       marginTop={
    //         -(
    //           initialWindowMetrics?.insets.top * 2 +
    //           initialWindowMetrics?.insets.bottom
    //         )
    //       }
    //       marginBottom={
    //         -(
    //           initialWindowMetrics?.insets.top +
    //           initialWindowMetrics?.insets.bottom
    //         )
    //       }
    //       width={PERCENTS.WIDTH[100]}
    //       zIndex={100}
    //     >
    //       <SafeAreaView
    //         style={{
    //           backgroundColor: "#00000050",
    //         }}
    //       />
    //       <Simage
    //         width={"100%"}
    //         height={"100%"}
    //         source={{
    //           uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
    //         }}
    //         resizeMode={"cover"}
    //       />
    //     </Sview>
    //   );
    // }
    return (
      <Sview flex={1} height={PERCENTS.HEIGHT[100]} width={PERCENTS.WIDTH[100]}>
        <Simage
          width={"100%"}
          height={"100%"}
          source={{
            uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
          }}
          resizeMode={"cover"}
        />
      </Sview>
    );
  };

  const theme = {
    textColor: "#019123",
    fontFamily: "OpenSansBold",
  };

  return (
    <Root
      fonts={Fonts}
      loadingProviderContent={MyLoadingItem}
      moleculeTheme={theme}
      errorBoundaryContent={MyErrorItem}
    >
      {/* <MainNavigator /> */}
      <Sview flex={1}>{renderImage()}</Sview>
      <ExampleLoadingOff />
    </Root>
  );
};

export default App;
