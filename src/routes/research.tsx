import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { AiToolPage } from "@/components/AiToolPage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — Workplace AI" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [depth, setDepth] = useState("Briefing");
  const [questions, setQuestions] = useState("");

  return (
    <AiToolPage
      title="AI Research Assistant"
      description="Get a structured briefing on any topic."
      icon={<Search className="h-5 w-5" />}
      systemPrompt="You are a research assistant. Produce a structured briefing with: 1) TL;DR, 2) Background, 3) Key points / insights, 4) Considerations & trade-offs, 5) Open questions. Be balanced. Flag uncertainty. Do not fabricate citations — if you reference something, mark it as 'general knowledge' unless the user provided it."
      canSubmit={topic.trim().length > 0}
      buildUserPrompt={() =>
        `Research request.\n\nTopic: ${topic}\nAudience: ${audience || "(general)"}\nDepth: ${depth}\nSpecific questions:\n${questions || "(none)"}`
      }
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="topic">Topic *</Label>
        <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Best practices for async stand-ups" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="aud">Audience</Label>
          <Input id="aud" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Engineering managers" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Depth</Label>
          <Select value={depth} onValueChange={setDepth}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Quick overview", "Briefing", "Deep dive"].map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="q">Specific questions</Label>
        <Textarea id="q" rows={5} value={questions} onChange={(e) => setQuestions(e.target.value)} placeholder="What do you specifically want answered?" />
      </div>
    </AiToolPage>
  );
}
