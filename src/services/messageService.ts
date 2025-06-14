import axios from "./axiosInstance";

import type {
  Message,
  MessageResponse,
  MessagesSuccessResponse,
  GenericFailedResponse,
} from "../types";
import type { AxiosError } from "axios";

type MessagesResponseSuccess = {
  success: true;
  messages: Message[];
};

export const getMessages = async (): Promise<MessageResponse> => {
  try {
    const res = await axios.get<MessagesSuccessResponse>("/chat/history");
    return res.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as GenericFailedResponse;
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
    return (error as AxiosError)?.response?.data as GenericFailedResponse;
  }
};
