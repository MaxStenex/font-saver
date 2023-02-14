import { checkMarkSvg } from "@/assets/icons";
import { AddNewFontModal } from "@/components/modals";
import { useModal } from "@/state/modal";
import React, { useState } from "react";

export type FontType = {
  id: number | string;
  name: string;
};

type Props = {
  baseClasses: string;
} & FontType;

export const FontCard: React.FC<Props> = ({ baseClasses, name }) => {
  const [isSelected, setIsSelected] = useState(false);
  const addNewFontModal = useModal(AddNewFontModal);

  const onSelectFontClick = () => setIsSelected((prev) => !prev);

  const onFontCardDoubleClick = () => {
    addNewFontModal.show();
  };

  return (
    <li
      className={`${baseClasses} flex items-center select-none`}
      onDoubleClick={onFontCardDoubleClick}
    >
      <span>{name}</span>
      <div
        className="rounded-full w-9 h-9 border-2 border-gray-400 ml-4
        relative hover:bg-white"
        onClick={onSelectFontClick}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {isSelected && (
          <img
            className="w-[120%] max-w-none absolute-center ml-1 z-10"
            src={checkMarkSvg}
            alt=""
          />
        )}
      </div>
    </li>
  );
};
