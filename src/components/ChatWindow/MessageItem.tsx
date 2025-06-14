import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import type { Message } from "../../types";

type MessageItemProps = {
  message: Message;
  retryHandler: () => void;
};
export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  retryHandler,
}) => {
  const isUser = ["user", "anonymous"].includes(message.role);

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
