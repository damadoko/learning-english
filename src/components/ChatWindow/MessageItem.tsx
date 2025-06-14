import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import type { Message } from "../../types";

type MessageItemProps = {
  message: Message;
  retryHandler: () => void;
};
export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  retryHandler,
}) => {
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.lang = "en-US";
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    speechSynthesis.speak(utterance);
  };

  const isUser = message.role === "user";
  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      mb={2}
    >
      <Paper
        elevation={2}
        sx={{
          px: 2,
          py: 1,
          maxWidth: "75%",
          bgcolor: isUser ? "#DCF8C6" : "#fff",
          borderRadius: 2,
          borderTopRightRadius: isUser ? 0 : 2,
          borderTopLeftRadius: isUser ? 2 : 0,
          textAlign: isUser ? "right" : "left",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {message.content}
          </Typography>

          {message.role === "assistant" && (
            <Tooltip title="Listen">
              <IconButton size="small" onClick={handleSpeak}>
                <VolumeUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {message.errorState === "failed" && (
            <Tooltip title="Retry">
              <IconButton size="small" onClick={retryHandler}>
                <ReplayIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {message.errorState === "retrying" && <CircularProgress size={20} />}
        </Box>
      </Paper>
    </Box>
  );
};
