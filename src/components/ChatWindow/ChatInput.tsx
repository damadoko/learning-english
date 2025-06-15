import { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import type { Message } from "../../types";
import { VoiceChat } from "../VoiceChat/VoiceChat";
import { simulateTyping } from "../../utils/messageUtil";

export type ChatInputProps = {
  onSend: (msg: Message) => Promise<Message | null>;
};
export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (isVoiceMode || !transcript || listening) return;
    simulateTyping({ fullText:transcript , onUpdate: setText});
  }, [transcript, listening]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend({
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      errorState: "none",
    });
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
    <Box
      display="flex"
      alignItems={"center"}
      gap={1}
      p={1}
      bgcolor="#fff"
      boxShadow="0px 1px 4px rgba(0,0,0,0.1)"
      borderRadius={2}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type or speak your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <IconButton onClick={handleMic} color={listening ? "primary" : "default"}>
        {listening ? <GraphicEqIcon /> : <MicIcon />}
      </IconButton>

      {(!!text || listening) && (
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      )}
      {!text && !listening && (
        <IconButton onClick={() => setIsVoiceMode(true)}>
          <GraphicEqIcon />
        </IconButton>
      )}

      {isVoiceMode && (
        <VoiceChat onClose={() => setIsVoiceMode(false)} onSend={onSend} />
      )}
    </Box>
  );
};
