import { createContext } from "react";

export type ModalComponentType = JSX.Element;

type ModalStateType = {
  addModal: (modal: ModalComponentType) => void;
  removeModal: () => void;
};

export const ModalContext = createContext<ModalStateType>({
  addModal: () => {},
  removeModal: () => {},
});
