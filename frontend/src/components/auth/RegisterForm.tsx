import { Link, useNavigate } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormField } from "../forms";
import { RegisterDto } from "@/types/auth";
import { authService } from "@/api";
import { useState } from "react";
import { ErrorMessage } from "../common";
import { getApiErrorMessage } from "@/utils";

const validationSchema = Yup.object({
  email: Yup.string().email("Email should be valid").required("Email is required"),
  username: Yup.string()
    .min(2, "Minimum length is 2")
    .max(64, "Maximum length is 64")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Minimum length is 6")
    .max(64, "Maximum length is 64")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .test("Passwords match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const RegisterForm = () => {
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik<RegisterDto & { confirmPassword: string }>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async ({ email, password, username }, { setErrors }) => {
      try {
        setGeneralError("");
        await authService.register({ email, password, username });
        navigate("/login");
      } catch (error) {
        const errorMessage = getApiErrorMessage(error);
        const regex = /user with \((\w+)\)=\((.*?)\) already exists/;
        const match = errorMessage.match(regex);

        if (match) {
          const field = match[1];
          setErrors({ [field]: `${field} already exists` });
          return field;
        }

        return setGeneralError(errorMessage);
      }
    },
  });

  return (
    <AuthFormWrapper
      title="Register form"
      content={
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <FormField formik={formik} name="email" label="Email" type="email" />
          <FormField formik={formik} name="username" label="Username" />
          <div className="flex justify-between">
            <div className="flex-1 max-w-[48%]">
              <FormField
                formik={formik}
                name="password"
                type="password"
                label="Password"
              />
            </div>
            <div className="flex-1 max-w-[48%]">
              <FormField
                formik={formik}
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </div>
          </div>
          <ErrorMessage text={generalError} />
          <div className="mt-3 flex">
            <button type="submit" className="primary-btn mr-3 max-w-[48%] flex-1">
              Register
            </button>
            <Link to="/login" className="secondary-btn flex-1 !px-0 max-w-[48%]">
              Have an account?
            </Link>
          </div>
        </form>
      }
    />
  );
};
