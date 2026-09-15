'use client';

import React, { useEffect, useState } from "react";
import { nierAudio } from "../NierAudio";

interface TyperProps {
  receivedText: string;
  callBack: () => any;
  speed?: number;
}

export const Typer = ({
  receivedText,
  callBack,
  speed = 10,
}: TyperProps): React.JSX.Element => {
  const [typingText, setTypingText] = useState<string[]>([""]);
  const hasCalled = React.useRef(false);

  useEffect(() => {
    if (typingText.join("").length < receivedText.length) {
      const timer = setTimeout(() => {
        const nextChar = receivedText.charAt(typingText.join("").length);
        setTypingText((prev) => {
          const newText = [...prev];
          if (nextChar === "\n") {
            newText.push("");
          } else {
            newText[newText.length - 1] += nextChar;
          }
          return newText;
        });
        if (Math.random() > 0.6) {
          nierAudio.playHover();
        }
      }, speed);
      return () => clearTimeout(timer);
    } else if (!hasCalled.current) {
      hasCalled.current = true;
      callBack();
    }
  }, [receivedText, typingText, speed, callBack]);

  if (!receivedText) return <></>;

  return (
    <div>
      {typingText.map((line, index) => (
        <p
          key={index}
          className="glitch-text opacity-85 my-0 select-none text-sm sm:text-[15px] font-sans"
          data-text={line}
        >
          {line}
        </p>
      ))}
    </div>
  );
};
