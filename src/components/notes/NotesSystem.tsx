import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Note } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StickyNote, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

const NOTE_CATEGORIES = [
  "market",
  "strategy",
  "lesson",
  "goal",
  "idea",
  "other",
];

export default function NotesSystem({
  userId,
  tradeId,
}: {
  userId: string;
  tradeId?: string;
}) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "idea",
  });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Load notes on mount or when user/trade changes
  useEffect(() => {
    loadNotes();
  }, [userId, tradeId]);

  const loadNotes = async () => {
    let query = supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (tradeId) query = query.eq("trade_id", tradeId);

    const { data, error } = await query;
    if (!error) setNotes(data || []);
  };

  const handleAdd = async () => {
    if (!formData.title.trim()) return alert("Title required");
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("You must be logged in");

    const { error } = await supabase.from("notes").insert({
      user_id: user.id,
      title: formData.title,
      content: formData.content,
      category: formData.category,
      trade_id: tradeId || null,
      created_at: new Date().toISOString(),
    });

    if (!error) {
      setFormData({ title: "", content: "", category: "idea" });
      setShowForm(false);
      loadNotes();
    } else {
      alert(error.message);
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) loadNotes();
  };

  const filteredNotes =
    filter === "all" ? notes : notes.filter((n) => n.category === filter);

  const categoryColors: Record<string, string> = {
    market: "bg-blue-500/10 text-blue-400",
    strategy: "bg-purple-500/10 text-purple-400",
    lesson: "bg-emerald-500/10 text-emerald-400",
    goal: "bg-amber-500/10 text-amber-400",
    idea: "bg-pink-500/10 text-pink-400",
    other: "bg-slate-500/10 text-slate-400",
  };

  return (
    <div className="space-y-4">
      {/* Filter & New Note */}
      <div className="flex items-center justify-between">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40 bg-slate-800 border-slate-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Notes</SelectItem>
            {NOTE_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-2" /> New Note
        </Button>
      </div>

      {/* Note Form */}
      {showForm && (
        <Card className="bg-slate-900/50 border-slate-800/50 p-4 space-y-3">
          <Input
            placeholder="Note title..."
            value={formData.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="bg-slate-800 border-slate-700"
          />
          {!tradeId && (
            <Select
              value={formData.category}
              onValueChange={(v: any) =>
                setFormData({ ...formData, category: v })
              }
            >
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {NOTE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Textarea
            placeholder={
              tradeId
                ? "Why you exited, what you felt..."
                : "Write your note here..."
            }
            value={formData.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="bg-slate-800 border-slate-700 h-32"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleAdd}
              disabled={loading || !formData.title || !formData.content}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? "Saving..." : "Save Note"}
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              className="border-slate-700"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Notes List */}
      <div className="grid gap-4">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <StickyNote className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">
              {tradeId
                ? "No trade notes yet."
                : "No notes yet. Start documenting your insights!"}
            </p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <Card
              key={note.id}
              className="bg-slate-900/50 border-slate-800/50 p-5 group hover:bg-slate-900/70 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <StickyNote className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="text-white font-semibold">{note.title}</h3>
                    <p className="text-slate-500 text-xs">
                      {note.created_at
                        ? format(
                            new Date(note.created_at),
                            "MMM dd, yyyy HH:mm"
                          )
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${categoryColors[note.category]} capitalize`}
                  >
                    {note.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-rose-400"
                    onClick={() => handleDelete(note.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-slate-400 text-sm whitespace-pre-wrap">
                {note.content}
              </p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
