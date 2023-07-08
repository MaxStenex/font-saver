import { useCallback, useState } from "react";
import { ModalComponentType, ModalContext } from "./context";

type ProviderProps = {
  children: JSX.Element;
};

export const ModalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalComponentType[]>([]);

  const addModal = useCallback((modal: ModalComponentType) => {
    setModals((prev) => [...prev, modal]);
  }, []);

  const removeModal = useCallback(() => {
    setModals((prev) => {
      const newModals = [...prev];
      newModals.pop();
      return newModals;
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        addModal,
        removeModal,
      }}
    >
      <>
        {modals.map((m) => m)}
        {children}
      </>
    </ModalContext.Provider>
  );
};
