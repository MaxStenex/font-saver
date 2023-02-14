import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ModalComponentType = React.FC<any>;

type ModalStateType = {
  setModal: React.Dispatch<React.SetStateAction<ModalComponentType | null>>;
};

const ModalContext = createContext<ModalStateType>({ setModal: () => {} });

type ProviderProps = {
  children: JSX.Element;
};

export const ModalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalComponentType | null>(null);

  return (
    <ModalContext.Provider
      value={{
        setModal,
      }}
    >
      <>
        {modal}
        {children}
      </>
    </ModalContext.Provider>
  );
};

export const useModal = <Props,>(Component?: React.FC<Props>) => {
  const { setModal } = useContext(ModalContext);

  const show = useCallback(
    (params?: Props) => {
      if (Component) {
        const props = params ? params : {};
        // @ts-ignore
        setModal(<Component {...props} />);
      }
    },
    [Component, setModal]
  );

  const hide = useCallback(() => {
    setModal(null);
  }, [setModal]);

  return useMemo(() => ({ show, hide }), [hide, show]);
};
