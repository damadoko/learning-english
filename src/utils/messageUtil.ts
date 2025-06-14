import type { Message, MessageErrorState } from "../types";

export type SimulateTypingParams = {
  fullText: string;
  onUpdate: (current: string) => void;
};

export const handleUpdateChatItem =
  (currentText: string) => (prev: Message[]) => {
    const lastMessage = prev.slice(-1)[0];
    const remainingMessage = prev.slice(0, -1);
    return [...remainingMessage, { ...lastMessage, content: currentText }];
  };

export const markLastSendNeedRetry =
  (errorState: MessageErrorState) =>
  (prev: Message[]): Message[] => {
    const lastMessage = prev.slice(-1)[0];
    const remainingMessage = prev.slice(0, -1);
    return [...remainingMessage, { ...lastMessage, errorState }];
  };

export const simulateTyping = ({
  fullText,
  onUpdate,
}: SimulateTypingParams): void => {
  let index = 0;

  const interval = setInterval(() => {
    index += 2;
    const current = fullText.slice(0, index);
    onUpdate(current);

    if (index >= fullText.length) {
      clearInterval(interval);
    }
  }, 30);
};

export const getSelectedWord = () => {
  const selection = window.getSelection();
  return selection?.toString().trim() || "";
};
