import { useState } from "react";

const EMOJIS = [
  "😡",
  "😕",
  "😐",
  "🙂",
  "😁",
  "🤩",
  "😎",
  "🤯",
  "😴",
  "🤔",
  "🤐",
  "🤪",
  "😇",
  "👹",
  "💀",
  "🔥",
  "💯",
  "⚡",
  "🎯",
  "🚀",
  "💸",
  "📉",
  "📈",
  "💰",
  "🤏",
  "🎲",
  "🎰",
  "🔮",
  "🧠",
  "💡",
  "❤️",
  "🩹",
  "💊",
  "🧘",
  "⚖️",
  "🛡️",
  "⚠️",
  "🚫",
  "✅",
  "🔄",
  "⏳",
  "🕐",
  "🌅",
  "🌙",
  "🧊",
  "🌊",
  "🌪️",
  "🧯",
  "🏁",
];

export default function EmojiScroll({
  onPick,
}: {
  onPick: (e: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("😐");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border rounded px-3 py-2 bg-gray-800 text-2xl min-w-[3rem]"
      >
        {selected}
      </button>
      {open && (
        <div className="absolute top-12 left-0 w-64 h-48 overflow-y-auto bg-gray-900 border rounded p-2 grid grid-cols-4 gap-2 z-10">
          {EMOJIS.map((e) => (
            <div
              key={e}
              onClick={() => {
                setSelected(e);
                onPick(e);
                setOpen(false);
              }}
              className="cursor-pointer hover:bg-gray-700 p-2 text-2xl rounded text-center"
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
