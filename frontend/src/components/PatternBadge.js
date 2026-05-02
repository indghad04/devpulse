import React from "react";

const patternStyles = {
  "Healthy flow": { background: "#EAF3DE", color: "#3B6D11" },
  "Quality watch": { background: "#FAEEDA", color: "#854F0B" },
  "Needs review": { background: "#FCEBEB", color: "#A32D2D" },
};

export default function PatternBadge({ pattern }) {
  const style = patternStyles[pattern] || { background: "#eee", color: "#333" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 12px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 500,
        ...style,
      }}
    >
      {pattern}
    </span>
  );
}
