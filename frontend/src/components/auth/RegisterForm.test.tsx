import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

describe("Register form test", () => {
  it("Should render register form", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RegisterForm />
      </MemoryRouter>
    );
  });
});
