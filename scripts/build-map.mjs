// Builds src/data/philippines-map.json: simplified SVG outlines of the four island groups
// (Luzon, Visayas, Mindanao, Palawan) plus the projection constants used to place guide pins.
//
// Source: Natural Earth 1:10m admin-1 states/provinces (public domain), downloaded once into
// .map-cache/ (git-ignored). Run with `npm run map`; the output JSON is committed, so normal
// builds never touch the network.
import fs from "node:fs";
import path from "node:path";
import mapshaper from "mapshaper";

const SRC_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson";
const CACHE = ".map-cache/admin1.geojson";
const OUT = "src/data/philippines-map.json";
const WIDTH = 600; // viewBox width; height follows the country's shape
const PAD = 12;

const MINDANAO = ["ARMM", "Davao", "Zamboanga", "Dinagat", "Northern Mindanao", "SOCCSKSARGEN"];
const VISAYAS = ["Western Visayas", "Central Visayas", "Eastern Visayas"];

function groupOf(p) {
  if (p.name === "Palawan" || p.name === "Puerto Princesa") return "palawan";
  const r = p.region ?? "";
  if (MINDANAO.some((k) => r.includes(k))) return "mindanao";
  if (VISAYAS.some((k) => r.includes(k))) return "visayas";
  return "luzon"; // NCR, CAR, Regions I–V and the rest of MIMAROPA
}

if (!fs.existsSync(CACHE)) {
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  console.log("Downloading Natural Earth admin-1…");
  const res = await fetch(SRC_URL);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  fs.writeFileSync(CACHE, Buffer.from(await res.arrayBuffer()));
}

const all = JSON.parse(fs.readFileSync(CACHE, "utf8"));
const features = all.features
  .filter((f) => f.properties.adm0_a3 === "PHL")
  .map((f) => ({ type: "Feature", properties: { group: groupOf(f.properties) }, geometry: f.geometry }));

// Dissolve provinces into island groups, simplify, and drop specks (keeps Batanes, Camiguin, etc.).
const input = { "in.json": { type: "FeatureCollection", features } };
const out = await mapshaper.applyCommands(
  "-i in.json -dissolve group -filter-islands min-area=15km2 -simplify interval=1200 keep-shapes -clip bbox=116.8,4.4,127,21.4 -o out.json format=geojson",
  input,
);
const groups = JSON.parse(out["out.json"]).features;

// Equirectangular projection corrected for the latitude of the middle of the country.
const COS = Math.cos((12 * Math.PI) / 180);
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
const eachPoint = (geom, fn) => {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  for (const poly of polys) for (const ring of poly) for (const pt of ring) fn(pt);
};
for (const g of groups) eachPoint(g.geometry, ([lng, lat]) => {
  minX = Math.min(minX, lng * COS); maxX = Math.max(maxX, lng * COS);
  minY = Math.min(minY, -lat); maxY = Math.max(maxY, -lat);
});
const scale = (WIDTH - PAD * 2) / (maxX - minX);
const height = Math.ceil((maxY - minY) * scale + PAD * 2);
const project = { lng0: minX / COS, lat0: -minY, kx: scale * COS, ky: scale, pad: PAD };
const px = ([lng, lat]) => [
  +(PAD + (lng - project.lng0) * project.kx).toFixed(1),
  +(PAD + (project.lat0 - lat) * project.ky).toFixed(1),
];

const result = { viewBox: [0, 0, WIDTH, height], project, groups: {}, bbox: {} };
for (const g of groups) {
  const key = g.properties.group;
  let d = "";
  let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
  const polys = g.geometry.type === "Polygon" ? [g.geometry.coordinates] : g.geometry.coordinates;
  for (const poly of polys) {
    for (const ring of poly) {
      const pts = ring.map(px);
      for (const [x, y] of pts) { bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x); by1 = Math.max(by1, y); }
      d += "M" + pts.map(([x, y]) => `${x} ${y}`).join("L") + "Z";
    }
  }
  result.groups[key] = d;
  result.bbox[key] = [bx0, by0, bx1, by1].map((n) => +n.toFixed(1));
}

fs.writeFileSync(OUT, JSON.stringify(result));
console.log(`Wrote ${OUT}: ${(fs.statSync(OUT).size / 1024).toFixed(1)} KB, viewBox ${result.viewBox.join(" ")}`);
