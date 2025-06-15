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
import { register } from "../../services";

export type RegisterModalProps = {
  open: boolean;
  onClose: () => void;
};

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) return;
    setErrorMessage("");

    const response = await register({ username, password });
    if (!response.success) {
      setErrorMessage(response.error?.message || "Register failed!");
      return;
    }
    setIsRegisterSuccess(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">
        {isRegisterSuccess ? "Register Successful 🎉" : "Create new account"}
      </DialogTitle>

      <DialogContent>
        {isRegisterSuccess && (
          <Box textAlign="center" p={3}>
            <Box
              sx={{
                fontSize: 60,
                color: "green",
              }}
            >
              ✅
            </Box>
            <Box mt={2}>You can login now!</Box>
          </Box>
        )}
        {!isRegisterSuccess && (
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
        {isRegisterSuccess && (
          <Button
            onClick={() => {
              onClose();
              setUsername("");
              setPassword("");
              setErrorMessage("");
              setIsRegisterSuccess(false);
            }}
            variant="contained"
          >
            OK
          </Button>
        )}

        {!isRegisterSuccess && (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Register
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
