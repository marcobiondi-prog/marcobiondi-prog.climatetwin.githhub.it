import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { AlertTriangle, Download, Plus, Building2, Grape, LayoutGrid } from "lucide-react";
import { Card, Metric, Pills, Ring, SectionTitle, StatusBadge, levelColor } from "@/components/health";
import { Slider } from "@/components/ui/slider";
import { noise } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard operative — Climate Twin" },
      { name: "description", content: "Dashboard urbana (WBGT, rifugi), vitivinicola (CWSI, sonde, maturazione) e cruscotto esecutivo unificato." },
      { property: "og:title", content: "Dashboard operative — Climate Twin" },
      { property: "og:description", content: "Indicatori di salute climatica, trend e report esportabili." },
    ],
  }),
  component: Dashboard,
});

const hours = Array.from({ length: 24 }, (_, h) => ({ h: `${h}:00`, wbgt: +(22 + 8 * Math.sin(((h - 8) / 24) * Math.PI * 2 * 0.9) * (h > 6 && h < 21 ? 1 : 0.3) + noise(h) * 1.5).toFixed(1) }));
const days = Array.from({ length: 14 }, (_, d) => ({ d: `G${d + 1}`, s20: +(32 - d * 1.3 + noise(d) * 3).toFixed(1), s50: +(36 - d * 0.7 + noise(d, 2) * 2).toFixed(1) }));
const ripe = Array.from({ length: 10 }, (_, w) => ({ w: `S${w + 1}`, zuccheri: +(12 + w * 1.4 + noise(w) * 0.5).toFixed(1), polifenoli: +(8 + w * 0.9 - Math.max(0, w - 6) * 0.3 + noise(w, 5) * 0.4).toFixed(1) }));
const tip = { contentStyle: { borderRadius: 16, border: "none", boxShadow: "0 8px 24px -8px rgb(0 0 0 / .2)" } };

function Header({ icon: Icon, color, title }: { icon: typeof Building2; color: string; title: string }) {
  return <div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl text-primary-foreground" style={{ background: color }}><Icon className="size-5" /></span><h3 className="text-2xl font-semibold">{title}</h3></div>;
}

