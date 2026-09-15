'use client';

import React, { useEffect, useState } from "react";

export const LoadingDots = (): React.JSX.Element => {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDots((prev) => {
        if (prev.length === 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [dots]);

  return <span style={{ opacity: 0.8 }}>{dots}</span>;
};
