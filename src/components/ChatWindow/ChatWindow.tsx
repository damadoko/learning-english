import React, { useState, useEffect } from "react";
import { Paper, Box } from "@mui/material";

import type { Message } from "../../types";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import { getMessages } from "../../services";

type ChatWindowProps = {
  username?: string;
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!username) return;
    getMessages().then((data) => {
      if (!data.success) return;
      setMessages(data.messages);
    });
  }, [username]);

  const handleSendMessage = async (text: string) => {
    const userMsg = { id: "1", role: "user", content: text } as const;
    setMessages((prev) => [...prev, userMsg]);

    //Todo: Call API

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "TBU", id: "1" } as const,
    ]);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "85vh",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatBox messages={messages} />
      <Box mt="auto" p={2}>
        <ChatInput onSend={handleSendMessage} />
      </Box>
    </Paper>
  );
};
