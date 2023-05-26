import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { describe, it, vi } from "vitest";
import { LoginForm } from "./LoginForm";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  const mockedUsedNavigate = vi.fn();

  return {
    ...(actual as object),
    useNavigate: () => mockedUsedNavigate,
  };
});

describe("Login form test", () => {
  it("Should render login form", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginForm />
      </MemoryRouter>
    );
  });

  it("Should navigate user to home page after successfull login", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginForm />
      </MemoryRouter>
    );
    const navigate = useNavigate();

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(navigate).toBeCalledWith("/"));
  });
});
