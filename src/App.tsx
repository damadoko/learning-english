import { useState } from "react";
import { Box, Backdrop, CircularProgress } from "@mui/material";
import { Header } from "./components/Header/Header";
import "./App.css";
import { LoginModal } from "./components/Modal/LoginModal";
import { RegisterModal } from "./components/Modal/RegisterModal";
import { usePermission } from "./hooks/usePermission";
import { ChatWindow } from "./components/ChatWindow/ChatWindow";

export default function App() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const { username, setUsername, handleLogout, isLoading } = usePermission();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        logoutHandler={handleLogout}
        username={username}
        loginHandler={() => setShowLogin(true)}
        registerHandler={() => setShowRegister(true)}
      />
      <ChatWindow username={username} />

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={setUsername}
      />

      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onRegister={setUsername}
      />

      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
}
