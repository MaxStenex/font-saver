import React from "react";

interface Props {
  text: string;
}

export const ErrorMessage: React.FC<Props> = ({ text }) => {
  if (!text) return null;

  return <span className="text-red-500 font-bold text-sm">{text}</span>;
};
