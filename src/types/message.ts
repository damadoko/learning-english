export type Message = {
  role: "user" | "assistant" | "anonymous";
  content: string;
};
