import { createContext, useContext } from "react";
import usePersistedState from "./usePersistedHooks";

const GlobalData= createContext({});

export function useGlobalStudentData(): any {
  return useContext(GlobalData);
}

/**
 * A `<ContextProvider>` for themes. Used for changing and handling themes
 */

function GlobalDataContext({ children }: any) {
  const [globalData, setglobalData] = usePersistedState("id", "");

  return (
    <GlobalData.Provider value={{ globalData, setglobalData }}>
      {children}
    </GlobalData.Provider>
  );
}

export default GlobalDataContext;