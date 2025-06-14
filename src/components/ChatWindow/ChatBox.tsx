import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

import type { Message } from "../../types";
import { MessageItem } from "./MessageItem";

export type ChatBoxProps = {
  messages: Message[];
  onRetry: (msg: Message) => void;
};

export const ChatBox: React.FC<ChatBoxProps> = ({ messages, onRetry }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{ flexGrow: 1, overflowY: "auto", px: 3, py: 2, bgcolor: "#f5f5f5" }}
    >
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          retryHandler={() => onRetry(msg)}
        />
      ))}
      <div ref={bottomRef} />
    </Box>
  );
};
