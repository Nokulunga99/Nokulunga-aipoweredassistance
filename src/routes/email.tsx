import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AiToolPage } from "@/components/AiToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [keyPoints, setKeyPoints] = useState("");

  return (
    <AiToolPage
      title="Smart Email Generator"
      description="Draft polished emails in the right tone — fast."
      icon={<Mail className="h-5 w-5" />}
      systemPrompt="You are an expert business communication assistant. Write clear, well-structured emails. Use a subject line, greeting, body and sign-off. Match the requested tone and length. Do not invent facts."
      canSubmit={keyPoints.trim().length > 0}
      buildUserPrompt={() =>
        `Write an email with these parameters:\n\nRecipient: ${recipient || "(unspecified)"}\nSubject hint: ${subject || "(none)"}\nTone: ${tone}\nLength: ${length}\nKey points / context:\n${keyPoints}`
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="recipient">Recipient</Label>
          <Input id="recipient" placeholder="e.g. Marketing team" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="subject">Subject hint</Label>
          <Input id="subject" placeholder="e.g. Q3 launch plan" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Professional", "Friendly", "Formal", "Concise", "Persuasive", "Apologetic"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Length</Label>
          <Select value={length} onValueChange={setLength}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Short", "Medium", "Long"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="kp">Key points *</Label>
        <Textarea id="kp" rows={6} placeholder="What should the email cover? Bullet points work well." value={keyPoints} onChange={(e) => setKeyPoints(e.target.value)} />
      </div>
    </AiToolPage>
  );
}
