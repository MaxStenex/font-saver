import React from "react";

export type TextFieldProps = {
  label: string;
  error?: string;
} & React.HTMLProps<HTMLInputElement>;

export const TextField: React.FC<TextFieldProps> = ({ label, error, ...rest }) => {
  return (
    <div className="field-wrapper">
      <span className="field-label">{label}</span>
      <input className="field" type="text" {...rest} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};
