import { AxiosError } from "axios";

const unknownError = "Something went wront";

export const getApiErrorMessage = (error: unknown): string => {
  if (!(error instanceof AxiosError)) return unknownError;

  if (error.response?.data?.message) return error.response.data.message;

  return unknownError;
};
