import { useFonts } from "expo-font";

interface RootFontsProps {
  fonts: any;
}

const RootFonts = ({ fonts }: RootFontsProps) => {
  const [loaded, error] = useFonts(fonts);
  if (error || !loaded) {
    // return <Sview>{/* <Stext>Error</Stext> */}</Sview>;
    return null;
  }
};

export default RootFonts;
