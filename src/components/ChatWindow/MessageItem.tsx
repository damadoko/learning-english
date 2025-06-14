import { Box, Typography, Paper } from "@mui/material";
import type { Message } from "../../types";

type MessageItemProps = {
  message: Message;
};
export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
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
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {message.content}
        </Typography>
      </Paper>
    </Box>
  );
};
