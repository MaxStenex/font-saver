import { useModal } from "@/state/modal";
import React from "react";
import { AddNewFontModal } from "../modals";
import { classNames } from "@/utils/classNames";

type Props = {
  cardClasses: string;
};

export const AddNewFontBtn: React.FC<Props> = ({ cardClasses }) => {
  const { show: showAddNewFontModal } = useModal(AddNewFontModal);

  const onAddNewFontClick = () => {
    showAddNewFontModal();
  };

  return (
    <li
      className={classNames(
        cardClasses,
        "font-bold !text-base !bg-slate-300 hover:!bg-slate-400"
      )}
      onClick={onAddNewFontClick}
    >
      Add new font
    </li>
  );
};
