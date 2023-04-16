import { FieldInputProps } from "formik";
import React from "react";

type Props = {
  label: string;
} & Partial<FieldInputProps<string>> &
  React.HTMLProps<HTMLInputElement>;

export const TextField: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <div className="field-wrapper">
      <span className="field-label">{label}</span>
      <input className="field" type="text" {...rest} />
    </div>
  );
};
