import { useEffect, useMemo, useState } from "react";

export default function useConversationSearch(messages) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ctrl + F
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  const matches = useMemo(() => {
    if (!query.trim()) return [];

    return messages
      .map((message, index) => ({
        index,
        message,
      }))
      .filter((item) =>
        (item.message.text || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
  }, [messages, query]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [query]);

  const next = () => {
    if (matches.length === 0) return;

    setCurrentIndex((prev) =>
      (prev + 1) % matches.length
    );
  };

  const prev = () => {
    if (matches.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0
        ? matches.length - 1
        : prev - 1
    );
  };

  return {
    open,
    setOpen,

    query,
    setQuery,

    matches,

    currentIndex,

    next,
    prev,
  };
}