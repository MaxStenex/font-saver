import { useModal } from "@/state/modal";
import React from "react";
import { ModalWrapper } from "./Wrapper";

export const AddNewFontModal: React.FC = () => {
  const { hide } = useModal(AddNewFontModal);
  return (
    <ModalWrapper title="New font" closeModal={hide}>
      Add new font
    </ModalWrapper>
  );
};
