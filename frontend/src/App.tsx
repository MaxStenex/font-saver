import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { MainLayout } from "@/layouts";
import "@/styles/global.css";
import { ModalProvider } from "./state/modal";

function App() {
  return (
    <MainLayout>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </MainLayout>
  );
}

export default App;
