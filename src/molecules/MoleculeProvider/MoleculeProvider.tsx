import React, { createContext, useMemo } from "react";

interface MoleculeProviderProps {
  theme?: any;
  children?: any;
}

export type MoleculeThemeContextType = {
  fontFamily?: string;
  textColor?: string;
};

export const MoleculeThemeContext = createContext<MoleculeThemeContextType>(
  null as any
);

export const MoleculeProvider = ({
  theme,
  children,
}: MoleculeProviderProps) => {
  const context = useMemo(() => theme, [theme]);

  return (
    <MoleculeThemeContext.Provider value={context}>
      {children}
    </MoleculeThemeContext.Provider>
  );
};

// ex
// return (
//   <MoleculeProvider theme={{ fontFamily: "bold"}}>
//     {children}
//     </MoleculeProvider>
// )
