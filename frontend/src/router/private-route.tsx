import { useAuth } from "@/state/auth";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { status, user } = useAuth();

  if (status !== "loading" && !user) return <Navigate to="/login" />;

  if (status === "loading") return null;

  return <>{children}</>;
};
