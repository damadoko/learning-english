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

export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
  onRegister: (username: string) => void; // pass email back
};

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
  onRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // TODO: Call backend API here, for now mock
    if (username && password) {
      onRegister(username);
      onClose();
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">Create new account!</DialogTitle>
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
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};
