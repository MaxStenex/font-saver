import { LoginPage, RegisterPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

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
    element: <h1>Home page</h1>,
  },
  {
    path: "*",
    element: <h1>Page not found :(</h1>,
  },
]);
