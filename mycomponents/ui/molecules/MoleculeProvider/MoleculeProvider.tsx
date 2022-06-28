import { DripsyProvider } from "dripsy";
import React, { ComponentType, createContext, useMemo } from "react";

// should be tested, is done.
interface MoleculeProviderProps {
  theme?: any;
  children?: any;
  dripsyTheme: any;
}

export type MoleculeThemeContextType = {
  fontFamily?: string;
  textColor?: string;
  textComponent?: ComponentType<any>;
  iconComponent?: ComponentType<any>;
  buttonComponent?: ComponentType<any>;
  imageComponent?: ComponentType<any>;
};

export const MoleculeThemeContext = createContext<MoleculeThemeContextType>(
  null as any
);

export const MoleculeProvider = ({
  theme,
  children,
  dripsyTheme,
}: MoleculeProviderProps) => {
  const context = useMemo(() => theme, [theme]);

  return (
    <MoleculeThemeContext.Provider value={context}>
      <DripsyProvider theme={dripsyTheme}>{children}</DripsyProvider>
    </MoleculeThemeContext.Provider>
  );
};

// ex
// return (
//   <MoleculeProvider theme={{ fontFamily: "bold"}}>
//     {children}
//     </MoleculeProvider>
// )
