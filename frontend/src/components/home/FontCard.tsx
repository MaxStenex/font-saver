import { FontType } from "@/types/font";
import { SelectButton } from "@/uikit/buttons/SelectButton";
import { classNames } from "@/utils/classNames";
import React, { useState } from "react";

type Props = {
  baseClasses: string;
  onClick: (fontInfo: FontType) => void;
} & FontType;

export const FontCard: React.FC<Props> = ({ onClick, baseClasses, ...font }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onSelectFontClick = () => setIsSelected((prev) => !prev);

  return (
    <li
      className={classNames(baseClasses, "flex items-center select-none")}
      onClick={() => onClick(font)}
    >
      <span>{font.name}</span>
      <SelectButton
        onClick={(e) => {
          e.stopPropagation();
          onSelectFontClick();
        }}
        onDoubleClick={(e) => e.stopPropagation()}
        isActive={isSelected}
        className="ml-4"
      />
    </li>
  );
};
