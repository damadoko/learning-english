export type Message = {
  id: string;
  role: "user" | "assistant" | "anonymous";
  content: string;
};
