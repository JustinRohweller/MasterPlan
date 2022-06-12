import { createContext, ReactNode, useState } from "react";
import RootLoadingContent from "./RootLoadingContent";

// TODO: troubleshoot if this causes lots of re-renders
// maybe memo our navigator?
interface RootLoadingProviderProps {
  children?: ReactNode;
  content: any;
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

  return (
    <LoadingContext.Provider value={{ loading, updateLoading }}>
      {props.children}
      <RootLoadingContent content={props.content} />
    </LoadingContext.Provider>
  );
};

export default RootLoadingProvider;
