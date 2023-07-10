import { useContext } from "react";
import { AuthContext } from "./context";

export const useAuth = () => {
  const authData = useContext(AuthContext);

  if (!authData) throw new Error("Auth context is not provided");

  return authData;
};
