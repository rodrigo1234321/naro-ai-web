import fs from "node:fs";

const ROOT = "C:\\Users\\rodri\\Desktop\\AI\\Projects\\mdp-negocios-web";
const draft = JSON.parse(fs.readFileSync(`${ROOT}\\research\\brief-maestro-draft.json`, "utf8"));
const matrix = JSON.parse(fs.readFileSync(`${ROOT}\\research\\design-diversity-matrix.json`, "utf8"));

const bySlug = new Map(matrix.groups.flatMap((g) => g.clients.map((c) => [c.slug, { ...c, rubro: g.rubro }])));

function canonicalWa(slug) {
  const c = draft.clients.find((x) => x.slug === slug);
  if (!c) return "";
  const wa = c.phones.find((p) => /^5492\d{7,}$/.test(p));
  if (wa) return wa;
  const digits = (c.phones.find((p) => p.startsWith("5492")) || "").replace(/\D/g, "");
  if (digits.length >= 11) return digits;
  const fallback = c.phones.find((p) => /^\d{6,}$/.test(p) && !p.startsWith("54"));
  return fallback || "";
}

const out = [];
for (const c of draft.clients) {
  const dir = bySlug.get(c.slug);
  const name = c.schemaName || (c.title ? c.title.split("—")[0].split("|")[0].trim() : c.slug);
  const wa = canonicalWa(c.slug);
  out.push({
    slug: c.slug,
    name,
    rubro: dir?.rubro || "sin-clasificar",
    direction: dir?.direction || "PENDIENTE_ASIGNAR",
    detail: dir?.detail || "",
    status: "pending",
    wa,
    wa_url: wa ? `https://wa.me/${wa}` : "",
    address: c.schemaAddr || null,
    geo: c.geo || null,
    tagline: c.h1s[0] || c.title || "",
    sections: c.h2s || [],
    description: c.desc || "",
    hasAssetsFolder: c.hasAssetsFolder,
    base_source: dir?.direction?.startsWith("ELEVAR_BASE") ? "elevar-existente" : "generar-opendesign",
    source_file: c.source,
  });
}

const manifest = {
  generated_at: new Date().toISOString(),
  total: out.length,
  base_url: "https://mis-clientes-html.pages.dev",
  pipeline: {
    generar: out.filter((x) => x.base_source === "generar-opendesign").length,
    elevar: out.filter((x) => x.base_source === "elevar-existente").length,
  },
  clients: out,
};

fs.writeFileSync(`${ROOT}\\research\\brief-maestro.json`, JSON.stringify(manifest, null, 2), "utf8");
console.log(`brief-maestro.json generado: ${out.length} clientes (${manifest.pipeline.generar} generar / ${manifest.pipeline.elevar} elevar)`);
console.log("Sin WhatsApp:", out.filter((x) => !x.wa).map((x) => x.slug).join(", "));
console.log("Sin dirección:", out.filter((x) => !x.address).map((x) => x.slug).join(", "));
