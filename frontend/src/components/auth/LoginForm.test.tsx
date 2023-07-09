import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { LoginResponseData, authService } from "@/api";
import { LoginDto } from "@/types/auth";
import { AxiosError } from "axios";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  const mockedUseNavigate = vi.fn();

  return {
    ...(actual as object),
    useNavigate: () => mockedUseNavigate,
  };
});

vi.mock("@/api", async () => {
  const validUserLoginDto: LoginDto = {
    email: "bob@bob.com",
    password: "bob1337",
  };

  const AuthService = vi.fn(() => ({
    login: vi.fn((dto: LoginDto): Promise<LoginResponseData> => {
      if (
        dto.email === validUserLoginDto.email &&
        dto.password === validUserLoginDto.password
      ) {
        return Promise.resolve({
          accessToken: "ACCESS_TOKEN",
        });
      } else {
        throw new AxiosError("Invalid login or password");
      }
    }),
  }));

  return {
    authService: new AuthService(),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
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
      target: { value: "bob@bob.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "bob1337" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(authService.login).toBeCalled());
    expect(navigate).toBeCalledWith("/");
  });

  it("Should show error message, if user inserted invalid credentials", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginForm />
      </MemoryRouter>
    );
    const navigate = useNavigate();

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "invalidemail@bob.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "invalidpassword" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(authService.login).toBeCalled());
    expect(navigate).not.toBeCalled();
  });
});
