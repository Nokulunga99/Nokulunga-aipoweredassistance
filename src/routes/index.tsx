import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workplace AI" },
      { name: "description", content: "Your AI-powered workplace productivity dashboard." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    title: "Smart Email Generator",
    description: "Draft professional emails with the right tone in seconds.",
    icon: Mail,
    to: "/email",
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes or transcripts into clean summaries and action items.",
    icon: FileText,
    to: "/meetings",
  },
  {
    title: "AI Task Planner",
    description: "Break goals into prioritized, actionable plans with deadlines.",
    icon: ListChecks,
    to: "/tasks",
  },
  {
    title: "AI Research Assistant",
    description: "Get structured briefings on any topic with key insights.",
    icon: Search,
    to: "/research",
  },
  {
    title: "AI Chatbot",
    description: "A general workplace assistant for any quick question.",
    icon: MessageSquare,
    to: "/chat",
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-4 md:p-8">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-elegant">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-primary)" }} />
        <div className="relative flex flex-col gap-3 text-primary-foreground">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI Productivity Suite
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Automate your workplace tasks with AI
          </h1>
          <p className="max-w-2xl text-sm text-primary-foreground/90 md:text-base">
            Draft emails, summarize meetings, plan work and run research — all in one clean,
            structured workspace.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-3 text-base">{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Open tool →
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <Disclaimer />
    </div>
  );
}
