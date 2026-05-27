import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
      <p>
        AI outputs can be inaccurate. Review and edit before sharing. Avoid entering confidential or
        personal data. You are responsible for the final content.
      </p>
    </div>
  );
}
