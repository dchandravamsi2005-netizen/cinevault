import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { movies } from "./data";
import { Poster, TmdbCheck, bg } from "./poster.jsx";

const genres = ["All", ...[...new Set(movies.map((m) => m.genre))].sort()];
const cr = (n) => `₹${n.toLocaleString("en-IN")} Cr`;
const PAGE = 24;

function Card({ m, onOpen }) {
  return (
    <motion.button layout className="card" onClick={() => onOpen(m)}
      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
      whileHover={{ y: -8 }} whileTap={{ scale: 0.97 }}>
      <Poster m={m} />
      <div className="card-info"><span>{m.genre}</span><span className="rate">★ {m.rating.toFixed(1)}</span></div>
    </motion.button>
  );
}

function Money({ m }) {
  if (!m.budget || !m.gross) return <p className="muted">Budget and box office are not listed for this film yet.</p>;
  const max = Math.max(m.budget, m.gross);
  return (
    <div className="money">
      {[["Budget", m.budget, "var(--red)"], ["Box office", m.gross, "var(--amber)"]].map(([l, v, c]) => (
        <div key={l} className="bar-row"><span>{l}</span>
          <div className="bar-track"><motion.div className="bar" style={{ background: c }} initial={{ width: 0 }} animate={{ width: `${(v / max) * 100}%` }} transition={{ duration: 0.9 }} /></div>
          <b>{cr(v)}</b></div>
      ))}
      <p className="muted">Rounded, widely reported figures.</p>
    </div>
  );
}

function ReviewForm({ onAdd }) {
  const [user, setUser] = useState(""); const [score, setScore] = useState(8); const [text, setText] = useState("");
  const post = () => { if (!text.trim()) return; onAdd({ user: user.trim() || "guest", score, text: text.trim() }); setText(""); };
  return (
    <div className="rform">
      <input aria-label="Your name" placeholder="Your name" value={user} onChange={(e) => setUser(e.target.value)} />
      <select aria-label="Score" value={score} onChange={(e) => setScore(+e.target.value)}>
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((s) => <option key={s} value={s}>{s}/10</option>)}</select>
      <textarea aria-label="Review" placeholder="Write your review" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="chip on" onClick={post}>Post review</button>
    </div>
  );
}

function Modal({ m, reviews, onAdd, onClose, onPick }) {
  const [tab, setTab] = useState("Overview");
  const crew = [{ name: m.director, job: "Director" }, { name: m.music, job: "Music" }];
  const similar = useMemo(() => movies.filter((x) => x.id !== m.id).map((x) => ({
    x, s: (x.genre === m.genre) + 2 * (x.director === m.director) + 2 * x.cast.filter((c) => m.cast.includes(c)).length,
  })).sort((a, b) => b.s - a.s || b.x.rating - a.x.rating).slice(0, 4).map((o) => o.x), [m]);
  useEffect(() => { setTab("Overview"); }, [m.id]);
  useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  return (
    <motion.div className="backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal" role="dialog" aria-label={m.title} onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ type: "spring", damping: 24, stiffness: 220 }}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-head" style={{ background: bg(m.hue) }}>
          <h2>{m.title}</h2>
          <p className="meta">{m.year}, {m.genre}, approx. rating ★ {m.rating.toFixed(1)}</p>
        </div>
        <div className="modal-head" style={{ background: bg(m.hue) }}>
         <Poster m={m} big />
         <div>
           <h2>{m.title}</h2>
          <p className="meta">{m.year}, {m.genre}, approx. rating ★ {m.rating.toFixed(1)}</p>
         </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} className="tab-body" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
            {tab === "Overview" && (<><p>A {m.genre.toLowerCase()} film directed by {m.director}, with music by {m.music}.</p><Money m={m} />
              <h4>You might also like</h4>
              <div className="chips">{similar.map((s) => <button key={s.id} className="chip" onClick={() => onPick(s)}>{s.title}</button>)}</div></>)}
            {tab === "Cast" && <ul className="people">{m.cast.map((c) => <li key={c}><b>{c}</b></li>)}</ul>}
            {tab === "Crew" && <ul className="people">{crew.map((c) => <li key={c.job}><b>{c.name}</b><span>{c.job}</span></li>)}</ul>}
            {tab === "Reviews" && (<>
              {!reviews.length && <p className="muted">No reviews yet. Be the first to post one.</p>}
              {reviews.map((r, i) => <blockquote key={i}><b>{r.user}</b> <span className="rate">★ {r.score}/10</span><p>{r.text}</p></blockquote>)}
              <ReviewForm onAdd={onAdd} /></>)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [genre, setGenre] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("rating");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const [reviews, setReviews] = useState({});

  const list = useMemo(() => {
    const s = q.toLowerCase();
    return movies
      .filter((m) => (genre === "All" || m.genre === genre) &&
        [m.title, m.director, ...m.cast].some((v) => v.toLowerCase().includes(s)))
      .sort((a, b) => sort === "rating" ? b.rating - a.rating : sort === "gross" ? (b.gross ?? -1) - (a.gross ?? -1) : sort === "new" ? b.year - a.year : a.year - b.year);
  }, [genre, q, sort]);
  useEffect(() => setShown(PAGE), [genre, q, sort]);
  const top = movies.filter((m) => m.gross).sort((a, b) => b.gross - a.gross).slice(0, 6);

  return (
    <>
      <header className="nav"><b className="logo">CineVault Telugu</b>
        <input aria-label="Search" placeholder="Search title, actor or director" value={q} onChange={(e) => setQ(e.target.value)} /></header>
      <TmdbCheck />
      <section className="hero">
        <motion.div className="beam" animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>{movies.length} Telugu films, from Mayabazar to Pushpa 2.</motion.h1>
        <p>Browse by genre, check ratings and collections, see the cast and crew, and post your own review.</p>
        <div className="strip"><motion.div className="strip-inner" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
          {[...movies.slice(0, 30), ...movies.slice(0, 30)].map((m, i) => <div key={i} className="frame" style={{ background: bg(m.hue) }}>{m.title}</div>)}
        </motion.div></div>
      </section>

      <main>
        <section>
          <div className="row-head"><h2>Browse ({list.length})</h2>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="rating">Top rated</option><option value="gross">Biggest box office</option><option value="new">Newest first</option><option value="old">Oldest first</option></select></div>
          <div className="chips">{genres.map((g) => <button key={g} className={`chip ${g === genre ? "on" : ""}`} onClick={() => setGenre(g)}>{g}</button>)}</div>
          <motion.div layout className="grid"><AnimatePresence>{list.slice(0, shown).map((m) => <Card key={m.id} m={m} onOpen={setOpen} />)}</AnimatePresence></motion.div>
          {!list.length && <p className="muted">No films match. Try another title, actor or genre.</p>}
          {shown < list.length && <button className="chip on more" onClick={() => setShown(shown + PAGE)}>Show more</button>}
        </section>
        <section><h2>Highest earning collections</h2>
          <div className="collections">{top.map((m) => <button key={m.id} className="coll" onClick={() => setOpen(m)}><b>{m.title}</b><span>{cr(m.gross)}</span></button>)}</div></section>
      </main>
      <footer className="foot">Movie images and search by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</footer>

      <AnimatePresence>{open && <Modal key="m" m={open} reviews={reviews[open.id] || []} onClose={() => setOpen(null)} onPick={setOpen}
        onAdd={(r) => setReviews((p) => ({ ...p, [open.id]: [r, ...(p[open.id] || [])] }))} />}</AnimatePresence>
    </>
  );
}
