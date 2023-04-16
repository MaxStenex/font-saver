import { Link } from "react-router-dom";
import { AuthFormWrapper } from "./FormWrapper";
import { TextField } from "@/uikit/inputs";

export const LoginForm = () => {
  return (
    <AuthFormWrapper
      title="Log in"
      content={
        <form>
          <TextField label="Email" type="email" />
          <TextField label="Password" type="password" />
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
