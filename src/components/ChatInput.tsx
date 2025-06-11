import { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export type ChatInputProps = {
  onSend: (text: string) => void;
};
export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      setText(transcript); // Đưa vào ô input
    }
  }, [transcript, listening]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
    resetTranscript();
  };

  const handleMic = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Trình duyệt không hỗ trợ Speech Recognition.");
      return;
    }

    resetTranscript();
    SpeechRecognition.startListening({ language: "en-US", continuous: false });
  };

  return (
    <Box display="flex">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type or speak your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <IconButton onClick={handleMic} color={listening ? "primary" : "default"}>
        <MicIcon />
      </IconButton>
      <IconButton onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
