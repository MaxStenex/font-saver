import React from "react";
import { ModalWrapper } from "./Wrapper";
import { useModal } from "@/state/modal";

type Props = {
  onOkClick: (params: unknown) => unknown;
  onCancelClick: (params: unknown) => unknown;
  title: string;
  postTitle?: string;
};

export const ConfirmActionModal: React.FC<Props> = ({
  onCancelClick,
  onOkClick,
  title,
  postTitle,
}) => {
  const { hide } = useModal(ConfirmActionModal);

  return (
    <ModalWrapper title={title} closeModal={hide}>
      <div className="text-base">{postTitle}</div>
      <div className="mt-6 flex justify-end">
        <button onClick={onOkClick} className="primary-btn mr-3">
          Ok
        </button>
        <button onClick={onCancelClick} className="secondary-btn">
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
};
