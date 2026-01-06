import { useState, type ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { format } from "date-fns";

type Reflection = {
  date: string;
  content: string;
  type: "daily";
};

type PreState = {
  confidence: number;
  calm: number;
  clarity: number;
  energy: number;
  urgency: number;
  mindset: string[];
  fear: string;
  rules: boolean;
};

type PostState = {
  reaction: string;
  intensity: number;
  urge: boolean;
  urgeReason: string;
  alignment: string;
  label: string;
  pattern: string;
};

type Props = {
  onSave: (
    data: Reflection | { pre: PreState; post: PostState | null }
  ) => void;
};

function EmojiScroll({ onPick }: { onPick: (e: string) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("😐");

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

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border rounded px-3 py-2 bg-gray-800 text-2xl min-w-[3rem]"
        type="button"
        aria-expanded={open}
        aria-controls="emoji-list"
        aria-label="Select emoji"
      >
        {selected}
      </button>
      {open && (
        <div
          id="emoji-list"
          role="listbox"
          aria-label="Emoji picker"
          className="absolute top-12 left-0 w-64 h-48 overflow-y-auto bg-gray-900 border rounded p-2 grid grid-cols-4 gap-2 z-10"
        >
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => {
                setSelected(e);
                onPick(e);
                setOpen(false);
              }}
              aria-label={`Emoji ${e}`}
              className="cursor-pointer hover:bg-gray-700 p-2 text-2xl rounded text-center"
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const MINDSETS = [
  "Focused & patient",
  "Slightly rushed",
  "Afraid of missing the move",
  "Recovering from a previous loss",
  "Riding confidence from a win",
  "Bored / forcing action",
  "Neutral",
];

const REACTIONS = [
  "Relief",
  "Satisfaction",
  "Frustration",
  "Anger",
  "Regret",
  "Indifference",
  "Euphoria",
];

const URGE_REASONS = [
  "To capitalize on momentum",
  "To recover a loss",
  'Felt unusually "locked in"',
  "Felt unsettled / off balance",
];

const ALIGNMENTS = [
  "Rules followed, emotions calm",
  "Rules followed, emotions elevated",
  "Rules broken due to emotion",
  "Rules broken for non-emotional reasons",
];

const PATTERNS = [
  "Yes — recurring mistake",
  "Yes — recurring success",
  "No",
  "Unsure",
];

export default function PsychMirror({ onSave }: Props) {
  const [mode, setMode] = useState<"daily" | "pre" | "post">("daily");

  const [reflection, setReflection] = useState<Reflection>({
    date: format(new Date(), "yyyy-MM-dd"),
    content: "",
    type: "daily",
  });

  const [pre, setPre] = useState<PreState>({
    confidence: 3,
    calm: 3,
    clarity: 3,
    energy: 3,
    urgency: 3,
    mindset: [],
    fear: "",
    rules: true,
  });

  const [post, setPost] = useState<PostState>({
    reaction: "Neutral",
    intensity: 3,
    urge: false,
    urgeReason: "",
    alignment: "",
    label: "",
    pattern: "No",
  });

  const save = () => {
    if (mode === "daily") {
      onSave(reflection);
      setReflection({
        date: format(new Date(), "yyyy-MM-dd"),
        content: "",
        type: "daily",
      });
    } else {
      const payload = { pre, post: mode === "post" ? post : null };
      onSave(payload);
      if (mode === "pre") setMode("post");
    }
  };

  const dailyPrompts = [
    "What emotions influenced my trading today?",
    "Did I follow my trading plan?",
    "What could I have done better?",
    "What did I learn from today's trades?",
    "How did I manage my risk today?",
  ];

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl p-6 space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() => setMode("daily")}
          className={mode === "daily" ? "bg-indigo-700" : "bg-gray-700"}
        >
          Daily Reflection
        </Button>
        <Button
          onClick={() => setMode("pre")}
          className={mode === "pre" ? "bg-green-700" : "bg-gray-700"}
        >
          Pre-Trade
        </Button>
        <Button
          onClick={() => setMode("post")}
          className={mode === "post" ? "bg-green-700" : "bg-gray-700"}
        >
          Post-Trade
        </Button>
      </div>

      {mode === "daily" && (
        <>
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-semibold">Trading Reflection</h3>
          </div>

          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-indigo-400 font-medium text-sm mb-2">
              Reflection Prompts
            </p>
            <ul className="space-y-2 text-slate-400 text-sm">
              {dailyPrompts.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>

          <Textarea
            placeholder="Write your reflections here..."
            value={reflection.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setReflection({ ...reflection, content: e.target.value })
            }
            className="bg-slate-800 border-slate-700 min-h-[200px]"
          />
        </>
      )}

      {(mode === "pre" || mode === "post") && (
        <>
          {mode === "pre" ? (
            <>
              <h3 className="font-bold">Mental Readiness (1–5)</h3>
              {(
                ["confidence", "calm", "clarity", "energy", "urgency"] as const
              ).map((k) => (
                <div key={k} className="flex items-center gap-3">
                  <label htmlFor={`pre-${k}`} className="w-24 capitalize">
                    {k}
                  </label>
                  <input
                    id={`pre-${k}`}
                    aria-label={k}
                    type="range"
                    min={1}
                    max={5}
                    value={pre[k as keyof PreState] as number}
                    onChange={(e) =>
                      setPre({
                        ...pre,
                        [k]: Number(e.target.value),
                      } as unknown as PreState)
                    }
                  />
                  <span aria-live="polite">
                    {pre[k as keyof PreState] as number}
                  </span>
                </div>
              ))}

              <h3 className="font-bold">Mindset</h3>
              <div className="grid grid-cols-2 gap-2">
                {MINDSETS.map((m) => (
                  <label key={m} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={pre.mindset.includes(m)}
                      onChange={(e) =>
                        setPre({
                          ...pre,
                          mindset: e.target.checked
                            ? [...pre.mindset, m]
                            : pre.mindset.filter((x) => x !== m),
                        })
                      }
                    />
                    {m}
                  </label>
                ))}
              </div>

              <label className="sr-only" htmlFor="pre-fear">
                Fear if skipped
              </label>
              <input
                id="pre-fear"
                className="w-full text-black px-2"
                placeholder="Fear if skipped"
                aria-label="Fear if skipped"
                maxLength={120}
                value={pre.fear}
                onChange={(e) => setPre({ ...pre, fear: e.target.value })}
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={pre.rules}
                  onChange={(e) => setPre({ ...pre, rules: e.target.checked })}
                />
                Rules followed
              </label>
            </>
          ) : (
            <>
              <h3 className="font-bold">Emotional Reaction</h3>
              <select
                value={post.reaction}
                onChange={(e) => setPost({ ...post, reaction: e.target.value })}
                aria-label="Emotional reaction"
              >
                {REACTIONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              <h3 className="font-bold">Intensity</h3>
              <input
                type="range"
                min={1}
                max={5}
                value={post.intensity}
                onChange={(e) =>
                  setPost({ ...post, intensity: Number(e.target.value) })
                }
                aria-label="Reaction intensity"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={post.urge}
                  onChange={(e) => setPost({ ...post, urge: e.target.checked })}
                />
                Urge to trade again
              </label>

              {post.urge && (
                <select
                  value={post.urgeReason}
                  onChange={(e) =>
                    setPost({ ...post, urgeReason: e.target.value })
                  }
                  aria-label="Urge reason"
                >
                  <option value="">Select reason</option>
                  {URGE_REASONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              )}

              <h3 className="font-bold">Rule Alignment</h3>
              <select
                value={post.alignment}
                onChange={(e) =>
                  setPost({ ...post, alignment: e.target.value })
                }
                aria-label="Rule alignment"
              >
                {ALIGNMENTS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>

              <h3 className="font-bold">One-word label</h3>
              <EmojiScroll onPick={(e) => setPost({ ...post, label: e })} />

              <h3 className="font-bold">Pattern?</h3>
              <select
                value={post.pattern}
                onChange={(e) => setPost({ ...post, pattern: e.target.value })}
                aria-label="Pattern"
              >
                {PATTERNS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </>
          )}
        </>
      )}

      <Button onClick={save} className="w-full mt-4 bg-green-700">
        {mode === "daily"
          ? "Save Reflection"
          : mode === "pre"
          ? "Save Pre-Trade & Wait"
          : "Save Post-Trade & Close"}
      </Button>
    </Card>
  );
}
