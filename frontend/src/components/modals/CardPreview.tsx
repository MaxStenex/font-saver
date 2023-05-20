import React from "react";
import { ModalWrapper } from "./Wrapper";
import { useModal } from "@/state/modal";
import { FontType } from "@/types/font";

type Props = {} & FontType;

export const CardPreviewModal: React.FC<Props> = ({ ...font }) => {
  const { hide } = useModal(CardPreviewModal);

  return (
    <ModalWrapper title={font.name} closeModal={hide}>
      <div className="flex justify-between flex-col flex-1">
        <div className="flex-1">Some code examples would be here....</div>
        <button className="primary-btn">Download</button>
      </div>
    </ModalWrapper>
  );
};