function UrbanDash() {
  const [target] = useState(30);
  const cover = 21;
  const peak = Math.max(...hours.map((x) => x.wbgt));
  const lvl = peak > 29 ? "elevato" : peak > 26 ? "moderato" : "basso";
  return (
    <div>
      <Header icon={Building2} color="var(--urban)" title="Dashboard Urbana" />
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="flex flex-col items-center"><Ring value={peak} max={35} color={levelColor(peak > 29 ? 80 : peak > 26 ? 50 : 20)}><span className="font-display text-2xl font-semibold">{peak}</span><span className="text-[10px] text-muted-foreground">WBGT max °C</span></Ring><StatusBadge level={lvl}>Calore {lvl}</StatusBadge></Card>
        <Card className="flex flex-col items-center"><Ring value={cover} max={target} color="var(--leaf)"><span className="font-display text-2xl font-semibold">{cover}%</span><span className="text-[10px] text-muted-foreground">target {target}%</span></Ring><span className="text-xs text-muted-foreground">Copertura arborea</span></Card>
        <Card className="flex flex-col items-center justify-center gap-3">
          <div className="text-sm font-semibold">Isocrone rifugi climatici</div>
          <div className="relative size-28">
            <div className="absolute inset-0 rounded-full bg-urban/15" /><div className="absolute inset-5 rounded-full bg-urban/35" /><div className="absolute inset-[44px] rounded-full bg-urban" />
          </div>
          <div className="flex gap-3 text-xs"><span><b>62%</b> ≤5 min</span><span><b>88%</b> ≤10 min</span></div>
        </Card>
        <Card className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold"><AlertTriangle className="size-4 text-danger" />Alert calore</div>
          {[["14:00–17:00", "elevato", "Piazza Municipio"], ["12:00–14:00", "moderato", "Via Roma"], ["Sera", "basso", "Parco Nord"]].map(([t, l, p]) => (
            <div key={p} className="flex items-center justify-between rounded-xl bg-muted p-2 text-xs"><div><div className="font-semibold">{p}</div><div className="text-muted-foreground">{t}</div></div><StatusBadge level={l as string} /></div>
          ))}
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card><div className="mb-2 text-sm font-semibold">Andamento WBGT · 24 h</div>
          <ResponsiveContainer width="100%" height={240}><AreaChart data={hours}><defs><linearGradient id="gw" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--danger)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--danger)" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="h" fontSize={11} interval={3} /><YAxis fontSize={11} domain={[15, 35]} /><Tooltip {...tip} /><Area type="monotone" dataKey="wbgt" stroke="var(--danger)" strokeWidth={3} fill="url(#gw)" /></AreaChart></ResponsiveContainer>
        </Card>
        <Card><div className="text-sm font-semibold">Scheda intervento</div>
          <div className="mt-3 space-y-2 text-sm">
            {[["Area", "Piazza Municipio"], ["Scenario", "B · ombra + depaving"], ["ΔT atteso", "−2.1 °C"], ["Costo stimato", "medio"], ["Stato", "In valutazione"]].map(([k, v]) => <div key={k} className="flex justify-between border-b pb-2 last:border-0"><span className="text-muted-foreground">{k}</span><b>{v}</b></div>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

function VineDash() {
  const [cur, setCur] = useState(22), [tgt, setTgt] = useState(32), [eff, setEff] = useState(85);
  const vol = Math.max(0, ((tgt - cur) / 100) * 0.5 * 10000 / (eff / 100));
  const cwsi = 0.58;
  const [notes, setNotes] = useState([{ d: "24/09", t: "Trattamento rame zona B" }, { d: "26/09", t: "Irrigazione soccorso 90 m³/ha zona A" }]);
  const [txt, setTxt] = useState("");
  return (
    <div>
      <Header icon={Grape} color="var(--vine)" title="Dashboard Vitivinicola" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex items-center gap-4"><Ring value={cwsi} max={1} color={levelColor(cwsi * 100)}><span className="font-display text-3xl font-semibold">{cwsi}</span><span className="text-[10px] text-muted-foreground">CWSI</span></Ring><div><StatusBadge level="moderato">Stress moderato</StatusBadge><p className="mt-2 text-xs text-muted-foreground">0 = nessuno stress · 1 = stress massimo</p></div></Card>
        <Metric label="Sonda 20 cm" value={days.at(-1)!.s20} unit="%" color="var(--water)" hint="Umidità volumetrica" />
        <Metric label="Sonda 50 cm" value={days.at(-1)!.s50} unit="%" color="var(--urban)" hint="Umidità volumetrica" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><div className="mb-2 text-sm font-semibold">Sonde umidità multilivello · 14 giorni</div>
          <ResponsiveContainer width="100%" height={220}><LineChart data={days}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="d" fontSize={11} /><YAxis fontSize={11} /><Tooltip {...tip} /><Legend /><Line dataKey="s20" name="20 cm" stroke="var(--water)" strokeWidth={3} dot={false} /><Line dataKey="s50" name="50 cm" stroke="var(--urban)" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer>
        </Card>
        <Card><div className="mb-2 text-sm font-semibold">Curve di maturazione · zuccheri vs polifenoli</div>
          <ResponsiveContainer width="100%" height={220}><LineChart data={ripe}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="w" fontSize={11} /><YAxis fontSize={11} /><Tooltip {...tip} /><Legend /><Line dataKey="zuccheri" name="Zuccheri (°Bx)" stroke="var(--warn)" strokeWidth={3} dot={false} /><Line dataKey="polifenoli" name="Polifenoli (idx)" stroke="var(--vine)" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="space-y-4">
          <div className="text-sm font-semibold">Irrigazione di soccorso</div>
          {[["Umidità attuale", cur, setCur, `${cur}%`], ["Umidità obiettivo", tgt, setTgt, `${tgt}%`], ["Efficienza impianto", eff, setEff, `${eff}%`]].map(([l, v, s, lab]) => (
            <div key={l as string}><div className="mb-1 flex justify-between text-sm"><span>{l as string}</span><b>{lab as string}</b></div><Slider min={l === "Efficienza impianto" ? 50 : 5} max={l === "Efficienza impianto" ? 100 : 50} value={[v as number]} onValueChange={([x]) => (s as (n: number) => void)(x ?? 0)} /></div>
          ))}
          <div className="rounded-2xl bg-water/10 p-4"><div className="text-xs text-muted-foreground">Volume consigliato (strato 50 cm)</div><div className="font-display text-4xl font-semibold text-water">{Math.round(vol)} <span className="text-base">m³/ha</span></div></div>
        </Card>
        <Card>
          <div className="text-sm font-semibold">Quaderno di campagna digitale</div>
          <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!txt.trim()) return; setNotes([{ d: new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit" }), t: txt }, ...notes]); setTxt(""); }}>
            <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Nuova operazione…" className="flex-1 rounded-full bg-muted px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button className="grid size-9 place-items-center rounded-full bg-vine text-primary-foreground"><Plus className="size-4" /></button>
          </form>
          <ul className="mt-3 max-h-52 space-y-2 overflow-auto">{notes.map((n, i) => <li key={i} className="flex gap-3 rounded-xl bg-muted p-3 text-sm animate-in fade-in slide-in-from-top-1"><b className="text-vine">{n.d}</b>{n.t}</li>)}</ul>
        </Card>
      </div>
    </div>
  );
}

function Exec() {
  const [ctx, setCtx] = useState<"Urbano" | "Vitivinicolo">("Urbano");
  const idx = ctx === "Urbano" ? [["Calore", 72], ["Rifugi", 38], ["Verde", 55]] : [["Stress idrico", 58], ["Stress termico", 66], ["Maturità", 30]];
  const lv = (v: number) => (v < 35 ? "basso" : v < 65 ? "moderato" : "elevato");
  const water = [{ m: "Giu", domanda: 420, disponibile: 520 }, { m: "Lug", domanda: 610, disponibile: 470 }, { m: "Ago", domanda: 680, disponibile: 410 }, { m: "Set", domanda: 450, disponibile: 480 }];
  const exportReport = () => {
    const lines = [`REPORT SINTETICO DECISIONI — ${ctx}`, `Data: ${new Date().toLocaleString("it-IT")}`, "", "Indici normalizzati:", ...idx.map(([k, v]) => `- ${k}: ${v}/100 (${lv(v as number)})`), "", "Bilancio idrico (m³):", ...water.map((w) => `- ${w.m}: domanda ${w.domanda}, disponibile ${w.disponibile}, saldo ${w.disponibile - w.domanda}`), "", "Nota: valori dimostrativi, da validare con un tecnico."];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
    const a = document.createElement("a"); a.href = url; a.download = `report-${ctx.toLowerCase()}.txt`; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="grid size-10 place-items-center rounded-2xl bg-foreground text-background"><LayoutGrid className="size-5" /></span>
        <h3 className="text-2xl font-semibold">Cruscotto Esecutivo</h3>
        <Pills options={["Urbano", "Vitivinicolo"] as const} value={ctx} onChange={setCtx} className="ml-auto" />
        <button onClick={exportReport} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"><Download className="size-4" />Esporta report</button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {idx.map(([k, v]) => (
          <Card key={k as string} className="flex items-center gap-4 lift"><Ring value={v as number} size={100} stroke={10} color={levelColor(v as number)}><span className="font-display text-2xl font-semibold">{v}</span></Ring><div><div className="font-semibold">{k}</div><StatusBadge level={lv(v as number)} /></div></Card>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card><div className="mb-2 text-sm font-semibold">Bilancio idrico territoriale (m³)</div>
          <ResponsiveContainer width="100%" height={240}><BarChart data={water}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" /><XAxis dataKey="m" fontSize={11} /><YAxis fontSize={11} /><Tooltip {...tip} /><Legend /><Bar dataKey="domanda" name="Domanda" fill="var(--warn)" radius={[8, 8, 0, 0]} /><Bar dataKey="disponibile" name="Disponibile" fill="var(--water)" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer>
        </Card>
        <Card><div className="text-sm font-semibold">Scala di rischio a 3 livelli</div>
          <div className="mt-3 space-y-2">{[["basso", "0–34", "Monitoraggio ordinario"], ["moderato", "35–64", "Pianificare intervento"], ["elevato", "65–100", "Azione prioritaria"]].map(([l, r, d]) => <div key={l} className="flex items-center justify-between rounded-xl bg-muted p-3 text-sm"><StatusBadge level={l as string} /><span className="text-muted-foreground">{r}</span><span className="font-medium">{d}</span></div>)}</div>
        </Card>
      </div>
    </div>
  );
}

function Dashboard() {
  const [t, setT] = useState<"Urbana" | "Vitivinicola" | "Esecutivo">("Urbana");
  return (
    <div>
      <SectionTitle eyebrow="Monitoraggio" title="Dashboard operative" desc="Indicatori di salute climatica con dati dimostrativi." />
      <Pills options={["Urbana", "Vitivinicola", "Esecutivo"] as const} value={t} onChange={setT} className="mb-6" />
      <div key={t} className="animate-in fade-in slide-in-from-bottom-2 duration-300">{t === "Urbana" ? <UrbanDash /> : t === "Vitivinicola" ? <VineDash /> : <Exec />}</div>
    </div>
  );
}
