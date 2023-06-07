import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormField } from "../forms";
import { AuthFormWrapper } from "./FormWrapper";

const validationSchema = Yup.object({
  email: Yup.string().email("Email should be valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      navigate("/");
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
