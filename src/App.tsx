import { useState } from "react";
import { Paper, Box } from "@mui/material";
import { Header } from "./components/Header";
import { ChatBox } from "./components/ChatBox";
import { ChatInput } from "./components/ChatInput";
import type { Message, User } from "./types";
import "./App.css";
import { LoginModal } from "./components/LoginModal";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  console.log(user)

  const handleSendMessage = async (text: string) => {
    const userMsg = { role: "user", content: text } as const;
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, userId: user?.id ?? null }),
    });
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply } as const,
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
      <Header userEmail={user?.email} loginHandler={() => setShowLogin(true)} />
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
        onLogin={setUser}
      />
    </Box>
  );
}
