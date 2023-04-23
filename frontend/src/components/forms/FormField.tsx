import { UseFormikType } from "@/types/formik";
import { TextField } from "@/uikit/inputs";
import { TextFieldProps } from "@/uikit/inputs/TextField";
import { FormikValues } from "formik";

interface Props<T extends FormikValues> extends Omit<TextFieldProps, "name"> {
  formik: UseFormikType<T>;
  name: keyof T;
}

export const FormField = <T extends FormikValues>({
  formik,
  label,
  name,
  ...rest
}: Props<T>) => {
  return (
    <TextField
      label={label}
      error={formik.errors[name] as string}
      {...formik.getFieldProps(name)}
      {...rest}
    />
  );
};
