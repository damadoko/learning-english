import { AxiosError } from "axios";

import axios from "./axiosInstance";
import { saveToken } from "../utils/authUtil";

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
    const res = await axios.post<LoginResponse>("/auth/login", payload);
    const { token, ...rest } = res.data;
    saveToken(token);
    return rest;
  } catch (error) {
    return (error as AxiosError)?.response?.data as AuthResponse;
  }
};

export const register = async (
  payload: LoginRegisterPayload
): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>("/auth/register", payload);
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as AuthResponse;
  }
};

export const authToken = async (): Promise<AuthResponse> => {
  try {
    const res = await axios.get<AuthResponse>("/auth");
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as AuthResponse;
  }
};
