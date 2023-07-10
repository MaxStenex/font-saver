import { User } from "@/types/user";
import { createContext } from "react";

export type AuthData = {
  user: User | null;
  status: "loading" | "success" | "error";
};

export const AuthContext = createContext<AuthData | undefined>(undefined);
