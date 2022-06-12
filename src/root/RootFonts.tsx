import { useFonts } from "expo-font";

interface RootFontsProps {
  fonts: any;
  children: any;
}

// TODO: rename to RootFontInitializer
const RootFonts = ({ fonts, children }: RootFontsProps) => {
  const [loaded, error] = useFonts(fonts);

  // TODO: improve this to cover all options.
  if (error || !loaded) {
    return null;
  }
  return children;
};

export default RootFonts;
