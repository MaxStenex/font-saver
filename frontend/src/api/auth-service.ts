import { LoginDto, RegisterDto } from "@/types/auth";
import { apiInstance } from "./instance";
import { User } from "@/types/user";

export interface LoginResponseData {
  accessToken: string;
}

interface RefreshTokensResponseData {
  accessToken: string;
}

export interface RegisterResponseData {
  status: number;
  message: string;
}

class AuthService {
  private setAccessToken(token: string) {
    apiInstance.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  }

  async login({ email, password }: LoginDto) {
    const { data } = await apiInstance.post<LoginResponseData>("/auth/login", {
      email,
      password,
    });
    this.setAccessToken(data.accessToken);

    return data;
  }

  async register(dto: RegisterDto) {
    return await apiInstance.post<RegisterResponseData>("/users/create", dto);
  }

  async logout() {
    await apiInstance.post("/auth/logout");
    this.setAccessToken("");
  }

  async refreshTokens(): Promise<void> {
    const { data } = await apiInstance.post<RefreshTokensResponseData>(
      "/auth/refresh-tokens"
    );
    this.setAccessToken(data.accessToken);
  }

  async me() {
    const { data } = await apiInstance.get<User>("/auth/me");

    return data;
  }
}

export const authService = new AuthService();
