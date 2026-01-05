import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StickyNote, Plus, Trash2, Edit2 } from 'lucide-react';
import { format } from 'date-fns';

const NOTE_CATEGORIES = ['market', 'strategy', 'lesson', 'goal', 'idea', 'other'];

export default function NotesSystem({ notes = [], onAdd, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'idea',
    tags: []
  });
  const [filter, setFilter] = useState('all');

  const handleAdd = () => {
    onAdd?.({ ...formData, date: new Date().toISOString() });
    setFormData({ title: '', content: '', category: 'idea', tags: [] });
    setShowForm(false);
  };

  const filteredNotes = filter === 'all' 
    ? notes 
    : notes.filter(n => n.category === filter);

  const categoryColors = {
    market: 'bg-blue-500/10 text-blue-400',
    strategy: 'bg-purple-500/10 text-purple-400',
    lesson: 'bg-emerald-500/10 text-emerald-400',
    goal: 'bg-amber-500/10 text-amber-400',
    idea: 'bg-pink-500/10 text-pink-400',
    other: 'bg-slate-500/10 text-slate-400'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Notes</SelectItem>
              {NOTE_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {showForm && (
        <Card className="bg-slate-900/50 border-slate-800/50 p-4">
          <div className="space-y-3">
            <Input
              placeholder="Note title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-800 border-slate-700"
            />
            <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {NOTE_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Write your note here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-slate-800 border-slate-700 h-32"
            />
            <div className="flex gap-2">
              <Button onClick={handleAdd} disabled={!formData.title || !formData.content} className="bg-emerald-600 hover:bg-emerald-700">
                Save Note
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" className="border-slate-700">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredNotes.map((note, index) => (
          <Card key={index} className="bg-slate-900/50 border-slate-800/50 p-5 group hover:bg-slate-900/70 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <StickyNote className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-white font-semibold">{note.title}</h3>
                  <p className="text-slate-500 text-xs">
                    {note.date ? format(new Date(note.date), 'MMM dd, yyyy HH:mm') : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={categoryColors[note.category] + ' capitalize'}>
                  {note.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-rose-400"
                  onClick={() => onDelete?.(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-slate-400 text-sm whitespace-pre-wrap">{note.content}</p>
          </Card>
        ))}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <StickyNote className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No notes yet. Start documenting your insights!</p>
          </div>
        )}
      </div>
    </div>
  );
}