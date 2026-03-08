import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import delay from "@/shared/utils/utility/delay";
import { useAuthService } from "@/shared/dependency_injection/global_container";
import { LoginRequest } from "@/features/auth/domain/model/request/login_request";
import { Either, left, right } from "@/shared/utils/utility/either";

interface AuthContextProps {
  isLogin: boolean;
  logout: () => Promise<void>;
  login: (request: LoginRequest) => Promise<Either<string, string>>;
}

const AuthLogic = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const service = useAuthService();
  const [isLogin, setIsLogin] = useState(service.isLogin);

  const login = useCallback(
    async (request: LoginRequest): Promise<Either<string, string>> => {
      try {
        const res = await service.login(request);
        await delay(1);

        res.fold(
          (err) => {
            const message = err.message ?? "";
            throw new Error(message);
          },
          () => {
            toast.success("Berhasil Login!");
            setIsLogin(true);
          },
        );
        return right("Success");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        toast.error(message);
        return left(message);
      }
    },
    [service],
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await service.logout();
      setIsLogin(false);
      toast.success("Berhasil Logout!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }, [service]);

  const value = useMemo(
    () => ({
      isLogin,
      logout,
      login,
    }),
    [isLogin, logout, login],
  );

  return <AuthLogic.Provider value={value}>{children}</AuthLogic.Provider>;
};

export const useAuthLogic = () => {
  const context = useContext(AuthLogic);
  if (!context) {
    throw new Error("useAuthLogic must be used within AuthProvider");
  }
  return context;
};
