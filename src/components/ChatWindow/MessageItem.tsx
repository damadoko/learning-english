import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Menu,
  Button,
  Divider,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import type { Message, Translation } from "../../types";
import { getSelectedWord, textToSpeech } from "../../utils/messageUtil";
import { useState } from "react";
import { fetchTranslation } from "../../services/translateService";

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
  const [isError, setIsError] = useState(false);

  const handleTranslation =
    (type: "retry" | "new") => async (e: React.MouseEvent) => {
      let word: string | undefined;
      if (type === "retry") {
        word = translation?.en;
      } else {
        word = getSelectedWord();
      }
      if (!word) return;
      setTranslation({ en: word });
      setAnchorPos({ top: e.clientY, left: e.clientX });

      const data = await fetchTranslation(word);
      if (!data.success) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setTranslation(data.translate);
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
          padding: "12px 16px",
          maxWidth: "60%",
          bgcolor: isUser ? "#D1E8FF" : "#fff",
          borderRadius: "12px",
          borderTopRightRadius: isUser ? 0 : 2,
          borderTopLeftRadius: isUser ? 2 : 0,
          textAlign: isUser ? "right" : "left",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            onDoubleClick={handleTranslation("new")}
            variant="body1"
            sx={{ whiteSpace: "pre-line" }}
          >
            {message.content}
          </Typography>

          {message.role === "assistant" && (
            <Tooltip title="Listen">
              <IconButton
                size="small"
                onClick={() => textToSpeech(message.content)}
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
        slotProps={{
          paper: {
            sx: {
              p: 2,
              maxWidth: 300,
              borderRadius: 2,
            },
          },
        }}
      >
        {isError && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography color="error">❌ Lỗi khi dịch</Typography>
            <Button size="small" onClick={handleTranslation("retry")}>
              Thử lại
            </Button>
          </Box>
        )}

        {!isError && (
          <Box display="flex" flexDirection="column" gap={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">{translation?.en || "..."}</Typography>
              <IconButton
                size="small"
                onClick={() => textToSpeech(translation?.en)}
                title="Phát âm"
              >
                <VolumeUpIcon fontSize="small" />
              </IconButton>
            </Box>

            {translation?.pronunciation && (
              <Typography variant="body2" color="text.secondary">
                /{translation.pronunciation}/
              </Typography>
            )}

            <Divider />

            {translation?.vi && (
              <Typography variant="body1" fontWeight="medium">
                {translation.vi}
              </Typography>
            )}

            {translation?.enDefinition && (
              <Typography variant="body2" color="text.secondary">
                {translation.enDefinition}
              </Typography>
            )}
          </Box>
        )}
      </Menu>
    </Box>
  );
};
