import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import { Card, Pills, SectionTitle } from "@/components/health";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { interviews, type Kind } from "@/lib/data";

export const Route = createFileRoute("/interviste")({
  head: () => ({
    meta: [
      { title: "Archivio interviste e testimonianze — Climate Twin" },
      { name: "description", content: "13 interview card: interviste dirette, dichiarazioni pubbliche CLIMol ed evidenze scientifiche." },
      { property: "og:title", content: "Archivio interviste e testimonianze — Climate Twin" },
      { property: "og:description", content: "Voci dal territorio, dalle istituzioni e dalla ricerca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Interviste,
});

const tabs = ["Interviste dirette", "Dichiarazioni pubbliche / CLIMol", "Evidenze scientifiche"] as const;
const map: Record<(typeof tabs)[number], Kind> = { "Interviste dirette": "diretta", "Dichiarazioni pubbliche / CLIMol": "pubblica", "Evidenze scientifiche": "scientifica" };
const col: Record<Kind, string> = { diretta: "var(--primary)", pubblica: "var(--urban)", scientifica: "var(--vine)" };

function Interviste() {
  const [t, setT] = useState<(typeof tabs)[number]>("Interviste dirette");
  const list = interviews.filter((i) => i.kind === map[t]);
  return (
    <div>
      <SectionTitle eyebrow="Empatia sul campo" title="Interview Card" desc="Le interviste dirette sono distinte dalle dichiarazioni pubbliche e dalle evidenze documentali: nessuna fonte è presentata come intervista personale se non lo è." />
      <Pills options={tabs} value={t} onChange={setT} className="mb-6" />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((i) => (
          <Dialog key={i.name}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="card-soft lift h-auto min-h-64 w-full animate-in flex-col items-stretch justify-between whitespace-normal p-5 text-left fade-in slide-in-from-bottom-2 duration-300">
                <span>
                  <span className="flex items-center gap-3">
                    {i.img ? <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-primary font-display font-semibold text-primary-foreground"><span>{i.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><img src={i.img} alt="" onError={(event) => { event.currentTarget.hidden = true; }} className="absolute inset-0 size-12 rounded-full object-cover" /></span> :
                      <span className="grid size-12 shrink-0 place-items-center rounded-full font-display font-semibold text-primary-foreground" style={{ background: col[i.kind] }}>{i.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>}
                    <span className="min-w-0"><span className="block font-semibold">{i.name}</span><span className="block text-xs font-normal text-muted-foreground">{i.role}</span></span>
                  </span>
                  <span className="mt-4 flex gap-2 font-display text-lg font-medium"><Quote className="size-5 shrink-0" style={{ color: col[i.kind] }} />{i.quote}</span>
                </span>
                <span className="mt-4 flex items-center justify-between gap-3 border-t pt-3"><span className="text-xs font-normal text-muted-foreground">{i.meta}</span><span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">Leggi <ArrowUpRight className="size-3.5" /></span></span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto rounded-2xl">
              <DialogHeader className="pr-8">
                <div className="mb-3 flex items-center gap-3">
                  {i.img ? <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground"><span>{i.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><img src={i.img} alt="" onError={(event) => { event.currentTarget.hidden = true; }} className="absolute inset-0 size-14 rounded-full object-cover" /></span> : <span className="grid size-14 shrink-0 place-items-center rounded-full font-display text-lg font-semibold text-primary-foreground" style={{ background: col[i.kind] }}>{i.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span>}
                  <div><DialogTitle className="font-display text-2xl">{i.name}</DialogTitle><DialogDescription>{i.role}</DialogDescription></div>
                </div>
                <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold">{i.meta}</span>
              </DialogHeader>
              <blockquote className="mt-2 border-l-4 pl-5 font-display text-xl leading-relaxed" style={{ borderColor: col[i.kind] }}>“{i.quote}”</blockquote>
              <div className="rounded-2xl bg-muted p-4"><div className="mb-1 text-xs font-bold uppercase text-muted-foreground">Insight</div><p className="leading-relaxed">{i.insight}</p></div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Le card “documentali” sintetizzano contenuti pubblici e non rappresentano interviste condotte dal team.</p>
    </div>
  );
}
