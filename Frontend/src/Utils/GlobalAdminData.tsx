import { createContext, useContext } from "react";
import usePersistedState from "./usePersistedHooks";

const AdminData= createContext({});

export function useGlobalAdminData(): any {
  return useContext(AdminData);
}

/**
 * A `<ContextProvider>` for themes. Used for changing and handling themes
 */

function AdminDataContext({ children }: any) {
  const [adminData, setAdminData] = usePersistedState("AdminData", "");

  return (
    <AdminData.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminData.Provider>
  );
}

export default AdminDataContext;