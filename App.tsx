import { getLocalImages } from "@jrohweller/mycomponents.ui.constants";
import * as Fonts from "./src/assets/fonts";
import * as Images from "./src/assets/images";
// then pass these as a prop.
// then pass APP_LOCAL_IMAGES AS A PROP?
import Root from "./src/root";

export const APP_LOCAL_IMAGES = getLocalImages(Images);

const App = () => {
  return <Root fonts={Fonts} />;
};

export default App;
