export const bg = (h) => `linear-gradient(160deg, hsl(${h} 55% 38%), hsl(${(h + 40) % 360} 45% 14%))`;
export const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Loads every image inside src/poster-cards
const files = import.meta.glob("./poster-cards/*.jpg", { eager: true, query: "?url", import: "default" });
const IMAGES = {};
for (const [path, url] of Object.entries(files)) {
  IMAGES[path.split("/").pop().replace(".jpg", "")] = url;
}

export const TmdbCheck = () => null; // keeps App.jsx working without changes

export function Poster({ m }) {
  const src = IMAGES[slug(m.title)]; // example: "RRR" -> rrr
  return (
    <div className="poster" style={{ background: bg(m.hue) }}>
      {src
        ? <img src={src} alt={`${m.title} poster`} loading="lazy" />
        : (<><span className="poster-year">{m.year}</span><h3>{m.title}</h3></>)}
    </div>
  );
}