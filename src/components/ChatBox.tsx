import { Box, Typography } from "@mui/material";

import type { Message } from "../types";

export type ChatBoxProps = {
  messages: Message[];
};

export const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1 }}>
      {messages.map((msg, i) => (
        <Box key={i} sx={{ mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {msg.role === "user" ? "You:" : "Tutor:"}
          </Typography>
          <Typography variant="body1">{msg.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};
