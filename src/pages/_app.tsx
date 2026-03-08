import type { AppProps } from "next/app";
import "@/shared/styles/globals.css";
import { Toaster } from "react-hot-toast";

import {
  LoadingProvider,
  useLoading,
} from "@/shared/component/elements/loading_context";
import "@/shared/utils/extension/money_ext";
import { GlobalContainerProvider } from "@/shared/dependency_injection/global_container";
import { Inter } from "next/font/google";
import LoadingComponent from "@/shared/component/ui/loading/loading_component";
import { GlobalProvider } from "@/shared/logic/global_logic";
import { AuthProvider } from "@/shared/logic/auth_logic";

const inter = Inter({});

function GlobalLoader() {
  const { loading } = useLoading();
  return loading ? (
    <div className="floating-loader">
      <LoadingComponent />
    </div>
  ) : null;
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GlobalContainerProvider>
      <LoadingProvider>
        <Toaster position="top-right" />
        <GlobalLoader />
        <GlobalProvider>
          <AuthProvider>{children}</AuthProvider>
        </GlobalProvider>
      </LoadingProvider>
    </GlobalContainerProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </AppProviders>
  );
}
