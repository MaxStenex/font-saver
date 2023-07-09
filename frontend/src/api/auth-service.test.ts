import { LoginDto, RegisterDto } from "@/types/auth";
import axios from "axios";
import { LoginResponseData, authService } from "./auth-service";
import { apiInstance } from "./instance";
import { User } from "@/types/user";

vi.mock("./instance", async () => {
  const instance = axios.create();
  const MockAdapter = await vi.importActual<typeof import("axios-mock-adapter")>(
    "axios-mock-adapter"
  );

  const mock = new MockAdapter.default(instance);
  mock
    .onPost("/users/create", {
      email: "valid@valid.com",
      password: "superbob",
      username: "bob",
    } as RegisterDto)
    .reply(200);

  mock
    .onPost("/auth/login", {
      email: "bob@bob.com",
      password: "bob1234",
    } as LoginDto)
    .reply<LoginResponseData>(200, { accessToken: "ACCESS_TOKEN" });

  mock
    .onPost("/auth/login", {
      email: "invalidbob@bob.com",
      password: "invalidbob1234",
    } as LoginDto)
    .reply(401, { message: "Invalid email or pass" });

  mock.onPost("/auth/logout").reply(200);

  mock.onPost("/auth/refresh-tokens").reply(200, { accessToken: "ACCESS_TOKEN2" });

  mock.onGet("/auth/me").reply<User>(200, {
    id: 123,
    email: "bob@bob.com",
    username: "superbob",
  });

  return { apiInstance: instance };
});

describe("Auth service test", () => {
  it("Should return status 200, when user successfully register an account", async () => {
    const data = await authService.register({
      email: "valid@valid.com",
      password: "superbob",
      username: "bob",
    });

    expect(data.status).toBe(200);
  });

  it("Should save user access token, when user successfully logged in", async () => {
    const data = await authService.login({
      email: "bob@bob.com",
      password: "bob1234",
    });

    expect(data.accessToken).toBe("ACCESS_TOKEN");
    expect(apiInstance.defaults.headers.common.Authorization).toBe("Bearer ACCESS_TOKEN");
  });

  it("Should return an error message, if user credentials are not valid", async () => {
    expect.assertions(1);

    await authService
      .login({
        email: "invalidbob@bob.com",
        password: "invalidbob1234",
      })
      .catch((err) => {
        expect(err.response.data.message).toBe("Invalid email or pass");
      });
  });

  it("Should clear an access token from service after logout", async () => {
    apiInstance.defaults.headers.common.Authorization = "Bearer ACCESS_TOKEN";

    await authService.logout();

    expect(apiInstance.defaults.headers.common.Authorization).toBe("");
  });

  it("Should refresh access token, after successfull refresh-tokens request", async () => {
    apiInstance.defaults.headers.common.Authorization = "Bearer ACCESS_TOKEN1";

    await authService.refreshTokens();

    expect(apiInstance.defaults.headers.common.Authorization).toBe(
      "Bearer ACCESS_TOKEN2"
    );
  });
});
