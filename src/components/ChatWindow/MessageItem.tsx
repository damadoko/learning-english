import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import type { Message, Translation } from "../../types";
import { getSelectedWord } from "../../utils/messageUtil";
import { useState } from "react";

type MessageItemProps = {
  message: Message;
  retryHandler: () => void;
};

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  retryHandler,
}) => {
  const [translation, setTranslation] = useState<Translation>();
  const [anchorPos, setAnchorPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleSpeak = (content?: string) => {
    if (!content) return;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "en-US";
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    speechSynthesis.speak(utterance);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const word = getSelectedWord();
    if (!word) return;
    setTranslation({ en: word });
    setAnchorPos({ top: e.clientY, left: e.clientX });
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
          <Typography
            onDoubleClick={handleDoubleClick}
            variant="body1"
            sx={{ whiteSpace: "pre-line" }}
          >
            {message.content}
          </Typography>

          {message.role === "assistant" && (
            <Tooltip title="Listen">
              <IconButton
                size="small"
                onClick={() => handleSpeak(message.content)}
              >
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
      <Menu
        open={!!anchorPos}
        onClose={() => setAnchorPos(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorPos ? { top: anchorPos.top, left: anchorPos.left } : undefined
        }
      >
        <MenuItem>
          <strong>{translation?.en}</strong>
        </MenuItem>
        <MenuItem>
          <em>{translation?.pronunciation || "..."}</em>
        </MenuItem>
        <MenuItem>{translation?.vi || "Đang dịch..."}</MenuItem>
        <MenuItem>{translation?.enDefinition || ""}</MenuItem>
        <MenuItem onClick={() => handleSpeak(translation?.en)}>
          🔊 Phát âm
        </MenuItem>
      </Menu>
    </Box>
  );
};
