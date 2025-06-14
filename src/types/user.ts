import type { GenericFailedResponse } from "./generic";

export type User = {
  email: string;
  id?: number;
  name?: string;
};

export type AuthSuccessResponse = {
  success: true;
  user: {
    id: string;
    username: string;
  };
};

export type AuthResponse = AuthSuccessResponse | GenericFailedResponse;

export type LoginResponse = {
  token: string;
} & AuthResponse;
