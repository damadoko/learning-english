import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export type UserProfileProps = {
  userEmail?: string;
};

export const UserProfile: React.FC<UserProfileProps> = ({ userEmail }) => {
  if (!userEmail) return null;
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body1">Hello, {userEmail.split("@")[0]}</Typography>
      <Avatar>{userEmail[0].toUpperCase()}</Avatar>
    </Box>
  );
};
