import { useEffect, useState } from "react";
import { AuthContext, AuthData } from "./context";
import { FullPageLoader } from "@/components/loaders";
import { authService } from "@/api";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthData>({
    status: "loading",
    user: null,
  });

  useEffect(() => {
    const signIn = async () => {
      try {
        await authService.refreshTokens();
        const user = await authService.me();
        setAuthState((prev) => ({ ...prev, status: "success", user }));
      } catch (error) {
        setAuthState((prev) => ({ ...prev, status: "error" }));
      }
    };

    signIn();
  }, []);

  if (authState.status === "loading") return <FullPageLoader />;

  return <AuthContext.Provider value={authState}>{children} </AuthContext.Provider>;
};
