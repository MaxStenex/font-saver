import { AxiosError } from "axios";

const unknownError = "Something went wront";

export const getApiErrorMessage = (error: unknown): string => {
  if (!(error instanceof AxiosError)) return unknownError;

  if (error.response?.data?.message) {
    const m: string | string[] = error.response.data.message;
    return Array.isArray(m) ? m[0] : m;
  }

  return unknownError;
};
