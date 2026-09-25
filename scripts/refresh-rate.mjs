// Refresh the home page rate card data (api/mortgage-rate/index.json) from the rate spreadsheet's Apps Script feed,
// the same source the old Vercel site cached. On any upstream problem the last good value stays in place and the job
// fails, so the page is never emptied and the failure is visible in Actions.
import { readFileSync, writeFileSync } from "node:fs";
const FILE = "api/mortgage-rate/index.json";
const TIMEOUT_MS = 60_000;
const PERCENT = /^[+-]?\d+(\.\d+)?%$/;
const src = process.env.RATE_SOURCE_URL;
if (!src) { console.error("RATE_SOURCE_URL secret is not set"); process.exit(1); }
const res = await fetch(src, { redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS) });
if (!res.ok) { console.error(`rate feed returned ${res.status}; keeping the last good value`); process.exit(1); }
const data = await res.json();
if (!data || !PERCENT.test(String(data.rate))) { console.error("rate feed returned no valid rate; keeping the last good value"); process.exit(1); }
for (const k of ["rateChange1Day", "rateChange1Year"]) if (data[k] != null && !PERCENT.test(String(data[k]))) { console.error(`invalid ${k}; keeping the last good value`); process.exit(1); }
const next = { rate: data.rate, rateChange1Day: data.rateChange1Day, rateChange1Year: data.rateChange1Year, asOf: data.asOf, stale: !!data.stale };
let prev = {}; try { prev = JSON.parse(readFileSync(FILE, "utf8")); } catch {}
const same = ["rate", "rateChange1Day", "rateChange1Year", "asOf", "stale"].every(k => prev[k] === next[k]);
if (same) { console.log(`unchanged: ${next.rate} as of ${next.asOf}`); process.exit(0); }
writeFileSync(FILE, JSON.stringify({ ...next, updatedAt: new Date().toISOString() }));
console.log(`updated: ${prev.rate || "none"} -> ${next.rate} as of ${next.asOf}`);
