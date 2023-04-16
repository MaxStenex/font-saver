import { closeSvg } from "@/assets/icons";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  closeModal: () => void;
};

export const ModalWrapper: React.FC<Props> = ({ children, title, closeModal }) => {
  return (
    <div className="h-screen w-screen left-0 top-0 fixed z-50 p-4">
      <div className="relative w-full h-full">
        <div
          className="bg-black opacity-50 h-full w-full fixed left-0 top-0"
          onClick={closeModal}
        ></div>
        <div
          className="absolute-center !relative rounded w-96 bg-white h-96 max-h-full overflow-auto
          p-5"
        >
          <header className="relative flex items-center mb-6">
            <h3 className="mr-6 font-bold text-2xl">{title}</h3>
            <img
              src={closeSvg}
              className="w-5 h-5 absolute right-0 cursor-pointer"
              alt=""
              onClick={closeModal}
            />
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};
