import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks } from "lucide-react";
import { AiToolPage } from "@/components/AiToolPage";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workplace AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [horizon, setHorizon] = useState("1 week");
  const [context, setContext] = useState("");

  return (
    <AiToolPage
      title="AI Task Planner"
      description="Break goals into a prioritized, actionable plan."
      icon={<ListChecks className="h-5 w-5" />}
      systemPrompt="You are a productivity planning assistant. Given a goal, produce a clear plan with: 1) Milestones, 2) Tasks (with priority H/M/L and rough effort), 3) Suggested sequencing, 4) Risks. Use markdown with headings, bullet lists and checkboxes (- [ ])."
      canSubmit={goal.trim().length > 0}
      buildUserPrompt={() =>
        `Build a plan.\n\nGoal: ${goal}\nDeadline: ${deadline || "(none)"}\nPlanning horizon: ${horizon}\nContext / constraints:\n${context || "(none)"}`
      }
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="goal">Goal *</Label>
        <Input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Launch new landing page" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Planning horizon</Label>
          <Select value={horizon} onValueChange={setHorizon}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["1 day", "1 week", "2 weeks", "1 month", "1 quarter"].map((h) => (
                <SelectItem key={h} value={h}>{h}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ctx">Context & constraints</Label>
        <Textarea id="ctx" rows={6} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Team size, dependencies, blockers…" />
      </div>
    </AiToolPage>
  );
}
