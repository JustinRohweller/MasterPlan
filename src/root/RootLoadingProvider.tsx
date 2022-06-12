import { createContext, ReactNode, useState } from "react";

interface RootLoadingProviderProps {
  children?: ReactNode;
  loadingComponent?: any;
}

export const LoadingContext = createContext({
  loading: true,
  updateLoading: (newLoading: boolean) => {},
});

const RootLoadingProvider = (props: RootLoadingProviderProps) => {
  const [loading, setLoading] = useState(true);

  const updateLoading = (newLoading: boolean) => {
    setLoading(newLoading);
  };

  const LoadingComponent = props.loadingComponent;
  return (
    <LoadingContext.Provider value={{ loading, updateLoading }}>
      {props.children}
      <LoadingComponent />
    </LoadingContext.Provider>
  );
};

// example loading component;
/* <Sview
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
      </Sview> */

export default RootLoadingProvider;
