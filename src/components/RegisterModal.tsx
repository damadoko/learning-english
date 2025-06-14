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

export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
  onRegister: (user: User) => void; // pass email back
};

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
  onRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // TODO: Call backend API here, for now mock
    if (email && password) {
      onRegister({ email });
      onClose();
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">Create new account!</DialogTitle>
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
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};
