import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";

export const RegisterForm = () => {
  return (
    <AuthFormWrapper
      title="Register form"
      content={
        <form className="flex flex-col">
          <div className="flex gap-3">
            <div className="field-wrapper flex-1">
              <span className="field-label">First Name</span>
              <input type="text" className="field w-full" />
            </div>
            <div className="field-wrapper flex-1">
              <span className="field-label">Last Name</span>
              <input type="text" className="field w-full" />
            </div>
          </div>
          <div className="field-wrapper">
            <span className="field-label">Your email</span>
            <input className="field" type="email" />
          </div>
          <div className="flex gap-3">
            <div className="field-wrapper flex-1">
              <span className="field-label">Password</span>
              <input className="field w-full" type="password" />
            </div>
            <div className="field-wrapper flex-1">
              <span className="field-label">Confirm password</span>
              <input className="field w-full" type="password" />
            </div>
          </div>
          <div className="mt-3 flex">
            <button className="primary-btn mr-3 flex-[1_0_48%]">Register</button>
            <Link to="/login" className="secondary-btn !px-0 w-48">
              Have an account?
            </Link>
          </div>
        </form>
      }
    />
  );
};
