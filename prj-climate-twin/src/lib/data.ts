export const phases = [
  { n: "01", t: "Empatia", d: "Interviste, territorio, pratiche e criticità.", p: 100 },
  { n: "02", t: "Definizione", d: "Bisogni, utenti e problema decisionale.", p: 100 },
  { n: "03", t: "Ideazione", d: "Alternative, benchmark e concept.", p: 80 },
  { n: "04", t: "Prototipo", d: "Una dimostrazione limitata e testabile.", p: 45 },
  { n: "05", t: "Test", d: "Confronto con utenti e misure reali.", p: 10 },
];

export const hmw =
  "Come potremmo aiutare tecnici e gestori a diagnosticare lo stress microclimatico locale e confrontare, con stime trasparenti, l’efficacia di differenti interventi prima di realizzarli?";

export const insights = [
  { t: "I dati sono frammentati", d: "Radar, satelliti, centraline, sensori e mappe operano spesso in ecosistemi separati." },
  { t: "Il dato non è una decisione", d: "Il tecnico deve trasformare indicatori e previsioni in priorità operative comprensibili." },
  { t: "Serve una scala locale", d: "Le mappe generali individuano il rischio; lo spazio circoscritto richiede dati e geometrie specifiche." },
  { t: "Confrontare, non promettere", d: "Le simulazioni devono mostrare stime, intervalli e compromessi, non certezze assolute." },
  { t: "La semplicità è decisiva", d: "Piccoli Comuni e aziende agricole hanno bisogno dell’informazione utile, non della complessità tecnica." },
  { t: "Urbano e agricolo condividono il motore", d: "Dati, modello, scenario e DSS possono alimentare applicazioni diverse." },
];

export type Tag = "Calore" | "Digital Twin" | "Verde e acqua" | "Italia";
export const cases: { city: string; country: string; project: string; claim: string; tags: Tag[] }[] = [
  { city: "Bilbao", country: "Spagna", project: "Plan de Calor 2026–2035", claim: "Rifugi climatici, WBGT e interventi localizzati.", tags: ["Calore", "Verde e acqua"] },
  { city: "Siviglia", country: "Spagna", project: "CartujaQanat", claim: "Ombra, acqua e bioclimatica come infrastruttura pubblica.", tags: ["Calore", "Verde e acqua"] },
  { city: "Lisbona", country: "Portogallo", project: "Green Capital", claim: "Verde, corridoi ecologici e drenaggio urbano integrato.", tags: ["Verde e acqua"] },
  { city: "Barcellona", country: "Spagna", project: "Rifugi climatici", claim: "Misurare copertura, accessibilità e uso reale degli spazi.", tags: ["Calore"] },
  { city: "Parigi", country: "Francia", project: "OASIS e cool islands", claim: "Scuole e spazi pubblici diventano nodi di prossimità.", tags: ["Calore", "Verde e acqua"] },
  { city: "Padova", country: "Italia", project: "3D City Digital Twin", claim: "Sensori microclimatici e scenari con soluzioni verdi e blu.", tags: ["Digital Twin", "Italia"] },
  { city: "Bologna", country: "Italia", project: "TALEA", claim: "Dati climatici, sociali e ambientali in strumenti replicabili.", tags: ["Digital Twin", "Italia", "Verde e acqua"] },
  { city: "Campobasso", country: "Italia", project: "Metacity e forestazione", claim: "Gemello digitale, partecipazione e 1.000 alberi nella periferia est.", tags: ["Digital Twin", "Italia", "Verde e acqua"] },
  { city: "Termoli", country: "Italia", project: "Monitoraggio arboreo", claim: "Passare dalla manutenzione reattiva alla prevenzione.", tags: ["Italia", "Verde e acqua"] },
  { city: "Singapore", country: "Singapore", project: "Digital Urban Climate Twin", claim: "Integrare modelli urbani e microclimatici per scenari what-if.", tags: ["Digital Twin", "Calore"] },
];

