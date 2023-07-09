import { create } from "zustand";
import { ModalActions, ModalComponentType, ModalContext } from "./context";

type ProviderProps = {
  children: JSX.Element;
};

type StoreType = {
  modals: ModalComponentType[];
} & ModalActions;

const useModalStore = create<StoreType>((set) => ({
  modals: [],
  addModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  removeModal: () =>
    set((state) => {
      const newModals = [...state.modals];
      newModals.pop();
      return { modals: newModals };
    }),
}));

export const ModalProvider: React.FC<ProviderProps> = ({ children }) => {
  const { addModal, modals, removeModal } = useModalStore();

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
