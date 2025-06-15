import React, { useState, useEffect } from "react";
import { Backdrop, Box, CircularProgress, IconButton } from "@mui/material";
import MicOnIcon from "@mui/icons-material/MicExternalOn";
import MicOffIcon from "@mui/icons-material/MicExternalOff";
import CloseIcon from "@mui/icons-material/Close";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { MicWaveform } from "./MicWaveform";
import type { Message } from "../../types";
import { textToSpeech } from "../../utils/messageUtil";

export type VoiceChatProps = {
  onClose: () => void;
  onSend: (msg: Message) => Promise<Message | null>;
};

export const VoiceChat: React.FC<VoiceChatProps> = ({ onClose, onSend }) => {
  const { listening, resetTranscript, finalTranscript } =
    useSpeechRecognition();
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      language: "en-US",
      continuous: false,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (listening || !finalTranscript) return;

    (async () => {
      setLoading(true);
      const userMsg = {
        id: crypto.randomUUID(),
        role: "user",
        content: finalTranscript,
        errorState: "none",
      } as const;
      SpeechRecognition.stopListening();

      const replyMsg = await onSend(userMsg);

      setLoading(false);
      if (!replyMsg) {
        onClose();
        return;
      }

      const utter = textToSpeech(replyMsg.content);
      utter.onend = () => {
        console.log("startListening");
        startListening();
      };
    })();

    return () => {
      speechSynthesis.cancel();
    };
  }, [finalTranscript, listening]);

  return (
    <Backdrop
      open
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.85)",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 10,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(0,0,0,0.7)"
        width="100%"
        height="100%"
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <MicWaveform active={listening} />
        )}
        <Box mt={2}>
          {!listening && (
            <IconButton
              onClick={() => {
                startListening();
              }}
              color={listening ? "primary" : "default"}
              sx={{ color: "#fff" }}
            >
              <MicOffIcon />
            </IconButton>
          )}

          {listening && (
            <IconButton
              onClick={() => stopListening()}
              color={listening ? "primary" : "default"}
              sx={{ color: "#fff" }}
            >
              <MicOnIcon />
            </IconButton>
          )}

          <IconButton
            color="error"
            onClick={() => {
              stopListening();
              onClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Backdrop>
  );
};
