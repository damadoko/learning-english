import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Backdrop,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

import type { Message } from "../../types";
import { ChatBox } from "./ChatBox";
import { ChatInput } from "./ChatInput";
import { getMessages, sendMessage } from "../../services";
import {
  handleUpdateChatItem,
  markLastSendNeedRetry,
  simulateTyping,
} from "../../utils/messageUtil";

type ChatWindowProps = {
  username?: string;
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGetHistory = async () => {
    setIsError(false);
    setIsLoading(true);
    const data = await getMessages();
    setIsLoading(false);
    if (!data.success) {
      setIsError(true);
      return;
    }
    setMessages(data.messages);
  };

  useEffect(() => {
    if (!username) return;
    handleGetHistory();
  }, [username]);

  const handleSendMessage = async (msg: Message): Promise<Message | null> => {
    if (msg.errorState === "none") {
      setMessages((prev) => [...prev, msg]);
    }

    setMessages(markLastSendNeedRetry("retrying"));
    const data = await sendMessage(msg.content);
    if (!data.success) {
      setMessages(markLastSendNeedRetry("failed"));
      return null;
    }

    if (msg.errorState !== "none") {
      setMessages(markLastSendNeedRetry("none"));
    }

    setMessages((prev) => [...prev, { ...data.messages?.[0], content: "" }]);
    simulateTyping({
      fullText: data.messages?.[0].content ?? "",
      onUpdate: (currentText) => {
        setMessages(handleUpdateChatItem(currentText));
      },
    });
    return data.messages?.[0];
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
        backgroundColor: "#f4f6f8",
      }}
    >
      {isError && (
        <Box
          flexGrow={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={2}
        >
          <Typography color="error" variant="body1">
            Failed to fetch messages!
          </Typography>
          <Button variant="contained" onClick={handleGetHistory}>
            Retry
          </Button>
        </Box>
      )}

      {!isError && (
        <>
          <ChatBox onRetry={handleSendMessage} messages={messages} />
          <Box mt="auto" p={2}>
            <ChatInput onSend={handleSendMessage} />
          </Box>
        </>
      )}

      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Paper>
  );
};
