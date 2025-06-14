import type { GenericFailedResponse } from "./generic";

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
