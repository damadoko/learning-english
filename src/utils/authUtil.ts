import { USER_TOKEN_STORAGE_NAME } from "../constants";

export const saveToken = (token: string) => {
  localStorage.setItem(USER_TOKEN_STORAGE_NAME, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(USER_TOKEN_STORAGE_NAME);
};

export const clearToken = () => {
  localStorage.removeItem(USER_TOKEN_STORAGE_NAME);
};
