import { AxiosError } from "axios";

import axios from "./axiosInstance";
import { saveToken } from "../utils/authUtil";
import type {
  AuthResponse,
  AuthSuccessResponse,
  GenericFailedResponse,
  LoginResponse,
} from "../types";

export type LoginRegisterPayload = {
  username: string;
  password: string;
};

export const login = async (
  payload: LoginRegisterPayload
): Promise<AuthResponse> => {
  try {
    const res = await axios.post<LoginResponse>("/auth/login", payload);
    const { token, ...rest } = res.data;
    saveToken(token);
    return rest;
  } catch (error) {
    return (error as AxiosError)?.response?.data as GenericFailedResponse;
  }
};

export const register = async (
  payload: LoginRegisterPayload
): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthSuccessResponse>(
      "/auth/register",
      payload
    );
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as GenericFailedResponse;
  }
};

export const authToken = async (): Promise<AuthResponse> => {
  try {
    const res = await axios.get<AuthSuccessResponse>("/auth");
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as GenericFailedResponse;
  }
};
