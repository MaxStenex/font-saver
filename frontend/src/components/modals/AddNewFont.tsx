import { useModal } from "@/state/modal";
import { useFormik } from "formik";
import React from "react";
import { ModalWrapper } from "./Wrapper";
import * as Yup from "yup";
import { closeSvg } from "@/assets/icons";

const validationSchema = Yup.object({
  fileName: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("This field is required"),
  file: Yup.string().required("File is required"),
});

type FormValues = {
  fileName: string;
  file: null | File;
};

export const AddNewFontModal: React.FC = () => {
  const { hide } = useModal(AddNewFontModal);
  const formik = useFormik<FormValues>({
    initialValues: {
      fileName: "",
      file: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });
  const selectedFile = formik.values.file;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    formik.setFieldValue("file", file);
  };

  return (
    <ModalWrapper title="New font" closeModal={hide}>
      <form onSubmit={formik.handleSubmit}>
        <button className="secondary-btn w-full relative">
          <input
            type="file"
            className="z-10 absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
            onChange={onFileChange}
          />
          Select file
        </button>
        <h4 className="mt-3 font-bold">Selected file:</h4>

        {formik.submitCount > 0 && !selectedFile ? (
          <span className="field-error">{formik.errors.file}</span>
        ) : (
          <div className="flex justify-between mt-1 items-center">
            <span className="flex-1 text-ellipsis whitespace-nowrap overflow-hidden">
              {selectedFile?.name}
            </span>
            {selectedFile && (
              <button type="button" onClick={() => formik.setFieldValue("file", null)}>
                <img src={closeSvg} className="w-3 h-3 ml-3" alt="" />
              </button>
            )}
          </div>
        )}

        <div className="field-wrapper mt-3">
          <span className="field-label">File name</span>
          <input {...formik.getFieldProps("fileName")} className="field" type="text" />
          <span className="field-error">{formik.errors.fileName}</span>
        </div>

        <button className="primary-btn w-full mt-5" type="submit">
          Upload
        </button>
      </form>
    </ModalWrapper>
  );
};
