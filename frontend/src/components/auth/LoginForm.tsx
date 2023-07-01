import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormField } from "../forms";
import { AuthFormWrapper } from "./FormWrapper";
import { LoginDto } from "@/types/auth";
import { authService } from "@/api";
import { useState } from "react";
import { ErrorMessage } from "@/components/common";
import { getApiErrorMessage } from "@/utils";

const validationSchema = Yup.object({
  email: Yup.string().email("Email should be valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik<LoginDto>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setGeneralError("");
        await authService.login(values);
        navigate("/");
      } catch (error) {
        setGeneralError(getApiErrorMessage(error));
      }
    },
  });

  return (
    <AuthFormWrapper
      title="Log in"
      content={
        <form onSubmit={formik.handleSubmit}>
          <FormField data-testid="email" formik={formik} label="Email" name="email" />
          <FormField
            data-testid="password"
            formik={formik}
            label="Password"
            name="password"
            type="password"
          />
          <ErrorMessage text={generalError} />
          <div className="flex mt-3">
            <button type="submit" className="primary-btn mr-3 flex-[1_0_48%]">
              Login
            </button>
            <Link to="/register" className="secondary-btn w-48 !px-0">
              Register an account
            </Link>
          </div>
        </form>
      }
    />
  );
};
