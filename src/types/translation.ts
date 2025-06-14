import type { GenericFailedResponse } from ".";

export type Translation = {
  en: string;
  vi?: string;
  enDefinition?: string;
  pronunciation?: string;
};

export type TranslateSuccessResponse = {
  success: true;
  translate: Translation;
};

export type TranslateResponse = TranslateSuccessResponse | GenericFailedResponse;
