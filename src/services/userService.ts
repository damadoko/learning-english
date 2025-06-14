// services/messageService.ts
import axios from "axios";
import { API_AUTH_URL, USER_TOKEN_STORAGE_NAME } from "../constants";

type LoginRegisterPayload = {
  username: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  user: {
    id: string;
    username: string;
  };
};

type LoginResponse = {
  token: string;
} & RegisterResponse;

export const login = async (
  payload: LoginRegisterPayload
): Promise<RegisterResponse> => {
  const res = await axios.post<LoginResponse>(`${API_AUTH_URL}/login`, payload);
  const { token, ...rest } = res.data;
  localStorage.setItem(USER_TOKEN_STORAGE_NAME, token);
  return rest;
};

export const register = async (
  payload: LoginRegisterPayload
): Promise<RegisterResponse> => {
  const res = await axios.post<RegisterResponse>(
    `${API_AUTH_URL}/register`,
    payload
  );
  return res.data;
};
