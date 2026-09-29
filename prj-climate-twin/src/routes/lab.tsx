import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Grape, Droplets, Wrench, Clock } from "lucide-react";
import { Card, Pills, Ring, SectionTitle, StatusBadge, levelColor } from "@/components/health";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { urbanModel, vineModel, phenoPhases, type Pheno } from "@/lib/data";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Climate Decision Lab — Simulazioni interattive" },
      { name: "description", content: "Simula interventi urbani (ΔT) e lo stress idro-termico del vigneto in tempo reale." },
      { property: "og:title", content: "Climate Decision Lab — Simulazioni interattive" },
      { property: "og:description", content: "Slider, mappe termiche e parcelle reattive per confrontare scenari." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Lab,
});

function Ctl({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return <div><div className="mb-2 flex justify-between text-sm"><span className="font-medium">{label}</span><span className="font-display font-semibold text-primary">{value}</span></div>{children}</div>;
}

const temperatureFillClasses = ["fill-radar-cool", "fill-radar-mild", "fill-radar-warm", "fill-radar-hot", "fill-radar-extreme"];
const temperatureStrokeClasses = ["stroke-radar-cool", "stroke-radar-mild", "stroke-radar-warm", "stroke-radar-hot", "stroke-radar-extreme"];
const temperatureBgClasses = ["bg-radar-cool", "bg-radar-mild", "bg-radar-warm", "bg-radar-hot", "bg-radar-extreme"];

function temperatureLevel(temperature: number, min: number, max: number) {
  const progress = Math.max(0, Math.min(1, (temperature - min) / (max - min)));
  return Math.min(4, Math.floor(progress * 5));
}

function ConcentricRadar({ temperature, min, max, title }: { temperature: number; min: number; max: number; title: string }) {
  const [selectedRing, setSelectedRing] = useState<{ ring: number; temperature: number } | null>(null);
  const [showBands, setShowBands] = useState(true);
  const step = Math.max(1, (max - min) / 7);
  const ringTemperatures = Array.from({ length: 5 }, (_, index) => Math.max(min, Math.min(max, temperature - (4 - index) * step)));
  const legend = (
    <div>
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Legenda temperature</div>
      <div className="flex flex-wrap gap-1.5">
        {ringTemperatures.map((t, i) => {
          const level = temperatureLevel(t, min, max);
          return (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground">
              <span className={`size-2.5 shrink-0 rounded-full ${temperatureBgClasses[level] ?? "bg-radar-cool"}`} aria-hidden="true" />
              {t.toFixed(1)} °C{i === 4 ? " · nucleo" : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
  return (
    <Card className="order-1 lg:order-2">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div><div className="font-semibold">{title}</div><div className="mt-0.5 text-xs text-muted-foreground">Ogni variazione di temperatura aggiorna la graduazione dal freddo al caldo.</div></div>
        <div className="flex items-start gap-4">
          <div className="flex min-h-8 cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
            <Switch checked={showBands} onCheckedChange={setShowBands} aria-label="Mostra o nascondi le fasce colorate del radar" />
            <span>Fasce colorate</span>
          </div>
          <div className="hidden min-w-44 lg:block">{legend}</div>
        </div>
      </div>
      <Button type="button" variant="ghost" aria-label={`${title} interattivo. Seleziona una fascia`} onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const distance = Math.hypot(x, y) / (Math.min(rect.width, rect.height) / 2);
        const ring = Math.max(0, Math.min(4, 4 - Math.floor(Math.min(distance, 0.999) * 5)));
        setSelectedRing({ ring, temperature: ringTemperatures[ring] ?? temperature });
      }} className="relative mx-auto block aspect-square h-auto w-full max-w-96 overflow-hidden rounded-full border border-border bg-muted p-0 shadow-none ring-offset-card">
        <svg viewBox="0 0 500 500" className="absolute inset-0" style={{ width: "100%", height: "100%" }} aria-hidden="true">
          <defs><filter id={`radar-soft-${title.replaceAll(" ", "-")}`}><feGaussianBlur stdDeviation="1.8" /></filter></defs>
          {[250, 200, 150, 100, 50].map((radius, index) => {
            const level = temperatureLevel(ringTemperatures[index] ?? temperature, min, max);
            return <circle key={radius} cx="250" cy="250" r={radius} fill={showBands ? undefined : "var(--muted)"} className={`${showBands ? temperatureFillClasses[level] ?? "fill-radar-cool" : ""} ${temperatureStrokeClasses[level] ?? "stroke-radar-cool"} transition-all duration-500`} strokeWidth="2" opacity={showBands ? 0.58 + index * 0.07 : 0.35} filter={`url(#radar-soft-${title.replaceAll(" ", "-")})`} />;
          })}
          {[200, 150, 100, 50].map((radius) => <circle key={`line-${radius}`} cx="250" cy="250" r={radius} fill="none" stroke="var(--card)" strokeOpacity=".85" strokeWidth="2.5" />)}
          <path d="M250 8V492M8 250H492" stroke="var(--card)" strokeOpacity=".42" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => {
            const value = ringTemperatures[i] ?? temperature;
            const level = temperatureLevel(value, min, max);
            const y = 26 + i * 50;
            return (
              <g key={`label-${i}`}>
                <rect x={272} y={y - 10} width={48} height={20} rx={10} fill="var(--card)" fillOpacity=".92" className={temperatureStrokeClasses[level] ?? "stroke-radar-cool"} strokeWidth="1.5" />
                <text x={296} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)">{value.toFixed(1)}°</text>
              </g>
            );
          })}
          {selectedRing && <circle cx="250" cy="250" r={250 - selectedRing.ring * 50 - 25} fill="none" stroke="var(--foreground)" strokeWidth="4" strokeDasharray="9 7" />}
        </svg>
        <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-md bg-card/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm">N</span>
        <span className="absolute inset-0 grid place-items-center text-center"><span className="rounded-full bg-card/90 px-3 py-2 shadow-sm"><b className="block text-xl">{temperature.toFixed(1)} °C</b><span className="text-[10px] text-muted-foreground">nucleo</span></span></span>
      </Button>
      <div className="mt-3 lg:hidden">{legend}</div>
      <div className="mt-3 flex min-h-8 flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground">Esterno fresco → nucleo caldo</span>
        <span aria-live="polite" className="font-semibold">{selectedRing ? `Fascia ${selectedRing.ring + 1} · ${selectedRing.temperature.toFixed(1)} °C` : "Seleziona una fascia"}</span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Output illustrativo: la validazione richiede dati locali, calibrazione del modello e verifica di un tecnico.</p>
    </Card>
  );
}

function Urban() {
  const [trees, setTrees] = useState(12), [depave, setDepave] = useState(25), [shade, setShade] = useState(20), [albedo, setAlbedo] = useState(0.35), [mist, setMist] = useState(false);
  const r = urbanModel({ trees, depave, shade, albedo, mist });
  const centerTemperature = Math.max(30, 40 - r.dT);
  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card className="p-4 sm:p-5">
        <h3 className="font-semibold">Controlli intervento</h3>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-1 lg:gap-y-6">
          <Ctl label="Alberi" value={`${trees}`}><Slider min={0} max={60} value={[trees]} onValueChange={([v]) => setTrees(v ?? 0)} /></Ctl>
          <Ctl label="Depaving" value={`${depave}%`}><Slider min={0} max={60} value={[depave]} onValueChange={([v]) => setDepave(v ?? 0)} /></Ctl>
          <Ctl label="Ombra" value={`${shade}%`}><Slider min={0} max={60} value={[shade]} onValueChange={([v]) => setShade(v ?? 0)} /></Ctl>
          <Ctl label="Albedo" value={albedo.toFixed(2)}><Slider min={0.2} max={0.8} step={0.01} value={[albedo]} onValueChange={([v]) => setAlbedo(v ?? 0)} /></Ctl>
          <label className="col-span-2 flex min-h-11 items-center justify-between rounded-xl bg-muted px-3 text-sm font-medium lg:col-span-1">Micro-nebulizzazione <Switch checked={mist} onCheckedChange={setMist} /></label>
        </div>
      </Card>
      <div className="flex flex-col gap-4">
        <div className="order-2 grid gap-4 sm:grid-cols-3 lg:order-1">
          <Card className="flex flex-col items-center">
            <Ring value={r.dT} max={5.2} size={140} color="var(--urban)"><span className="font-display text-3xl font-semibold">−{r.dT.toFixed(1)}</span><span className="text-xs text-muted-foreground">°C stimati</span></Ring>
            <div className="mt-2 text-xs text-muted-foreground">Intervallo: −{r.lo.toFixed(1)} / −{r.hi.toFixed(1)} °C</div>
          </Card>
          <Card className="flex flex-col items-center">
            <Ring value={r.reliability} size={140} color="var(--ok)"><span className="font-display text-3xl font-semibold">{r.reliability}%</span><span className="text-xs text-muted-foreground">affidabilità</span></Ring>
            <div className="mt-2 text-xs text-muted-foreground">Confidenza concettuale</div>
          </Card>
          <Card className="space-y-3">
            <div className="text-sm font-semibold">Trade-off</div>
            <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><Droplets className="size-4 text-water" />Consumo idrico</span><StatusBadge level={r.water} /></div>
            <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><Wrench className="size-4" />Manutenzione</span><StatusBadge level={r.maint} /></div>
            <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2"><Clock className="size-4" />Tempi</span><StatusBadge level={r.time} /></div>
          </Card>
        </div>
        <ConcentricRadar temperature={centerTemperature} min={30} max={40} title="Radar termico concentrico" />
      </div>
    </div>
  );
}

function Vine() {
  const [moisture, setM] = useState(28), [temp, setT] = useState(33), [wind, setW] = useState(12), [phase, setP] = useState<Pheno>("Fioritura"), [rain, setR] = useState(false);
  const r = vineModel({ moisture, temp, wind, phase, rain });
  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card className="space-y-6">
        <h3 className="font-semibold">Condizioni parcella</h3>
        <Ctl label="Umidità suolo" value={`${moisture}%`}><Slider min={5} max={50} value={[moisture]} onValueChange={([v]) => setM(v ?? 0)} /></Ctl>
        <Ctl label="Temperatura aria" value={`${temp} °C`}><Slider min={15} max={44} value={[temp]} onValueChange={([v]) => setT(v ?? 0)} /></Ctl>
        <Ctl label="Vento" value={`${wind} km/h`}><Slider min={0} max={50} value={[wind]} onValueChange={([v]) => setW(v ?? 0)} /></Ctl>
        <div><div className="mb-2 text-sm font-medium">Fase fenologica</div><div className="grid grid-cols-2 gap-1">{phenoPhases.map((p) => <button key={p} onClick={() => setP(p)} className={`rounded-xl px-2 py-2 text-xs font-semibold transition-all ${phase === p ? "bg-vine text-primary-foreground" : "bg-muted hover:bg-accent"}`}>{p}</button>)}</div></div>
        <label className="flex items-center justify-between rounded-2xl bg-muted p-3 text-sm font-medium">Pioggia utile prevista <Switch checked={rain} onCheckedChange={setR} /></label>
      </Card>
      <div className="flex flex-col gap-4">
        <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
          <Card className="flex items-center gap-5">
            <Ring value={r.s} size={150} color={levelColor(r.s)}><span className="font-display text-4xl font-semibold">{r.s}</span><span className="text-xs text-muted-foreground">indice stress</span></Ring>
            <div className="space-y-2"><div className="text-sm text-muted-foreground">Livello di rischio</div><StatusBadge level={r.risk}>Rischio {r.risk}</StatusBadge><div className="text-xs text-muted-foreground">Fase: {phase}</div></div>
          </Card>
          <Card><div className="text-sm font-semibold">Priorità operativa</div><p className="mt-2 font-display text-xl">{r.priority}</p></Card>
        </div>
        <ConcentricRadar temperature={temp} min={15} max={44} title="Radar termico del vigneto" />
      </div>
    </div>
  );
}

function Lab() {
  const [m, setM] = useState<"Flusso Urbano" | "Flusso Vitivinicolo">("Flusso Urbano");
  return (
    <div>
      <SectionTitle eyebrow="Prototipo concettuale" title="Climate Decision Lab" desc="Una simulazione esplorativa. I valori sono dimostrativi e non sostituiscono modelli fisici calibrati." />
      <div className="mb-6 flex items-center gap-3">
        {m === "Flusso Urbano" ? <Building2 className="size-5 text-urban" /> : <Grape className="size-5 text-vine" />}
        <Pills options={["Flusso Urbano", "Flusso Vitivinicolo"] as const} value={m} onChange={setM} />
      </div>
      {m === "Flusso Urbano" ? <Urban /> : <Vine />}
    </div>
  );
}
