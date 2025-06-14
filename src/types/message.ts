export type MessageErrorState = "none" | "retrying" | "failed";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  errorState?: MessageErrorState;
};
