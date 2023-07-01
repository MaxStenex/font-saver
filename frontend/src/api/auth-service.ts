import { LoginDto, RegisterDto } from "@/types/auth";
import { apiInstance } from "./instance";
import { User } from "@/types/user";

interface LoginResponseData {
  accessToken: string;
}

interface RegisterResponseData extends User {}

class AuthService {
  accessTokenStorageName = "at";

  saveAccessToken(token: string): void {
    window.localStorage.setItem(this.accessTokenStorageName, token);
  }

  getAccessToken(): string | null {
    return window.localStorage.getItem(this.accessTokenStorageName);
  }

  async login({ email, password }: LoginDto) {
    const { data } = await apiInstance.post<LoginResponseData>("/auth/login", {
      email,
      password,
    });
    this.saveAccessToken(data.accessToken);

    return data;
  }

  async register(dto: RegisterDto) {
    return await apiInstance.post<RegisterResponseData>("/users/create", dto);
  }
}

export const authService = new AuthService();
