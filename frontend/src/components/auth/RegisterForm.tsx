import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";
import { TextField } from "@/uikit/inputs";

export const RegisterForm = () => {
  return (
    <AuthFormWrapper
      title="Register form"
      content={
        <form className="flex flex-col">
          <TextField label="Email" type="email" />
          <div className="flex justify-between">
            <div className="flex-1 max-w-[48%]">
              <TextField label="First Name" />
            </div>
            <div className="flex-1 max-w-[48%]">
              <TextField label="Last Name" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-1 max-w-[48%]">
              <TextField label="Password" type="password" />
            </div>
            <div className="flex-1 max-w-[48%]">
              <TextField label="Confirm password" type="password" />
            </div>
          </div>
          <div className="mt-3 flex">
            <button className="primary-btn mr-3 max-w-[48%] flex-1">Register</button>
            <Link to="/login" className="secondary-btn flex-1 !px-0 max-w-[48%]">
              Have an account?
            </Link>
          </div>
        </form>
      }
    />
  );
};
