import { Zap, Lock, Infinity as InfinityIcon } from "lucide-react";

const props = [
  {
    icon: Zap,
    title: "Fast, on purpose",
    description:
      "Every tool is built as a lightweight page, not a bloated app — so it opens instantly and runs smoothly, even on a slow connection.",
  },
  {
    icon: Lock,
    title: "Nothing leaves your browser",
    description:
      "Your invoices, numbers, and messages are processed on your device. Nuvixa doesn't store what you type or ask you to create an account.",
  },
  {
    icon: InfinityIcon,
    title: "Free, with no catch",
    description:
      "No paywalled features, no usage limits, no \"upgrade to export.\" Nuvixa stays free because that's the entire point of building it.",
  },
];

export function ValueProps() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="container py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Built to be used, not signed up for
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three principles guide every tool we ship on Nuvixa.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {props.map((prop) => (
            <div
              key={prop.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <prop.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
