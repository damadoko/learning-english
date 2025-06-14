import axios from "./axiosInstance";

import type { Message } from "../types";

export const getMessages = async (): Promise<Message[]> => {
  const res = await axios.get("/chat/history");
  return res.data;
};

export const sendMessage = async (message: string): Promise<Message> => {
  const res = await axios.post("/chat/send", { message });
  return res.data;
};
