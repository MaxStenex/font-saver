import { createContext } from "react";

export type ModalComponentType = JSX.Element;

export type ModalActions = {
  addModal: (modal: ModalComponentType) => void;
  removeModal: () => void;
};

export const ModalContext = createContext<ModalActions>({
  addModal: () => {},
  removeModal: () => {},
});
