import { checkMarkSvg } from "@/assets/icons";
import React from "react";

type Props = { isActive: boolean } & React.HTMLAttributes<HTMLButtonElement>;

export const SelectButton: React.FC<Props> = ({ isActive, ...buttonProps }) => {
  return (
    <button
      {...buttonProps}
      className={
        `rounded-full w-9 h-9 border-2 border-gray-400 
         relative hover:bg-white ` + (buttonProps.className || "")
      }
    >
      {isActive && (
        <img
          className="w-[120%] max-w-none absolute-center ml-1 z-10"
          src={checkMarkSvg}
          alt=""
        />
      )}
    </button>
  );
};