export type Kind = "diretta" | "pubblica" | "scientifica";
export const interviews: { name: string; role: string; kind: Kind; meta: string; quote: string; insight: string; img?: string }[] = [
  { name: "Giacomo Picone", role: "Agronomo e tecnico forestale", kind: "diretta", meta: "Intervista diretta · 18/09/2026", img: "https://manocchio91.github.io/digitaltwin.github.io/assets/giacomo-picone.jpeg", quote: "Temperature più elevate e piogge irregolari anticipano la maturazione e rendono più fragile la programmazione agricola.", insight: "Parametri chiave: temperatura, umidità, pioggia e stato fenologico. I piccoli agricoltori dipendono spesso dai consulenti." },
  { name: "Artemio Compagnucci", role: "Cantina Valleprima · Montespertoli", kind: "diretta", meta: "Intervista diretta", quote: "Temperatura, umidità e vento, insieme alle trappole per i parassiti, sono già sufficienti per molte decisioni operative.", insight: "La raccolta anticipata può allineare gli zuccheri ma non la maturità fenolica, spostando il problema in cantina." },
  { name: "Cantina Catabbo", role: "Azienda vitivinicola · San Martino in Pensilis", kind: "diretta", meta: "Testimonianza territoriale", quote: "Su circa 52 ettari non sono ancora presenti sistemi di rilevazione, ma l’azienda intende introdurli.", insight: "Esiste un bisogno concreto di strumenti accessibili anche in aziende strutturate ma non ancora digitalizzate." },
  { name: "Tecnico comunale", role: "Ufficio verde pubblico · Molise", kind: "diretta", meta: "Colloquio esplorativo", quote: "Sappiamo dove fa caldo, ma non abbiamo un modo semplice per confrontare cosa conviene fare prima.", insight: "Il bisogno è confrontare interventi alternativi, non solo mappare il rischio." },
  { name: "CLIMol · Regione Molise", role: "Piattaforma climatica regionale", kind: "pubblica", meta: "Sintesi di documentazione pubblica", quote: "Le proiezioni indicano un aumento dei giorni caldi e una maggiore variabilità delle precipitazioni sul territorio regionale.", insight: "Il dato regionale va tradotto in scala locale per diventare utile a piazze e vigneti." },
  { name: "Plan de Calor Bilbao", role: "Ayuntamiento de Bilbao · TECNALIA", kind: "pubblica", meta: "Sintesi di documentazione pubblica", quote: "Il WBGT diventa l’indicatore di riferimento per attivare rifugi e misure localizzate.", insight: "Un indice di comfort chiaro rende le soglie di allerta comunicabili." },
  { name: "Comune di Campobasso", role: "Progetto Metacity", kind: "pubblica", meta: "Dichiarazione pubblica", quote: "Il gemello digitale serve a coinvolgere i cittadini nella scelta di dove piantare i 1.000 alberi.", insight: "La simulazione è anche uno strumento di partecipazione." },
  { name: "Protezione Civile", role: "Sistema nazionale ondate di calore", kind: "pubblica", meta: "Sintesi di documentazione pubblica", quote: "I bollettini a tre livelli guidano le azioni di prevenzione nelle città.", insight: "La normalizzazione a 3 livelli è già familiare agli operatori." },
  { name: "Cooling Singapore 2.0", role: "Singapore-ETH Centre", kind: "scientifica", meta: "Evidenza scientifica", quote: "Accoppiare modelli urbani e microclimatici permette di testare scenari what-if prima della costruzione.", insight: "Il Digital Twin è efficace quando confronta alternative." },
  { name: "Studi CWSI", role: "Crop Water Stress Index · letteratura", kind: "scientifica", meta: "Evidenza scientifica", quote: "Il CWSI derivato dalla temperatura della chioma anticipa lo stress idrico rispetto ai sintomi visivi.", insight: "Un indice 0–1 è adatto a guidare l’irrigazione di soccorso." },
  { name: "Sentinel-2 in viticoltura", role: "Telerilevamento · letteratura", kind: "scientifica", meta: "Evidenza scientifica", quote: "Gli indici vegetazionali a 10 m consentono di zonare il vigneto per vigore e stress.", insight: "La mappa parcella è realizzabile con dati aperti." },
  { name: "ViñAI / IoT-DSS", role: "Sistemi di supporto decisionale", kind: "scientifica", meta: "Evidenza scientifica", quote: "Sensori a basso costo e modelli semplici migliorano le decisioni se l’output è comprensibile.", insight: "La semplicità dell’interfaccia conta quanto l’accuratezza." },
  { name: "Agrivoltaico e vigneto adattivo", role: "Studi sperimentali", kind: "scientifica", meta: "Evidenza scientifica", quote: "L’ombreggiamento parziale riduce la temperatura dei grappoli e ritarda la maturazione zuccherina.", insight: "Le misure di ombra valgono sia in città sia in vigna." },
];

