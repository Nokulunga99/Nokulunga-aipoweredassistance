import { ReactNode, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Copy, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { aiChat } from "@/lib/ai.functions";
import { Disclaimer } from "./Disclaimer";

interface AiToolPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  systemPrompt: string;
  buildUserPrompt: () => string;
  canSubmit: boolean;
  children: ReactNode;
  outputLabel?: string;
  outputRows?: number;
}

export function AiToolPage({
  title,
  description,
  icon,
  systemPrompt,
  buildUserPrompt,
  canSubmit,
  children,
  outputLabel = "AI output (editable)",
  outputRows = 14,
}: AiToolPageProps) {
  const chat = useServerFn(aiChat);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      const res = await chat({
        data: {
          system: systemPrompt,
          messages: [{ role: "user", content: buildUserPrompt() }],
        },
      });
      setOutput(res.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-8">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inputs</CardTitle>
            <CardDescription>Fill out the structured prompt fields.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {children}
            <Button onClick={handleGenerate} disabled={!canSubmit || loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">{outputLabel}</CardTitle>
              <CardDescription>You can edit before using.</CardDescription>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={copy} disabled={!output} title="Copy">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setOutput("")} disabled={!output} title="Clear">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Label htmlFor="ai-output" className="sr-only">{outputLabel}</Label>
            <Textarea
              id="ai-output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={outputRows}
              placeholder="Output will appear here…"
              className="font-mono text-sm leading-relaxed"
            />
            <Disclaimer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
