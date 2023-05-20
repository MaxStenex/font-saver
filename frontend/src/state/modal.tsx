import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { EmptyObject } from "@/types/common";

type ModalComponentType = JSX.Element;

type ModalStateType = {
  addModal: (modal: ModalComponentType) => void;
  removeModal: () => void;
};

const ModalContext = createContext<ModalStateType>({
  addModal: () => {},
  removeModal: () => {},
});

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

export const useModal = <Props,>(Component: React.FC<Props>) => {
  const { addModal, removeModal } = useContext(ModalContext);

  const show = useCallback(
    (...[props]: Props extends EmptyObject ? [unknown?] : [Props]) => {
      const key = crypto.randomUUID();
      const component = <Component {...(props as Props)} key={key} />;
      addModal(component);
    },
    [Component, addModal]
  );

  const hide = useCallback(() => {
    removeModal();
  }, [removeModal]);

  return useMemo(() => ({ show, hide }), [hide, show]);
};
