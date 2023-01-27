import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";

export const LoginForm = () => {
  return (
    <AuthFormWrapper
      title="Log in"
      content={
        <form>
          <div className="field-wrapper">
            <span className="field-label">Email</span>
            <input className="field" type="email" />
          </div>
          <div className="field-wrapper">
            <span className="field-label">Password</span>
            <input className="field" type="password" />
          </div>
          <div className="flex mt-3">
            <button className="primary-btn mr-3 flex-[1_0_48%]">Login</button>
            <Link to="/register" className="secondary-btn w-48 !px-0">
              Register an account
            </Link>
          </div>
        </form>
      }
    />
  );
};
