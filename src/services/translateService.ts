import { AxiosError } from "axios";

import axios from "./axiosInstance";
import type {
  GenericFailedResponse,
  TranslateResponse,
  TranslateSuccessResponse,
} from "../types";

export const fetchTranslation = async (
  word: string
): Promise<TranslateResponse> => {
  try {
    const response = await axios.get<TranslateSuccessResponse>(
      `/translate?word=${word}`
    );
    return response.data;
  } catch (error) {
    return (error as AxiosError)?.response?.data as GenericFailedResponse;
  }
};
