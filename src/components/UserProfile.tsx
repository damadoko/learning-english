import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export type UserProfileProps = {
  username?: string;
};

export const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  if (!username) return null;
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body1">Hello, {username}</Typography>
      <Avatar>{username[0].toUpperCase()}</Avatar>
    </Box>
  );
};
