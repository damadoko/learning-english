import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { login } from "../services";

export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string) => void; // pass email back
};

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) return;
    const { success } = await login({ username, password });
    if (!success) onLogin(username);
    onClose();
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">Welcome back!</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
