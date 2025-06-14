import axios from "axios";

import type { Message } from "../types";
import { API_MESSAGE_URL } from "../constants";

export const getMessages = async (): Promise<Message[]> => {
  const res = await axios.get(`${API_MESSAGE_URL}/history`);
  return res.data;
};

export const sendMessage = async (message: string): Promise<Message> => {
  const res = await axios.post(`${API_MESSAGE_URL}/send`, { message });
  return res.data;
};
