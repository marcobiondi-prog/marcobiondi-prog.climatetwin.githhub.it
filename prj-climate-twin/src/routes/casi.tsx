import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Card, Pills, SectionTitle } from "@/components/health";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cases } from "@/lib/data";

export const Route = createFileRoute("/casi")({
  head: () => ({
    meta: [
      { title: "Casi studio internazionali — Climate Twin" },
      { name: "description", content: "10 città che sperimentano rifugi climatici, digital twin e infrastrutture verdi e blu." },
      { property: "og:title", content: "Casi studio internazionali — Climate Twin" },
      { property: "og:description", content: "Bilbao, Siviglia, Lisbona, Barcellona, Parigi, Padova, Bologna, Campobasso, Termoli, Singapore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Casi,
});

const filters = ["Tutti", "Calore", "Digital Twin", "Verde e acqua", "Italia"] as const;
const tagColor: Record<string, string> = { Calore: "var(--danger)", "Digital Twin": "var(--primary)", "Verde e acqua": "var(--leaf)", Italia: "var(--vine)" };

function Casi() {
  const [f, setF] = useState<(typeof filters)[number]>("Tutti");
  const list = cases.filter((c) => f === "Tutti" || c.tags.includes(f));
  return (
    <div>
      <SectionTitle eyebrow="Benchmark internazionale" title="Le città stanno già sperimentando" desc="Non esiste un’unica soluzione: ricorrono misurazione locale, infrastrutture verdi e blu, rifugi climatici, modelli 3D e scenari “what if”." />
      <div className="mb-6 flex items-center justify-between gap-4">
        <Pills options={filters} value={f} onChange={setF} />
        <span className="text-sm text-muted-foreground">{list.length} di {cases.length}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <Dialog key={c.city}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="card-soft lift h-auto min-h-44 w-full animate-in flex-col items-stretch justify-between whitespace-normal p-5 text-left fade-in zoom-in-95 duration-300">
                <span>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><MapPin className="size-3" />{c.country}</span>
                  <span className="mt-1 block font-display text-2xl font-semibold">{c.city}</span>
                  <span className="block text-sm font-medium text-primary">{c.project}</span>
                  <span className="mt-2 block text-sm font-normal">{c.claim}</span>
                </span>
                <span className="mt-4 flex items-end justify-between gap-3">
                  <span className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => <span key={tag} className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ color: tagColor[tag], background: `color-mix(in oklab, ${tagColor[tag]} 14%, transparent)` }}>{tag}</span>)}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">Apri <ArrowUpRight className="size-3.5" /></span>
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-xl overflow-y-auto rounded-2xl p-0">
              <div className="border-b bg-muted p-6 pr-12">
                <div className="mb-3 flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><MapPin className="size-4" />{c.country}</div>
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl">{c.city}</DialogTitle>
                  <DialogDescription className="text-base font-medium text-primary">{c.project}</DialogDescription>
                </DialogHeader>
              </div>
              <div className="space-y-5 p-6 pt-2">
                <div><div className="mb-1 text-xs font-bold uppercase text-muted-foreground">Approccio</div><p className="text-lg leading-relaxed">{c.claim}</p></div>
                <div><div className="mb-2 text-xs font-bold uppercase text-muted-foreground">Ambiti</div><div className="flex flex-wrap gap-2">{c.tags.map((tag) => <span key={tag} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ color: tagColor[tag], background: `color-mix(in oklab, ${tagColor[tag]} 14%, transparent)` }}>{tag}</span>)}</div></div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <Card className="mt-8">
        <div className="text-sm font-semibold">Pattern comune</div>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {["Osservare il luogo", "Localizzare il rischio", "Simulare alternative", "Verificare gli effetti"].map((s, i) => (
            <div key={s} className="flex items-center gap-2 rounded-2xl bg-muted p-3 text-sm font-medium"><span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{i + 1}</span>{s}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}
