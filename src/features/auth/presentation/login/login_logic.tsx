import { useLoading } from "@/shared/component/elements/loading_context";
import { useAuthLogic } from "@/shared/logic/auth_logic";
import delay from "@/shared/utils/utility/delay";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLoginLogic = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoading();
  const authLogic = useAuthLogic();

  const handlerLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await authLogic.login({
        username: username,
        password: password,
      });
      result.fold(
        (err) => {
          if (err === "Email belum diverifikasi") {
            router.push("/auth/verify");
          }
        },
        async () => {
          await delay(1);
          router.push("/");
        },
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };
  return { handlerLogin, setUsername, setPassword };
};
