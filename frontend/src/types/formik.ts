import { FormikValues, useFormik } from "formik";

export type UseFormikType<T extends FormikValues> = ReturnType<typeof useFormik<T>>;
