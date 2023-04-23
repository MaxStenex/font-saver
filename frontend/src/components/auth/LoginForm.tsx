import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormField } from "../forms";

const validationSchema = Yup.object({
  email: Yup.string().email("Email should be valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <AuthFormWrapper
      title="Log in"
      content={
        <form onSubmit={formik.handleSubmit}>
          <FormField formik={formik} label="Email" name="email" />
          <FormField formik={formik} label="Password" name="password" type="password" />
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
