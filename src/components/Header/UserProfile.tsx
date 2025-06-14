import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

export type UserProfileProps = {
  username?: string;
  logoutHandler: () => void;
};

export const UserProfile: React.FC<UserProfileProps> = ({
  username,
  logoutHandler,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutHandler();
  };

  if (!username) return null;
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body1">Hello, {username}</Typography>
      <IconButton size="small" onClick={handleAvatarClick}>
        <Avatar>{username[0].toUpperCase()}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};
