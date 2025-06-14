import axios from "./axiosInstance";

import type { Message } from "../types";
import type { AxiosError } from "axios";

type GetMessagesResponseSuccess = {
  success: true;
  messages: Message[];
};

type GetMessagesResponseFailed = {
  success: false;
  error: { message: string };
};

type GetMessageResponse =
  | GetMessagesResponseSuccess
  | GetMessagesResponseFailed;

export const getMessages = async (): Promise<GetMessageResponse> => {
  try {
    const res = await axios.get<GetMessagesResponseSuccess>("/chat/history");
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as GetMessagesResponseFailed;
  }
};

export const sendMessage = async (message: string): Promise<Message> => {
  const res = await axios.post("/chat/send", { message });
  return res.data;
};
