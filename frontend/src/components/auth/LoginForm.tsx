import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";
import { TextField } from "@/uikit/inputs";
import { useFormik } from "formik";
import * as Yup from "yup";

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
          <TextField {...formik.getFieldProps("email")} label="Email" type="email" />
          <TextField
            {...formik.getFieldProps("password")}
            label="Password"
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
