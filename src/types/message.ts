import type { GenericFailedResponse } from "./generic";

export type MessageErrorState = "none" | "retrying" | "failed";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  errorState?: MessageErrorState;
};

export type MessagesSuccessResponse = {
  success: true;
  messages: Message[];
};

export type MessageResponse = MessagesSuccessResponse | GenericFailedResponse;
