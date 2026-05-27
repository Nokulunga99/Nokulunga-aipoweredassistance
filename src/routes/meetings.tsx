import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText } from "lucide-react";
import { AiToolPage } from "@/components/AiToolPage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Workplace AI" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [title, setTitle] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AiToolPage
      title="Meeting Notes Summarizer"
      description="Turn messy notes or transcripts into clean summaries and action items."
      icon={<FileText className="h-5 w-5" />}
      systemPrompt="You are a meeting-notes assistant. Produce a structured summary with: 1) Overview (2-3 sentences), 2) Key decisions, 3) Action items (with owner if mentioned), 4) Open questions / risks. Be faithful to the source — never invent attendees, decisions, or owners."
      canSubmit={notes.trim().length > 20}
      buildUserPrompt={() =>
        `Summarize the following meeting notes.\n\nMeeting title: ${title || "(none)"}\nAttendees: ${attendees || "(unspecified)"}\n\nRaw notes:\n${notes}`
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Meeting title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Weekly product sync" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="att">Attendees</Label>
          <Input id="att" value={attendees} onChange={(e) => setAttendees(e.target.value)} placeholder="e.g. Anna, Ben, Chris" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Raw notes or transcript *</Label>
        <Textarea id="notes" rows={10} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting notes or transcript here…" />
      </div>
    </AiToolPage>
  );
}
