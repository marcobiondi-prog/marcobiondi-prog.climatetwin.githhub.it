import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Grape, ArrowRight, Database, Box, LineChart, Compass } from "lucide-react";
import { Card, Ring, SectionTitle } from "@/components/health";
import { phases, hmw, insights, flows } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Climate Twin — Dal rischio climatico alla scelta informata" },
      { name: "description", content: "Metodologia Design Thinking, insight e due flussi (urbano e vitivinicolo) per l'adattamento climatico." },
      { property: "og:title", content: "Climate Twin — Dal rischio climatico alla scelta informata" },
      { property: "og:description", content: "Dati locali, sensori e simulazioni per confrontare interventi di adattamento." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-16">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-8 md:p-10">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">ITS 4.0 · Fase di ideazione</div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">Dal rischio climatico <span className="text-primary">alla scelta informata.</span></h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Un sistema che integra dati locali, sensori e simulazioni per confrontare interventi di adattamento in uno spazio urbano o agricolo circoscritto.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/lab" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-transform hover:scale-[1.03]">Prova la simulazione <ArrowRight className="size-4" /></Link>
            <Link to="/casi" className="rounded-full bg-muted px-5 py-2.5 font-medium transition-colors hover:bg-accent">Esplora i casi studio</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            {["Diagnosi locale", "Scenari comparabili", "Decisione umana"].map((t) => <span key={t} className="rounded-full border px-3 py-1">{t}</span>)}
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card className="col-span-2 flex items-center gap-5">
            <Ring value={38.4} max={50} color="var(--danger)"><span className="font-display text-2xl font-semibold">38.4°</span><span className="text-[10px] text-muted-foreground">superficie</span></Ring>
            <div><div className="text-sm text-muted-foreground">Superficie critica</div><div className="font-display text-2xl font-semibold">38.4 °C</div><div className="mt-1 text-xs text-muted-foreground">Area pilota 120 × 80 m</div></div>
          </Card>
          <Card><div className="text-sm text-muted-foreground">Scenario B</div><div className="mt-1 font-display text-lg font-semibold">Ombra + depaving</div></Card>
          <Card><div className="text-sm text-muted-foreground">Stima dimostrativa</div><div className="mt-1 font-display text-3xl font-semibold text-ok">−2.1 °C</div></Card>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Design Thinking" title="La ricerca prima della tecnologia" desc="Il progetto parte da persone, decisioni reali e strumenti già in uso. La soluzione viene selezionata solo dopo aver confrontato bisogni, dati disponibili e fattibilità." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {phases.map((p) => (
            <Card key={p.n} className="lift flex flex-col items-center text-center">
              <Ring value={p.p} size={84} stroke={9} color={p.p === 100 ? "var(--ok)" : "var(--primary)"}><span className="font-display font-semibold">{p.n}</span></Ring>
              <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              <span className="mt-2 text-xs font-semibold text-muted-foreground">{p.p}% completato</span>
            </Card>
          ))}
        </div>
        <Card className="mt-4 bg-foreground text-background">
          <div className="text-xs font-bold uppercase tracking-widest opacity-60">How might we</div>
          <p className="mt-2 font-display text-xl md:text-2xl">{hmw}</p>
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Insight" title="Ciò che emerge dalle ricerche" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((i, k) => (
            <Card key={i.t} className="lift">
              <div className="font-display text-sm font-bold text-primary">0{k + 1}</div>
              <h3 className="mt-1 text-lg font-semibold">{i.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Moduli" title="Due flussi, un motore comune" />
        <div className="grid gap-4 lg:grid-cols-2">
          {([["urban", Building2, "var(--urban)"], ["vine", Grape, "var(--vine)"]] as const).map(([k, Icon, col]) => (
            <Card key={k} className="p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl text-primary-foreground" style={{ background: col }}><Icon className="size-5" /></span>
                <h3 className="text-2xl font-semibold">{flows[k].name}</h3>
              </div>
              <div className="mt-4 space-y-2">
                {flows[k].modules.map((m) => (
                  <div key={m.t} className="rounded-2xl bg-muted p-4">
                    <div className="font-semibold" style={{ color: col }}>{m.t}</div>
                    <div className="text-sm text-muted-foreground">{m.d}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Architettura concettuale" title="Una base, due applicazioni" />
        <div className="grid gap-4 md:grid-cols-4">
          {[[Database, "Dati", "Sensori, satellite, meteo, cartografia"], [Box, "Modello", "Rappresentazione locale aggiornabile"], [LineChart, "Analisi", "Indicatori, scenari, incertezza"], [Compass, "DSS", "Confronto o raccomandazione supervisionata"]].map(([I, t, d]) => {
            const Icon = I as typeof Database;
            return <Card key={t as string} className="lift"><Icon className="size-6 text-primary" /><div className="mt-2 font-semibold">{t as string}</div><div className="text-sm text-muted-foreground">{d as string}</div></Card>;
          })}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[["A", "Micro Twin urbano", "Confronto tra interventi su piazze, parchi e percorsi esposti.", "Tecnici comunali e gestori del verde"], ["B", "Adaptive Vineyard", "Mappa dello stress e priorità per zone del vigneto.", "Agricoltori, consulenti, cooperative"], ["C", "Climate Decision Engine", "Motore comune con moduli urbano e agricolo.", "Enti, imprese e servizi territoriali"]].map(([a, t, d, u]) => (
            <Card key={a}><div className="font-display text-3xl font-bold text-primary/30">{a}</div><h3 className="text-lg font-semibold">{t}</h3><p className="text-sm text-muted-foreground">{d}</p><p className="mt-2 text-xs font-semibold">Utenti: {u}</p></Card>
          ))}
        </div>
      </section>
    </div>
  );
}
