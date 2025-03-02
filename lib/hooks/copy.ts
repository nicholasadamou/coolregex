import { useCallback, useState } from "react";

type CopiedValue = string | null;

type IsCopied = boolean;

type CopyFn = (text: string, duration?: number) => Promise<boolean>;

export function useCopyToClipboard(): [CopiedValue, IsCopied, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copy: CopyFn = useCallback(async (text, duration = 500) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, duration);

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      setIsCopied(false);
      return false;
    }
  }, []);

  return [copiedText, isCopied, copy];
}
