import { useState } from "react";
import { Paper, Box } from "@mui/material";
import { Header } from "./components/Header";
import { ChatBox } from "./components/ChatBox";
import { ChatInput } from "./components/ChatInput";
import type { Message } from "./types";
import "./App.css";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleSendMessage = async (text: string) => {
    const userMsg = { id: "1", role: "user", content: text } as const;
    setMessages((prev) => [...prev, userMsg]);

    // const res = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message: text, userId: user?.id ?? null }),
    // });
    // const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "TBU", id: "1" } as const,
    ]);
  };

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
        username={username}
        loginHandler={() => setShowLogin(true)}
        registerHandler={() => setShowRegister(true)}
      />
      <Paper
        elevation={3}
        sx={{
          height: "85vh",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatBox messages={messages} />
        <Box mt="auto" p={2}>
          <ChatInput onSend={handleSendMessage} />
        </Box>
      </Paper>

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
    </Box>
  );
}
