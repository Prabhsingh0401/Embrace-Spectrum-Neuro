import "./audio-pulse.scss";
import React from "react";
import { useEffect, useRef } from "react";
import c from "classnames";

const lineCount = 3;

export default function AudioPulse({ active, volume, hover }) {
  const linesRef = useRef([]);

  useEffect(() => {
    let timeout = null;
    const update = () => {
      linesRef.current.forEach(
        (line, i) => {
          if (line) {
            line.style.height = `${Math.min(
              24,
              4 + volume * (i === 1 ? 400 : 60),
            )}px`;
          }
        }
      );
      timeout = window.setTimeout(update, 100);
    };

    update();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [volume]);

  return (
    <div className={c("audioPulse", { active, hover })}>
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  );
}
