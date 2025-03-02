"use client";
import React, { useMemo, useState } from "react";
import { Textarea } from "../ui/textarea";

type PatternName =
  | "literal"
  | "character_class"
  | "quantifier"
  | "group"
  | "anchor"
  | "escaped";

// Define the regex patterns for various components of a regex
const patterns: Record<PatternName, { regex: RegExp; style: string }> = {
  literal: { regex: /[a-zA-Z0-9]/, style: "" },
  character_class: {
    regex: /\[[^\]]*\]/,
    style: "text-green-600 bg-green-200",
  },
  quantifier: {
    regex: /\*|\+|\?|\{[0-9,]*\}/,
    style: "text-red-600 bg-red-200",
  },
  group: { regex: /\(.*?\)/, style: "text-yellow-600 bg-yellow-200" },
  anchor: { regex: /\^|\$/, style: "text-purple-600 bg-purple-200" },
  escaped: { regex: /\\[dDsSwW]/, style: "text-pink-600 bg-pink-200" },
};

// Function to apply syntax highlighting
function highlightRegex(regexString: string) {
  const parts: { part: string; pattern: PatternName }[] = [];
  let remainingString = regexString;

  while (remainingString.length > 0) {
    let matched = false;

    for (const [name, pattern] of Object.entries(patterns)) {
      const match = pattern.regex.exec(remainingString);
      if (match && match.index === 0) {
        if (
          parts.length > 0 &&
          parts[parts.length - 1].pattern === name &&
          name === "literal"
        ) {
          parts[parts.length - 1].part += match[0];
        } else {
          parts.push({
            part: match[0],
            pattern: name as PatternName,
          });
        }
        remainingString = remainingString.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // If no patterns match, take the first character as a literal
      if (parts.length > 0 && parts[parts.length - 1].pattern === "literal") {
        parts[parts.length - 1].part += remainingString[0];
      } else {
        parts.push({
          part: remainingString[0],
          pattern: "literal",
        });
      }
      remainingString = remainingString.slice(1);
    }
  }

  return parts;
}

// Define the RegexHighlighter component
const RegexHighlighter: React.FC<{ regex: string }> = ({ regex }) => {
  const parts = useMemo(() => highlightRegex(regex), [regex]);
  const highlight = useMemo(
    () => (
      <div
        id="regex-highlight"
        className="w-full gap-0.5 flex rounded pointer-events-none z-0 whitespace-pre-wrap break-words"
      >
        {parts.map((part, i) => {
          return (
            <span
              className={`whitespace-nowrap ${
                patterns[part.pattern as keyof typeof patterns].style
              } py-1 ${part.pattern !== "literal" ? "px-1 rounded-sm" : ""}`}
              key={`${i}-${part.pattern}`}
            >
              {part.part}
            </span>
          );
        })}
      </div>
    ),
    [parts]
  );
  return (
    <div
      id="regex-highlight"
      className="w-full p-2 flex rounded pointer-events-none z-0 whitespace-pre-wrap break-words overflow-x-scroll"
    >
      {highlight}
      <div className="h-[1px] min-w-[10rem] w-[10rem]" />
    </div>
  );
};

export default RegexHighlighter;
