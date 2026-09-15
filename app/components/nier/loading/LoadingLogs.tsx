'use client';

import React, { useEffect, useState } from "react";
import { Typer } from "./Typer";
import messages from "./loadingMessages";

type LoadingLogsProps = {
  callBack: () => any;
};

export const LoadingLogs = ({ callBack }: LoadingLogsProps): React.JSX.Element => {
  const [waitingListRender, setWaitingListRender] = useState<string[]>([messages[0]]);

  const updateRenderList = (i: number) => {
    if (!messages[i + 1]) return;
    setWaitingListRender((prev) => {
      if (prev.length > i + 1) return prev;
      return [...prev, messages[i + 1]];
    });
  };

  const removeComponent = () => {
    if (waitingListRender.length < messages.length) return;
    callBack();
  };

  useEffect(removeComponent, [waitingListRender, callBack]);

  return (
    <>
      {waitingListRender.map((message, i) => (
        <Typer
          key={`${message}-${i}`}
          callBack={() => updateRenderList(i)}
          receivedText={message}
        />
      ))}
    </>
  );
};
