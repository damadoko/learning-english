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
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) return;
    setErrorMessage("");

    const response = await login({ username, password });
    if (!response.success) {
      setErrorMessage(response.error?.message || "Login failed!");
      return;
    }

    setIsLoginSuccess(true);
    onLogin(username);
    onClose();
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">
        {isLoginSuccess ? "Login Successful 🎉" : "Welcome back!"}
      </DialogTitle>

      <DialogContent>
        {isLoginSuccess && (
          <Box textAlign="center" p={3}>
            <Box
              sx={{
                fontSize: 60,
                color: "green",
              }}
            >
              ✅
            </Box>
            <Box mt={2}>You are now logged in.</Box>
          </Box>
        )}

        {!isLoginSuccess && (
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
            {errorMessage && (
              <Box color="red" fontSize={14}>
                {errorMessage}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {isLoginSuccess && (
          <Button
            onClick={() => {
              onClose();
              setUsername("");
              setPassword("");
              setErrorMessage("");
              setIsLoginSuccess(false);
            }}
            variant="contained"
          >
            OK
          </Button>
        )}
        {!isLoginSuccess && (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Continue
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
