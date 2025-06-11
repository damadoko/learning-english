import { Box } from "@mui/material";

import type { Message } from "../types";
import { MessageItem } from "./MessageItem";

export type ChatBoxProps = {
  messages: Message[];
};

export const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <Box
      sx={{ flexGrow: 1, overflowY: "auto", px: 3, py: 2, bgcolor: "#f5f5f5" }}
    >
      {messages.map((msg) => (
        <MessageItem message={msg} />
      ))}
    </Box>
  );
};
