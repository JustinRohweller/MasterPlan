import React, { createContext, useMemo } from "react";

interface MoleculeProviderProps {
  theme?: any;
  children?: any;
}

export type MoleculeThemeContextType = { theme: any };

export const MoleculeThemeContext = createContext<MoleculeThemeContextType>(
  null as any
);

export const createMoleculeContext = (theme: any) => {
  const MyContext = createContext(theme);
  return MyContext;
};

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

// const MoleculeProvider = ({ context, children }: MoleculeProviderProps) => {
//   const Context = context;
//   return <Context.Provider />;
// };

// // ex.
// const context = createMoleculeContext({ fontSize: 10 });

// return (
//   <MoleculeProvider context={context}>
//     {children}
//     </MoleculeProvider>
// )
