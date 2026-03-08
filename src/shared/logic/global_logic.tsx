"use client";

import { createContext, useContext } from "react";

interface GlobalContextProps {
  initialized: boolean;
}

const GlobalLogic = createContext<GlobalContextProps | undefined>(undefined);
// const includeBanner = ["/"];
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // useEffect(() => {
  //   if (!router.isReady) return;
  // }, [router.isReady]);
  return (
    <GlobalLogic.Provider value={{ initialized: true }}>
      {children}
    </GlobalLogic.Provider>
  );
};

export const useGlobalLogic = () => {
  const context = useContext(GlobalLogic);
  if (!context) {
    throw new Error("useGlobalLogic must be used within GlobalProvider");
  }
  return context;
};
