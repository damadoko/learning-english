import React from "react";

export type MessageContentProps = {
  text: string;
  handleWordClick: (word: string) => void;
};

export const MessageContent: React.FC<MessageContentProps> = ({
  text,
  handleWordClick,
}) => {
  return text?.split(/\s+/)?.map((word, index) => (
    <span
      key={index}
      style={{ cursor: "pointer", textDecoration: "underline dotted" }}
      onClick={() => handleWordClick(word)}
    >
      {word + " "}
    </span>
  ));
};
