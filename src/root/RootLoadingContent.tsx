import { useContext } from "react";
import RootAlertHelper from "./RootAlertHelper";
import { LoadingContext } from "./RootLoadingProvider";

interface RootLoadingContentProps {
  content: any;
}

const RootLoadingContent = ({ content }: RootLoadingContentProps) => {
  const loadingContext = useContext(LoadingContext);
  return <RootAlertHelper content={content} show={loadingContext.loading} />;
};

export default RootLoadingContent;

/* example loading component;
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
        <Simage
          source={{ uri: APP_LOCAL_IMAGES.loadingRobot.uri }}
          width={110}
          height={110}
          borderWidth={0}
          borderColor={COLORS.GRAY}
          backgroundColor={"transparent"}
        />
      </Sview>
    );
  */
