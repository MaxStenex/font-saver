import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { MainLayout } from "@/layouts";
import "@/styles/global.css";
import { ModalProvider } from "./state/modal";
import { AuthProvider } from "./state/auth";

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </MainLayout>
    </AuthProvider>
  );
}

export default App;
