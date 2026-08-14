import fs from "node:fs";
import path from "node:path";

const RAW = "C:\\Users\\rodri\\Desktop\\AI\\Projects\\mdp-negocios-web\\raw_html";
const OUT = "C:\\Users\\rodri\\Desktop\\AI\\Projects\\mdp-negocios-web\\research\\brief-maestro-draft.json";

const files = fs.readdirSync(RAW).filter((f) => f.endsWith(".html"));

function clean(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function extract(html) {
  const title = clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const desc = clean(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]) || clean(html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1]);
  const robots = clean(html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => clean(m[1].replace(/<[^>]+>/g, ""))).filter(Boolean).slice(0, 3);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => clean(m[1].replace(/<[^>]+>/g, ""))).filter(Boolean).slice(0, 12);
  const waMatches = [...html.matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]);
  const telMatches = [...html.matchAll(/tel:(\d+)/g)].map((m) => m[1]);
  const rawPhones = [...html.matchAll(/\+?54\s?9?\s?[\d\s-]{8,14}/g)].map((m) => clean(m[0]));
  const phones = [...new Set([...waMatches, ...telMatches, ...rawPhones])].slice(0, 8);
  const addresses = [...html.matchAll(/(?:Av\.|Calle|Av\.|Bv\.|Ruta|C\.|calle|avenida)[^<"]{3,80}/gi)].map((m) => clean(m[0])).slice(0, 4);
  const schemaName = clean(html.match(/"name":\s*"([^"]+)"/)?.[1]);
  const schemaTel = clean(html.match(/"telephone":\s*"([^"]+)"/)?.[1]);
  const schemaAddr = clean(html.match(/"streetAddress":\s*"([^"]+)"/)?.[1]);
  const schemaHours = clean(html.match(/"openingHours":\s*"([^"]+)"/)?.[1]);
  const geo = clean(html.match(/"latitude":\s*"([^"]+)"/)?.[1] ? `"${html.match(/"latitude":\s*"([^"]+)"/)[1]}","${html.match(/"longitude":\s*"([^"]+)"/)?.[1]}"` : "");
  return { title, desc, robots, h1s, h2s, phones, addresses, schemaName, schemaTel, schemaAddr, schemaHours, geo };
}

const out = [];
for (const f of files) {
  const slug = f.replace(/\.html$/, "");
  const html = fs.readFileSync(path.join(RAW, f), "utf8");
  const data = extract(html);
  const hasAssets = fs.existsSync(path.join(RAW, slug));
  out.push({ slug, source: f, hasAssetsFolder: hasAssets, ...data });
}

fs.writeFileSync(OUT, JSON.stringify({ generated_at: new Date().toISOString(), total: out.length, clients: out }, null, 2), "utf8");
console.log("Extraídos", out.length, "clientes ->", OUT);
