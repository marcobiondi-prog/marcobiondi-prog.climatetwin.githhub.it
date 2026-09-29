import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Ring({ value, max = 100, size = 120, stroke = 12, color = "var(--primary)", children }: { value: number; max?: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} style={{ transition: "stroke-dashoffset .6s cubic-bezier(.2,.8,.2,1), stroke .3s" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("card-soft p-5", className)}>{children}</div>;
}

export function Metric({ label, value, unit, color, hint, children }: { label: string; value: ReactNode; unit?: string; color?: string; hint?: string; children?: ReactNode }) {
  return (
    <Card className="lift">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold" style={{ color }}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      {children}
    </Card>
  );
}

const levelMap: Record<string, string> = {
  basso: "bg-ok/15 text-ok", bassa: "bg-ok/15 text-ok", breve: "bg-ok/15 text-ok", ok: "bg-ok/15 text-ok",
  moderato: "bg-warn/20 text-warn", medio: "bg-warn/20 text-warn", media: "bg-warn/20 text-warn",
  elevato: "bg-danger/15 text-danger", alto: "bg-danger/15 text-danger", alta: "bg-danger/15 text-danger", lungo: "bg-danger/15 text-danger",
};
export function StatusBadge({ level, children }: { level: string; children?: ReactNode }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", levelMap[level] ?? "bg-muted text-muted-foreground")}>
    <span className="size-1.5 rounded-full bg-current" />{children ?? level}
  </span>;
}

export function levelColor(v: number) {
  return v < 35 ? "var(--ok)" : v < 65 ? "var(--warn)" : "var(--danger)";
}

export function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="mt-1 text-3xl font-semibold md:text-4xl">{title}</h2>
      {desc && <p className="mt-2 max-w-2xl text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function Pills<T extends string>({ options, value, onChange, className }: { options: readonly T[]; value: T; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={cn("inline-flex flex-wrap gap-1 rounded-full bg-muted p-1", className)}>
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
          className={cn("rounded-full px-4 py-1.5 text-sm font-medium transition-all", value === o ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
          {o}
        </button>
      ))}
    </div>
  );
}
