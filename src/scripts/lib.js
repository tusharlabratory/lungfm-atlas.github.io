// Shared helpers for the interactive pages. Colors follow the papers (University of Arizona palette).
export const BLUES = ["#5FB0DA", "#3D92C8", "#106AB1", "#1E5288", "#0C234B"]; // higher, light -> dark
export const REDS = ["#E08996", "#D45E70", "#C62840", "#AB0520", "#850000"];  // lower, light -> dark
export const NEUTRAL = "#D8DDE2";
export const EDGES = [0.02, 0.05, 0.1, 0.2, 0.3];                              // as Paper 1 Figure 4

export function divColor(d) {
  if (d == null || Number.isNaN(d)) return null;
  const a = Math.abs(d);
  if (a < EDGES[0]) return NEUTRAL;
  const k = EDGES.filter((e) => a >= e).length - 1;
  return (d > 0 ? BLUES : REDS)[k];
}

// sequential scale for AUC (white -> Cloud -> Rain -> Arroyo -> Arizona Blue)
const SEQ = [[255, 255, 255], [229, 239, 247], [129, 206, 235], [16, 106, 177], [12, 35, 75]];
export function seqColor(v, lo = 0.45, hi = 0.9) {
  if (v == null || Number.isNaN(v)) return null;
  let t = Math.max(0, Math.min(1, (v - lo) / (hi - lo))) * (SEQ.length - 1);
  const i = Math.min(SEQ.length - 2, Math.floor(t));
  t -= i;
  const c = SEQ[i].map((x, k) => Math.round(x + (SEQ[i + 1][k] - x) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export function inkFor(bg) {
  if (!bg) return "#1a1a1a";
  let r, g, b;
  if (bg.startsWith("#")) [r, g, b] = [1, 3, 5].map((i) => parseInt(bg.slice(i, i + 2), 16));
  else [r, g, b] = bg.match(/\d+/g).map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140 ? "#fff" : "#1a1a1a";
}

const minus = (s) => s.replace(/-/g, "−");
// values are stored with four decimals and rounded once here (no double rounding)
export const f2 = (x) => (x == null ? "NA" : minus(x.toFixed(2)));
export const f3s = (x) => (x == null ? "NA" : (x > 0 ? "+" : "") + minus(x.toFixed(3)));
export const ci2 = (a) => (a && a[0] != null ? `${f2(a[0])} (${f2(a[1])}, ${f2(a[2])})` : "NA");
export const ci3 = (a) => (a && a[0] != null ? `${f3s(a[0])} (${minus(a[1].toFixed(3))}, ${minus(a[2].toFixed(3))})` : "NA");

export const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
export async function getJSON(path) {
  const r = await fetch(`${BASE}/data/${path}`);
  if (!r.ok) throw new Error(`could not load ${path}`);
  return r.json();
}

export function tooltip() {
  const el = document.getElementById("tip");
  return {
    show(html, ev) {
      el.innerHTML = html;
      el.style.display = "block";
      const x = Math.min(window.innerWidth - el.offsetWidth - 12, ev.clientX + 14);
      const y = Math.min(window.innerHeight - el.offsetHeight - 12, ev.clientY + 14);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    },
    hide() { el.style.display = "none"; },
  };
}

export const GROUPS = ["Screening malignancy", "Radiologist suspicion", "Pathology malignancy",
  "Stage, subtype, mutation, survival"];

// short task names used in graphs and figures
export const SHORT = { "Malignancy (screening)": "malignancy", "Radiologist suspicion label": "suspicion",
  "Malignancy (pathology cohort)": "malignancy", "T3–4 vs T1–2 (T stage)": "T stage", "N+ vs N0 (N stage)": "N stage",
  "Squamous vs adenocarcinoma": "squamous", "EGFR mutation": "EGFR", "KRAS mutation": "KRAS", "Overall survival": "survival" };
export const taskLabel = (t) => `${t.cohort} ${SHORT[t.task] ?? t.task}`;
// encoder family colors (University of Arizona palette)
export const FAMILY_COLOR = { "3D CT encoders": "#1E5288", "2D medical and natural-image encoders": "#81CEEB", "Lung cancer–trained encoders": "#AB0520" };
export const COMPARATORS = ["Diameter", "Diameter-only logistic model", "Brock model", "Radiomics", "Random-weight encoder"];
// cohorts named in a model's overlap text: [{cohort, kind: "excluded" | "plausible"}]
export function parseOverlap(text, cohortNames) {
  const out = [];
  for (const m of (text || "").matchAll(/([^()]+?)\s*\(([^)]*)\)/g)) {
    const kind = /plausible/.test(m[2]) ? "plausible" : /excluded/.test(m[2]) ? "excluded" : null;
    if (!kind) continue;
    for (const n of m[1].replace(/^;\s*/, "").split(",").map((x) => x.trim())) if (cohortNames.includes(n)) out.push({ cohort: n, kind });
  }
  return out;
}
