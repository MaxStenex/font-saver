import { LoginDto, RegisterDto } from "@/types/auth";
import { apiInstance } from "./instance";

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
  accessToken: string = "";

  setAccessToken(token: string) {
    this.accessToken = token;
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

  async refreshTokens() {
    const { data } = await apiInstance.post<RefreshTokensResponseData>(
      "/auth/refresh-tokens"
    );
    this.setAccessToken(data.accessToken);
  }
}

export const authService = new AuthService();
