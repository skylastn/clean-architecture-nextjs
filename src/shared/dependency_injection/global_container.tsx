import { AuthService } from "@/features/auth/application/auth_service";
import { SampleService } from "@/features/core/application/sample_service";
import React, { createContext, useContext, useMemo } from "react";

export const useAuthService = () => useContainer().authService;
export const useSampleService = () => useContainer().sampleService;

export type GlobalContainer = {
  authService: AuthService;
  sampleService: SampleService;
};

export function createContainer(): GlobalContainer {
  return {
    authService: new AuthService(),
    sampleService: new SampleService(),
  };
}

const GlobalContainerContext = createContext<GlobalContainer | null>(null);

export function GlobalContainerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useMemo(() => createContainer(), []);
  return (
    <GlobalContainerContext.Provider value={container}>
      {children}
    </GlobalContainerContext.Provider>
  );
}

export function useContainer() {
  const ctx = useContext(GlobalContainerContext);
  if (!ctx)
    throw new Error("useContainer must be used within ContainerProvider");
  return ctx;
}