export const sources = [
  { t: "Rischio e protezione civile", items: ["CLIMAAX Toolbox", "CLIMol", "Dewetra", "Radar-DPC", "RISICO", "PROPAGATOR", "Copernicus EMS", "EFAS", "EFFIS", "European Drought Observatory", "Risk Data Hub", "IdroGEO", "Sistema nazionale ondate di calore", "IT-alert"] },
  { t: "Clima urbano", items: ["Plan de Calor Bilbao e TECNALIA", "Siviglia CartujaQanat", "Lisboa Capital Verde", "TALEA Bologna", "Digital Twin Padova", "Cooling Singapore 2.0", "Rifugi climatici Barcellona", "Rifugi climatici Parigi"] },
  { t: "Agricoltura", items: ["Crop Water Stress Index", "Sentinel-2", "Digital Twin per irrigazione", "ViñAI", "IoT-DSS", "Agrivoltaico", "Gestione adattiva del vigneto"] },
];

export const flows = {
  urban: {
    name: "Flusso Urbano",
    modules: [
      { t: "Isole di calore", d: "Diagnosi della superficie critica e WBGT locale." },
      { t: "Rifugi climatici", d: "Accessibilità a 5/10 minuti e copertura della popolazione." },
      { t: "Verde e depaving", d: "Alberi, suolo permeabile e ombreggiamento." },
    ],
  },
  vine: {
    name: "Flusso Vitivinicolo",
    modules: [
      { t: "Vigneto adattivo", d: "Zonazione della parcella e priorità per zona." },
      { t: "Stress idro-termico fenologico", d: "Indice di stress pesato per fase della vite." },
      { t: "Cantine e gestione idrica", d: "Irrigazione di soccorso e maturità fenolica." },
    ],
  },
};

// ---- Models (dimostrativi) ----
export type UrbanInput = { trees: number; depave: number; shade: number; albedo: number; mist: boolean };
export function urbanModel(i: UrbanInput) {
  const raw = i.trees * 0.03 + i.depave * 0.018 + i.shade * 0.022 + (i.albedo - 0.2) * 1.5 + (i.mist ? 0.6 : 0);
  const dT = Math.min(5.2, raw);
  const spread = 0.25 + dT * 0.18;
  const reliability = Math.round(Math.max(30, 78 - dT * 6 - (i.mist ? 4 : 0)));
  const water = i.mist ? "alto" : i.trees > 30 ? "medio" : "basso";
  const maint = i.trees + i.shade > 60 ? "alta" : i.trees + i.shade > 25 ? "media" : "bassa";
  const time = i.depave > 35 || i.trees > 40 ? "lungo" : i.depave > 10 || i.trees > 10 ? "medio" : "breve";
  return { dT, lo: Math.max(0, dT - spread), hi: dT + spread, reliability, water, maint, time };
}

export const phenoPhases = ["Germogliamento", "Fioritura", "Invaiatura", "Maturazione"] as const;
export type Pheno = (typeof phenoPhases)[number];
export type VineInput = { moisture: number; temp: number; wind: number; phase: Pheno; rain: boolean };
const phaseW: Record<Pheno, number> = { Germogliamento: 0.7, Fioritura: 1.15, Invaiatura: 1.2, Maturazione: 1.0 };
export function vineModel(i: VineInput) {
  const base = Math.max(0, 35 - i.moisture) * 1.6 + Math.max(0, i.temp - 24) * 3 + i.wind * 0.55;
  const s = Math.round(Math.max(0, Math.min(100, base * phaseW[i.phase] - (i.rain ? 15 : 0))));
  const risk = s < 35 ? "basso" : s < 65 ? "moderato" : "elevato";
  const priority =
    risk === "elevato"
      ? i.moisture < 25 ? "Irrigazione di soccorso nelle zone critiche entro 24 h" : "Riduzione carico termico: ombreggiamento e gestione chioma"
      : risk === "moderato" ? "Monitorare sonde 20/50 cm e ripianificare in 48 h" : "Nessuna azione urgente, proseguire monitoraggio";
  return { s, risk, priority };
}

// deterministic pseudo-noise
export function noise(x: number, y = 0) {
  const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return v - Math.floor(v);
}
