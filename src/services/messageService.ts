import axios from "./axiosInstance";

import type { Message } from "../types";
import type { AxiosError } from "axios";

type MessagesResponseSuccess = {
  success: true;
  messages: Message[];
};

type MessagesResponseFailed = {
  success: false;
  error: { message: string };
};

type MessageResponse = MessagesResponseSuccess | MessagesResponseFailed;

export const getMessages = async (): Promise<MessageResponse> => {
  try {
    const res = await axios.get<MessagesResponseSuccess>("/chat/history");
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as MessagesResponseFailed;
  }
};

export const sendMessage = async (
  message: string
): Promise<MessageResponse> => {
  try {
    const res = await axios.post<MessagesResponseSuccess>("/chat/send", {
      message,
    });
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as MessagesResponseFailed;
  }
};
