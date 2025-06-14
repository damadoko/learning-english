// services/messageService.ts
import axios, { AxiosError } from "axios";
import { API_AUTH_URL, USER_TOKEN_STORAGE_NAME } from "../constants";

export type LoginRegisterPayload = {
  username: string;
  password: string;
};

export type AuthResponseSuccess = {
  success: true;
  user: {
    id: string;
    username: string;
  };
};

export type AuthResponseFailed = {
  success: false;
  error: {
    message: string;
  };
};

export type AuthResponse = AuthResponseSuccess | AuthResponseFailed;

export type LoginResponse = {
  token: string;
} & AuthResponse;

export const login = async (
  payload: LoginRegisterPayload
): Promise<AuthResponse> => {
  try {
    const res = await axios.post<LoginResponse>(
      `${API_AUTH_URL}/login`,
      payload
    );
    const { token, ...rest } = res.data;
    localStorage.setItem(USER_TOKEN_STORAGE_NAME, token);
    return rest;
  } catch (error) {
    return (error as AxiosError)?.response?.data as AuthResponse;
  }
};

export const register = async (
  payload: LoginRegisterPayload
): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(
      `${API_AUTH_URL}/register`,
      payload
    );
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as AuthResponse;
  }
};
