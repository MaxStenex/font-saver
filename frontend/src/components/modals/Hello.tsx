import { useModal } from "@/state/modal";
import React from "react";

type Props = {
  name: string;
};

export const HelloModal: React.FC<Props> = ({ name }) => {
  const { hide } = useModal();
  return <div onClick={() => hide()}>Hello, {name}!</div>;
};
