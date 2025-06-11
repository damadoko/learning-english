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

import type { User } from "../types";

export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: (user: User) => void; // pass email back
};

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // TODO: Call backend API here, for now mock
    if (email && password) {
      onLogin({ email });
      onClose();
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">Welcome back!</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
