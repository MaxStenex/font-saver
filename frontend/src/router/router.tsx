import { HomePage, LoginPage, RegisterPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./private-route";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <h1>Page not found :(</h1>,
  },
]);
