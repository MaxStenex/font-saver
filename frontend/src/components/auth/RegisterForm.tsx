import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormField } from "../forms";

const validationSchema = Yup.object({
  email: Yup.string().email("Email should be valid").required("Email is required"),
  firstName: Yup.string()
    .max(100, "Maximum length is 50")
    .required("First name is required"),
  lastName: Yup.string()
    .max(100, "Maximum length is 50")
    .required("Last name should be required"),
  password: Yup.string()
    .min(7, "Minimum length is 7")
    .max(255, "Maximum length is 255")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .test("Passwords match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
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
      title="Register form"
      content={
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <FormField formik={formik} name="email" label="Email" type="email" />
          <div className="flex justify-between">
            <div className="flex-1 max-w-[48%]">
              <FormField formik={formik} name="firstName" label="First Name" />
            </div>
            <div className="flex-1 max-w-[48%]">
              <FormField formik={formik} name="lastName" label="Last Name" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-1 max-w-[48%]">
              <FormField formik={formik} name="password" type="password" label="Email" />
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
