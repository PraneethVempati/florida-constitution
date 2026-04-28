// import { useState, useRef, useEffect, useMemo } from "react";
// import { findVersionForDate, CONSTITUTION_VERSIONS } from "./constitutionTexts";

// // ─────────────────────────────────────────────────────────────────────────────
// // Version data — sourced directly from Constitution Timeline For Website.docx
// // ─────────────────────────────────────────────────────────────────────────────
// const VERSION_DETAILS = [
//   // ── 1969–1979 ──
//   { id: "001", title: "1969 Constitution",                                              startDate: "January 7, 1969",   endDate: "January 4, 1971",   startISO: "1969-01-07", era: "1969–1979" },
//   { id: "002", title: "1971 Constitution (1970 Election)",                              startDate: "January 5, 1971",   endDate: "November 1, 1971",  startISO: "1971-01-05", era: "1969–1979" },
//   { id: "003", title: "1971 Constitution (1970 & 1971 Special Election)",               startDate: "November 2, 1971",  endDate: "March 13, 1972",    startISO: "1971-11-02", era: "1969–1979" },
//   { id: "004", title: "1971 Constitution (1972 Special Election Change)",               startDate: "March 14, 1972",    endDate: "January 1, 1973",   startISO: "1972-03-14", era: "1969–1979" },
//   { id: "005", title: "1973 Constitution (1972 Special & General Election)",            startDate: "January 2, 1973",   endDate: "December 31, 1974", startISO: "1973-01-02", era: "1969–1979" },
//   { id: "006", title: "1973 Constitution (Only January 1 Amendment — HJR 3911)",        startDate: "January 1, 1975",   endDate: "January 4, 1975",   startISO: "1975-01-01", era: "1969–1979" },
//   { id: "007", title: "1975 Constitution (Without July Amendment)",                     startDate: "January 5, 1975",   endDate: "June 30, 1975",     startISO: "1975-01-05", era: "1969–1979" },
//   { id: "008", title: "1975 Constitution (All Amendments Included)",                    startDate: "July 1, 1975",      endDate: "March 8, 1976",     startISO: "1975-07-01", era: "1969–1979" },
//   { id: "009", title: "1977 Constitution (Special Election Only)",                      startDate: "March 9, 1976",     endDate: "January 3, 1977",   startISO: "1976-03-09", era: "1969–1979" },
//   { id: "010", title: "1977 Constitution (All Amendments Included)",                    startDate: "January 4, 1977",   endDate: "March 10, 1980",    startISO: "1977-01-04", era: "1969–1979" },
//   // ── 1980–1990 ──
//   { id: "011", title: "1980 Constitution (March Special Election — First Measure)",     startDate: "March 11, 1980",    endDate: "March 31, 1980",    startISO: "1980-03-11", era: "1980–1990" },
//   { id: "012", title: "1980 Constitution (March Special Election — Second Measure)",    startDate: "April 1, 1980",     endDate: "October 6, 1980",   startISO: "1980-04-01", era: "1980–1990" },
//   { id: "013", title: "1980 Constitution (October Election — Immediately Effective)",   startDate: "October 7, 1980",   endDate: "December 31, 1982", startISO: "1980-10-07", era: "1980–1990" },
// ];

// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// const PRIMARY = "#1B3A6B";
// const GOLD    = "#C4882A";
// const CREAM   = "#F8F6F1";

// // ─────────────────────────────────────────────────────────────────────────────
// // Text grouping — joins word-wrapped lines from the docx into proper paragraphs
// // ─────────────────────────────────────────────────────────────────────────────
// function classifyRawLine(trimmed) {
//   if (!trimmed) return "empty";
//   const letters = trimmed.replace(/[^a-zA-Z]/g, "");
//   const allCaps = letters.length > 0 && letters === letters.toUpperCase();
//   if (allCaps) {
//     if (trimmed === "CONSTITUTION OF THE STATE OF FLORIDA" || trimmed === "PREAMBLE") return "title";
//     if (/^ARTICLE\b/.test(trimmed) || /^SCHEDULE\b/.test(trimmed)) return "article";
//     return "article"; // e.g. "DECLARATION OF RIGHTS", "JUDICIAL DEPARTMENT"
//   }
//   return "body";
// }

// function groupLines(rawLines) {
//   const groups = [];
//   let buf = null;

//   function flush() {
//     if (buf) { groups.push(buf); buf = null; }
//   }

//   for (const raw of rawLines) {
//     const trimmed = raw.trim();
//     if (!trimmed) { flush(); continue; }

//     const kind = classifyRawLine(trimmed);

//     if (kind !== "body") {
//       // Headings always stand alone
//       flush();
//       groups.push({ kind, text: trimmed });
//     } else {
//       // "SECTION X." always starts a fresh paragraph
//       if (/^SECTION\s+\d+/i.test(trimmed)) {
//         flush();
//         buf = { kind: "body", text: trimmed };
//       } else if (!buf) {
//         buf = { kind: "body", text: trimmed };
//       } else {
//         // Join continuation line — add space
//         buf.text += " " + trimmed;
//       }
//     }
//   }
//   flush();
//   return groups;
// }

// // Smart title-case (keeps small words lowercase unless first word)
// function toTitleCase(str) {
//   const small = new Set(["of","and","the","in","or","a","an","for","to","by","with","at"]);
//   return str.toLowerCase().split(" ").map((w, i) =>
//     (!small.has(w) || i === 0) ? w.charAt(0).toUpperCase() + w.slice(1) : w
//   ).join(" ");
// }

// // Build TOC from grouped lines — only top-level structural markers
// function buildToc(groups) {
//   const items = [];
//   for (let i = 0; i < groups.length; i++) {
//     const g = groups[i];
//     if (g.kind === "title" && g.text === "PREAMBLE") {
//       items.push({ idx: i, label: "Preamble" });
//     } else if (g.kind === "article" && /^ARTICLE\s+/i.test(g.text)) {
//       const numPart = g.text.replace(/^ARTICLE\s+/i, "");
//       // Look for subtitle on the very next group
//       const next = groups[i + 1];
//       const hasSub = next && next.kind === "article"
//         && !/^ARTICLE\s+/i.test(next.text)
//         && !/^SCHEDULE\b/i.test(next.text);
//       const label = hasSub
//         ? `Article ${numPart} — ${toTitleCase(next.text)}`
//         : `Article ${numPart}`;
//       items.push({ idx: i, label });
//     } else if (g.kind === "article" && /^SCHEDULE\b/i.test(g.text)) {
//       items.push({ idx: i, label: toTitleCase(g.text) });
//     }
//   }
//   return items;
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Global CSS
// // ─────────────────────────────────────────────────────────────────────────────
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   html, body, #root { width: 100%; min-height: 100vh; background: ${CREAM}; }
//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: ${CREAM}; }
//   ::-webkit-scrollbar-thumb { background: #C9C0AE; border-radius: 3px; }

//   .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; color: rgba(255,255,255,.82); font-weight: 600; padding: 4px 0; transition: color .15s; }
//   .nav-btn:hover, .nav-btn.active { color: ${GOLD}; }
//   .nav-btn.active { border-bottom: 2px solid ${GOLD}; padding-bottom: 2px; }
//   .contact-btn { background: ${PRIMARY}; color: white; border: 1px solid rgba(255,255,255,.25); padding: 7px 18px; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; font-size: .84rem; cursor: pointer; }

//   .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: .86rem; color: #374151; cursor: pointer; background: none; border: none; width: 100%; text-align: left; transition: background .12s; }
//   .sidebar-link:hover { background: #EEE9DF; }
//   .sidebar-link.active { background: #EEF2FF; color: ${PRIMARY}; font-weight: 600; border-left: 3px solid ${PRIMARY}; }

//   .select-input { padding: 9px 11px; border: 1px solid #C9C0AE; border-radius: 5px; font-family: 'Source Sans 3', sans-serif; font-size: .9rem; background: white; outline: none; color: #1a1a2e; }
//   .select-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 3px #1B3A6B18; }

//   .primary-btn { background: ${PRIMARY}; color: white; border: none; padding: 10px 26px; border-radius: 5px; font-family: 'Source Sans 3', sans-serif; font-weight: 700; font-size: .9rem; cursor: pointer; transition: background .15s; }
//   .primary-btn:hover { background: #152e55; }

//   .text-input { padding: 9px 12px; border: 1px solid #C9C0AE; border-radius: 5px; font-family: 'Source Sans 3', sans-serif; font-size: .9rem; background: white; outline: none; color: #1a1a2e; }
//   .text-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 3px #1B3A6B18; }
//   .text-input::placeholder { color: #aaa; }

//   .field-label { font-family: 'Source Sans 3', sans-serif; font-size: .73rem; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; display: block; }

//   .error-box { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 6px; padding: 10px 15px; font-family: 'Source Sans 3', sans-serif; font-size: .85rem; color: #991B1B; margin-top: 12px; }

//   .back-link { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .82rem; color: #6B7280; padding: 0; display: inline-flex; align-items: center; gap: 4px; transition: color .12s; }
//   .back-link:hover { color: ${PRIMARY}; }

//   .toc-btn { display: block; width: 100%; text-align: left; background: none; border: none; border-radius: 4px; padding: 6px 8px; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .78rem; color: #374151; line-height: 1.45; margin-bottom: 2px; transition: background .1s, color .1s; }
//   .toc-btn:hover { background: #EEE9DF; color: ${PRIMARY}; }

//   /* Constitution text styles */
//   .const-title   { font-family: 'Libre Baskerville', serif; font-size: 1rem; font-weight: 700; color: ${PRIMARY}; text-align: center; margin: 28px 0 6px; letter-spacing: .03em; }
//   .const-article { font-family: 'Libre Baskerville', serif; font-size: .97rem; font-weight: 700; color: ${PRIMARY}; margin: 30px 0 4px; letter-spacing: .04em; }
//   .const-body    { font-family: 'Libre Baskerville', serif; font-size: .93rem; line-height: 1.95; color: #1a1a2e; margin-bottom: 10px; }

//   mark { background: #FEF08A; color: inherit; border-radius: 2px; padding: 0 1px; }
//   mark.active-match { background: #F59E0B; outline: 2px solid #D97706; border-radius: 2px; }
// `;

// // ─────────────────────────────────────────────────────────────────────────────
// // Shared Header
// // ─────────────────────────────────────────────────────────────────────────────
// function Header({ onHome }) {
//   return (
//     <header style={{ background: PRIMARY, borderBottom: `3px solid ${GOLD}`, padding: "0 44px" }}>
//       <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
//         <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}>
//           <svg width="26" height="34" viewBox="0 0 60 78" fill="white" opacity="0.9">
//             <path d="M30 2 C13 2 2 17 2 33 C2 51 13 63 21 71 C24 74 27 77 30 79 C33 77 36 74 39 71 C47 63 58 51 58 33 C58 17 47 2 30 2Z"/>
//           </svg>
//           <div>
//             <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.08rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>Florida Constitution</div>
//             <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".58rem", color: "rgba(255,255,255,.45)", letterSpacing: ".13em", textTransform: "uppercase" }}>Historical Archive</div>
//           </div>
//         </button>
//         <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
//           {["Home", "The Constitutions", "Research Guides", "About"].map(n => (
//             <button key={n} className={`nav-btn${n === "Home" ? " active" : ""}`}>{n}</button>
//           ))}
//           <button className="contact-btn">Contact</button>
//         </nav>
//       </div>
//     </header>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Shared Footer
// // ─────────────────────────────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer style={{ borderTop: "1px solid #E5DDD0", padding: "18px 44px", background: "white", marginTop: 60 }}>
//       <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
//         <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".74rem", color: "#9CA3AF" }}>© 2024 Organization Name</span>
//         <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".74rem", color: "#9CA3AF" }}>Privacy Policy &nbsp;|&nbsp; Terms of Use &nbsp;|&nbsp; Site Map</span>
//       </div>
//     </footer>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Root — manages panels
// // ─────────────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [panel, setPanel]           = useState("home");   // "home" | "timeline"
//   const [viewVersion, setViewVersion] = useState(null);

//   function openVersion(id) {
//     const v = CONSTITUTION_VERSIONS.find(c => c.id === id);
//     if (v) setViewVersion(v);
//   }

//   if (viewVersion) {
//     return <ConstitutionView version={viewVersion} onBack={() => setViewVersion(null)} />;
//   }

//   return (
//     <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh" }}>
//       <style>{GLOBAL_CSS}</style>
//       <Header onHome={() => setPanel("home")} />

//       <div style={{ maxWidth: 1300, margin: "0 auto", padding: "36px 44px", display: "grid", gridTemplateColumns: "210px 1fr", gap: 32 }}>
//         {/* ── Sidebar ── */}
//         <aside>
//           <nav style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, overflow: "hidden" }}>
//             <button className={`sidebar-link${panel === "home" ? " active" : ""}`} onClick={() => setPanel("home")}>
//               <span style={{ fontSize: "1rem" }}>☰</span> History of the Constitutions
//             </button>
//             <div style={{ height: 1, background: "#F0EBE1" }} />
//             <button className={`sidebar-link${panel === "timeline" ? " active" : ""}`} onClick={() => setPanel("timeline")}>
//               <span style={{ fontSize: "1rem" }}>⊞</span> Timeline of Amendments
//             </button>
//             <div style={{ height: 1, background: "#F0EBE1" }} />
//             <button className="sidebar-link">
//               <span style={{ fontSize: "1rem" }}>📄</span> Resources
//             </button>
//           </nav>
//         </aside>

//         {/* ── Main panel ── */}
//         <main>
//           {panel === "home"     && <HomePanel onOpenVersion={openVersion} />}
//           {panel === "timeline" && <TimelinePanel onOpenVersion={openVersion} />}
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Home — date picker
// // ─────────────────────────────────────────────────────────────────────────────
// function HomePanel({ onOpenVersion }) {
//   const [month, setMonth] = useState(1);
//   const [day,   setDay]   = useState(7);
//   const [year,  setYear]  = useState(1969);
//   const [error, setError] = useState("");

//   function handleView() {
//     const v = findVersionForDate(year, month, day);
//     if (v) { onOpenVersion(v.id); setError(""); }
//     else setError(`No constitution was in force on ${MONTHS[month - 1]} ${day}, ${year}. Data covers January 7, 1969 – December 31, 1982.`);
//   }

//   return (
//     <div>
//       <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.65rem", fontWeight: 700, color: PRIMARY, marginBottom: 10 }}>
//         Explore the Florida Constitution Through History
//       </h1>
//       <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".95rem", color: "#4B5563", lineHeight: 1.7, marginBottom: 36, maxWidth: 620 }}>
//         Enter any date to view the full text of Florida&apos;s Constitution as it was legally in force on that day.
//         Data covers <strong>January 7, 1969</strong> through <strong>December 31, 1982</strong>.
//       </p>

//       <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "28px 32px", maxWidth: 520, boxShadow: "0 2px 10px rgba(27,58,107,.07)" }}>
//         <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".95rem", fontWeight: 700, color: PRIMARY, marginBottom: 20 }}>Select a date</p>
//         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr", gap: 12, marginBottom: 20 }}>
//           <div>
//             <label className="field-label">Month</label>
//             <select className="select-input" value={month} onChange={e => setMonth(Number(e.target.value))} style={{ width: "100%" }}>
//               {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="field-label">Day</label>
//             <select className="select-input" value={day} onChange={e => setDay(Number(e.target.value))} style={{ width: "100%" }}>
//               {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
//             </select>
//           </div>
//           <div>
//             <label className="field-label">Year</label>
//             <input type="number" className="text-input" value={year} min={1969} max={1982} onChange={e => setYear(Number(e.target.value))} style={{ width: "100%" }} />
//           </div>
//         </div>
//         <button className="primary-btn" onClick={handleView} style={{ width: "100%" }}>
//           View Constitution
//         </button>
//         {error && <div className="error-box">{error}</div>}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Timeline — single continuous ruler 1969 → 1983
// // ─────────────────────────────────────────────────────────────────────────────
// const TL_START = 1969;
// const TL_END   = 1983; // slight padding past last version (Dec 1982)
// const TL_SPAN  = TL_END - TL_START;

// function tlPct(isoDate) {
//   const [y, m, d] = isoDate.split("-").map(Number);
//   const dec = (y - TL_START) + (m - 1) / 12 + (d - 1) / 365;
//   return Math.max(0, Math.min((dec / TL_SPAN) * 100, 100));
// }

// function TimelinePanel({ onOpenVersion }) {
//   const [hovered,   setHovered]   = useState(null);
//   const [showAbout, setShowAbout] = useState(false);

//   // Every integer year label from 1969 to 1983
//   const yearLabels = Array.from({ length: TL_SPAN + 1 }, (_, i) => TL_START + i);

//   return (
//     <div>
//       {/* Heading row */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
//         <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.65rem", fontWeight: 700, color: PRIMARY }}>
//           Constitution Timeline
//         </h1>
//         <button
//           onClick={() => setShowAbout(v => !v)}
//           style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #C9C0AE", borderRadius: 5, padding: "6px 14px", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#374151" }}
//         >
//           <span style={{ color: PRIMARY }}>ⓘ</span> About This Timeline
//         </button>
//       </div>

//       {showAbout && (
//         <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
//           <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: "#1E40AF", lineHeight: 1.75 }}>
//             This timeline shows every version of Florida&apos;s Constitution (1968 revision) that was legally
//             in force from 1969 through 1982. Each vertical mark represents the effective date of a new
//             version. Hover to see dates; click any mark to read the full text.
//           </p>
//         </div>
//       )}

//       {/* ── Single unified timeline card ── */}
//       <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 10, padding: "28px 32px 24px", userSelect: "none" }}>

//         {/* Year labels */}
//         <div style={{ position: "relative", height: 22, marginBottom: 8 }}>
//           {yearLabels.map(yr => (
//             <span
//               key={yr}
//               style={{
//                 position: "absolute",
//                 left: `${((yr - TL_START) / TL_SPAN) * 100}%`,
//                 transform: "translateX(-50%)",
//                 fontFamily: "'Source Sans 3', sans-serif",
//                 fontSize: yr % 5 === 0 ? ".78rem" : ".7rem",
//                 fontWeight: yr % 5 === 0 ? 700 : 500,
//                 color: yr % 5 === 0 ? "#374151" : "#9CA3AF",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {yr}
//             </span>
//           ))}
//         </div>

//         {/* Ruler */}
//         <div style={{ position: "relative", height: 64 }}>
//           {/* Baseline bar */}
//           <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 3, background: "#D1D5DB", transform: "translateY(-50%)", borderRadius: 2 }} />

//           {/* Year boundary ticks */}
//           {yearLabels.map(yr => (
//             <div
//               key={yr}
//               style={{
//                 position: "absolute",
//                 left: `${((yr - TL_START) / TL_SPAN) * 100}%`,
//                 top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: 1,
//                 height: yr % 5 === 0 ? 20 : 12,
//                 background: yr % 5 === 0 ? "#9CA3AF" : "#D1D5DB",
//               }}
//             />
//           ))}

//           {/* Effective-date tick marks — all 13 on one ruler */}
//           {VERSION_DETAILS.map(v => {
//             const p     = tlPct(v.startISO);
//             const isHov = hovered === v.id;
//             return (
//               <div
//                 key={v.id}
//                 style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: isHov ? 10 : 1 }}
//               >
//                 {/* Hover tooltip */}
//                 {isHov && (
//                   <div style={{
//                     position: "absolute",
//                     bottom: "calc(100% + 10px)",
//                     left: "50%",
//                     transform: p > 80 ? "translateX(-93%)" : p < 8 ? "translateX(-7%)" : "translateX(-50%)",
//                     background: PRIMARY,
//                     color: "white",
//                     borderRadius: 7,
//                     padding: "11px 15px",
//                     zIndex: 20,
//                     pointerEvents: "none",
//                     boxShadow: "0 6px 20px rgba(27,58,107,.35)",
//                     minWidth: 240,
//                     maxWidth: 300,
//                   }}>
//                     <div style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, fontSize: ".82rem", marginBottom: 5, lineHeight: 1.4 }}>{v.title}</div>
//                     <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem", opacity: .85 }}>Effective: {v.startDate}</div>
//                     <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".71rem", opacity: .6, marginTop: 2 }}>Through: {v.endDate}</div>
//                     <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".69rem", color: GOLD, marginTop: 7, fontWeight: 600 }}>Click to view →</div>
//                     <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${PRIMARY}` }} />
//                   </div>
//                 )}
//                 {/* The tick */}
//                 <div
//                   style={{
//                     width: isHov ? 4 : 3,
//                     height: isHov ? 52 : 44,
//                     background: isHov ? GOLD : PRIMARY,
//                     borderRadius: 2,
//                     cursor: "pointer",
//                     transition: "all .15s ease",
//                     boxShadow: isHov ? `0 0 0 3px ${GOLD}44` : "none",
//                   }}
//                   onMouseEnter={() => setHovered(v.id)}
//                   onMouseLeave={() => setHovered(null)}
//                   onClick={() => onOpenVersion(v.id)}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Legend */}
//       <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 20 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//           <div style={{ width: 3, height: 18, background: PRIMARY, borderRadius: 2 }} />
//           <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#6B7280" }}>Effective date — click to view constitution</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//           <div style={{ width: 1, height: 14, background: "#9CA3AF" }} />
//           <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#6B7280" }}>Year boundary</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Constitution full-text view
// // ─────────────────────────────────────────────────────────────────────────────
// function ConstitutionView({ version, onBack }) {
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch]           = useState("");
//   const [matchCursor, setMatchCursor] = useState(0);

//   const meta   = VERSION_DETAILS.find(v => v.id === version.id);
//   const groups = useMemo(() => groupLines(version.text.split("\n")), [version.text]);
//   const tocItems = useMemo(() => buildToc(groups), [groups]);

//   const searchLower = search.toLowerCase();

//   // Indices of groups that contain the search term
//   const matchIndices = useMemo(() => {
//     if (!search) return [];
//     return groups.reduce((acc, g, i) => {
//       if (g.text.toLowerCase().includes(searchLower)) acc.push(i);
//       return acc;
//     }, []);
//   }, [groups, search, searchLower]);

//   const totalMatches  = matchIndices.length;
//   const currentGroupIdx = matchIndices[matchCursor] ?? -1;

//   // Ref array for every rendered group
//   const groupRefs = useRef([]);

//   // Scroll to current match whenever matchCursor or the match list changes
//   useEffect(() => {
//     const idx = matchIndices[matchCursor];
//     if (idx !== undefined && groupRefs.current[idx]) {
//       groupRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [matchCursor, matchIndices]);

//   function commitSearch() {
//     setSearch(searchInput.trim());
//     setMatchCursor(0);
//   }

//   function clearSearch() {
//     setSearchInput(""); setSearch(""); setMatchCursor(0);
//   }

//   function scrollToGroup(idx) {
//     if (groupRefs.current[idx]) {
//       groupRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }

//   // Highlight ALL occurrences of term in a string, returning React nodes
//   function highlightAll(text) {
//     const parts = [];
//     const lower = text.toLowerCase();
//     let pos = 0, key = 0;
//     while (pos < text.length) {
//       const idx = lower.indexOf(searchLower, pos);
//       if (idx === -1) { parts.push(text.slice(pos)); break; }
//       if (idx > pos) parts.push(text.slice(pos, idx));
//       parts.push(<mark key={key++}>{text.slice(idx, idx + search.length)}</mark>);
//       pos = idx + search.length;
//     }
//     return parts;
//   }

//   // Render grouped paragraphs
//   const rendered = groups.map((g, i) => {
//     const isCurrentMatch = i === currentGroupIdx;
//     const isAnyMatch     = search && g.text.toLowerCase().includes(searchLower);
//     const content        = isAnyMatch ? highlightAll(g.text) : g.text;

//     const cssClass =
//       g.kind === "title"   ? "const-title"   :
//       g.kind === "article" ? "const-article" :
//       "const-body";

//     return (
//       <p
//         key={i}
//         ref={el => { groupRefs.current[i] = el; }}
//         className={cssClass}
//         style={
//           isCurrentMatch
//             ? { background: "#FEF3C7", outline: `2px solid ${GOLD}`, borderRadius: 3, padding: "2px 5px" }
//             : isAnyMatch
//             ? { background: "#FEFCE8", borderRadius: 3, padding: "1px 3px" }
//             : undefined
//         }
//       >
//         {content}
//       </p>
//     );
//   });

//   return (
//     <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh" }}>
//       <style>{GLOBAL_CSS}</style>
//       <Header onHome={onBack} />

//       {/* ── Version banner — no description text ── */}
//       <div style={{ background: "white", borderBottom: "1px solid #E5DDD0" }}>
//         <div style={{ maxWidth: 1300, margin: "0 auto", padding: "18px 44px" }}>
//           <button className="back-link" onClick={onBack}>← Back</button>
//           <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY, marginTop: 10, marginBottom: 10 }}>
//             {meta?.title}
//           </h1>
//           <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 5, padding: "6px 16px" }}>
//             <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: ".08em" }}>In Force</span>
//             <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".93rem", fontWeight: 700, color: PRIMARY }}>
//               {meta?.startDate} — {meta?.endDate}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ── Three-column layout ── */}
//       <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 44px", display: "grid", gridTemplateColumns: "230px 1fr 185px", gap: 28, alignItems: "start" }}>

//         {/* ── LEFT: Search + Table of Contents ── */}
//         <aside style={{ position: "sticky", top: 16 }}>

//           {/* Search box */}
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px", marginBottom: 14 }}>
//             <label className="field-label">Search Text</label>
//             <input
//               className="text-input"
//               style={{ width: "100%", marginBottom: 8 }}
//               placeholder="Search…"
//               value={searchInput}
//               onChange={e => setSearchInput(e.target.value)}
//               onKeyDown={e => e.key === "Enter" && commitSearch()}
//             />
//             <button className="primary-btn" style={{ width: "100%", padding: "7px", fontSize: ".83rem" }} onClick={commitSearch}>
//               Search
//             </button>

//             {/* Ctrl-F-style navigation */}
//             {search && (
//               <div style={{ marginTop: 10 }}>
//                 <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: totalMatches === 0 ? "#991B1B" : "#4B5563", textAlign: "center", marginBottom: 7 }}>
//                   {totalMatches === 0
//                     ? `No results for "${search}"`
//                     : `${matchCursor + 1} of ${totalMatches} match${totalMatches !== 1 ? "es" : ""}`}
//                 </div>
//                 {totalMatches > 0 && (
//                   <div style={{ display: "flex", gap: 6 }}>
//                     <button
//                       onClick={() => setMatchCursor(c => (c - 1 + totalMatches) % totalMatches)}
//                       style={{ flex: 1, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 4, padding: "5px 0", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#374151" }}
//                     >
//                       ← Prev
//                     </button>
//                     <button
//                       onClick={() => setMatchCursor(c => (c + 1) % totalMatches)}
//                       style={{ flex: 1, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 4, padding: "5px 0", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#374151" }}
//                     >
//                       Next →
//                     </button>
//                   </div>
//                 )}
//                 <button
//                   onClick={clearSearch}
//                   style={{ width: "100%", marginTop: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".74rem", color: "#9CA3AF" }}
//                 >
//                   Clear search
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Table of Contents */}
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px 12px", maxHeight: "52vh", overflowY: "auto" }}>
//             <label className="field-label" style={{ paddingLeft: 4 }}>Contents</label>
//             {tocItems.map(item => (
//               <button key={item.idx} className="toc-btn" onClick={() => scrollToGroup(item.idx)}>
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </aside>

//         {/* ── CENTER: Constitution text ── */}
//         <main style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "52px 64px", minHeight: 600 }}>
//           {rendered}
//         </main>

//         {/* ── RIGHT: Version details — no General Rule ── */}
//         <aside style={{ position: "sticky", top: 16 }}>
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "16px" }}>
//             <label className="field-label">Version Details</label>
//             <div style={{ marginBottom: 14 }}>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>Start Date</p>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", fontWeight: 700, color: PRIMARY }}>{meta?.startDate}</p>
//             </div>
//             <div>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>End Date</p>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", fontWeight: 700, color: PRIMARY }}>{meta?.endDate}</p>
//             </div>
//           </div>
//         </aside>

//       </div>

//       <Footer />
//     </div>
//   );
// }
import { useState, useRef, useEffect, useMemo } from "react";
import { findVersionForDate, getVersionText } from "./db";

// ─────────────────────────────────────────────────────────────────────────────
// Version data — sourced directly from Constitution Timeline For Website.docx
// ─────────────────────────────────────────────────────────────────────────────
const VERSION_DETAILS = [
  // ── 1969–1979 ──
  { id: "001", title: "1969 Constitution",                                                    startDate: "January 7, 1969",    endDate: "January 4, 1971",    startISO: "1969-01-07" },
  { id: "002", title: "1971 Constitution (1970 Election)",                                    startDate: "January 5, 1971",    endDate: "November 1, 1971",   startISO: "1971-01-05" },
  { id: "003", title: "1971 Constitution (1970 & 1971 Special Election)",                     startDate: "November 2, 1971",   endDate: "March 13, 1972",     startISO: "1971-11-02" },
  { id: "004", title: "1971 Constitution (1972 Special Election Change)",                     startDate: "March 14, 1972",     endDate: "January 1, 1973",    startISO: "1972-03-14" },
  { id: "005", title: "1973 Constitution (1972 Special & General Election)",                  startDate: "January 2, 1973",    endDate: "December 31, 1974",  startISO: "1973-01-02" },
  { id: "006", title: "1973 Constitution (Only January 1 Amendment — HJR 3911)",              startDate: "January 1, 1975",    endDate: "January 4, 1975",    startISO: "1975-01-01" },
  { id: "007", title: "1975 Constitution (Without July Amendment)",                           startDate: "January 5, 1975",    endDate: "June 30, 1975",      startISO: "1975-01-05" },
  { id: "008", title: "1975 Constitution (All Amendments Included)",                          startDate: "July 1, 1975",       endDate: "March 8, 1976",      startISO: "1975-07-01" },
  { id: "009", title: "1977 Constitution (Special Election Only)",                            startDate: "March 9, 1976",      endDate: "January 3, 1977",    startISO: "1976-03-09" },
  { id: "010", title: "1977 Constitution (All Amendments Included)",                          startDate: "January 4, 1977",    endDate: "March 10, 1980",     startISO: "1977-01-04" },
  // ── 1980–1990 ──
  { id: "011", title: "1980 Constitution (March Special Election — First Measure)",           startDate: "March 11, 1980",     endDate: "March 31, 1980",     startISO: "1980-03-11" },
  { id: "012", title: "1980 Constitution (March Special Election — Second Measure)",          startDate: "April 1, 1980",      endDate: "October 6, 1980",    startISO: "1980-04-01" },
  { id: "013", title: "1980 Constitution (October Election — Immediately Effective)",         startDate: "October 7, 1980",    endDate: "December 31, 1980",  startISO: "1980-10-07" },
  { id: "014", title: "1981 Constitution (January Special Election — First Measure)",         startDate: "January 1, 1981",    endDate: "January 5, 1981",    startISO: "1981-01-01" },
  { id: "015", title: "1981 Constitution (January Special Election — All Measures)",          startDate: "January 6, 1981",    endDate: "December 31, 1982",  startISO: "1981-01-06" },
  { id: "016", title: "1983 Constitution (January Special Election — First Measure)",         startDate: "January 1, 1983",    endDate: "January 3, 1983",    startISO: "1983-01-01" },
  { id: "017", title: "1983 Constitution (January Special Election — All Measures)",          startDate: "January 4, 1983",    endDate: "January 7, 1985",    startISO: "1983-01-04" },
  { id: "018", title: "1985 Constitution (January Special Election — First Measure)",         startDate: "January 8, 1985",    endDate: "June 30, 1985",      startISO: "1985-01-08" },
  { id: "019", title: "1985 Constitution (July Amendment Included)",                          startDate: "July 1, 1985",       endDate: "January 5, 1987",    startISO: "1985-07-01" },
  { id: "020", title: "1987 Constitution (All Amendments Included)",                          startDate: "January 6, 1987",    endDate: "November 7, 1988",   startISO: "1987-01-06" },
  { id: "021", title: "1988 Constitution (November Election Amendments)",                     startDate: "November 8, 1988",   endDate: "January 3, 1989",    startISO: "1988-11-08" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const PRIMARY = "#1B3A6B";
const GOLD    = "#C4882A";
const CREAM   = "#F8F6F1";

// ─────────────────────────────────────────────────────────────────────────────
// Text grouping — joins word-wrapped lines from the docx into proper paragraphs
// ─────────────────────────────────────────────────────────────────────────────
function classifyRawLine(trimmed) {
  if (!trimmed) return "empty";
  const letters = trimmed.replace(/[^a-zA-Z]/g, "");
  const allCaps = letters.length > 0 && letters === letters.toUpperCase();
  if (allCaps) {
    if (trimmed === "CONSTITUTION OF THE STATE OF FLORIDA" || trimmed === "PREAMBLE") return "title";
    if (/^ARTICLE\b/.test(trimmed) || /^SCHEDULE\b/.test(trimmed)) return "article";
    return "article"; // e.g. "DECLARATION OF RIGHTS", "JUDICIAL DEPARTMENT"
  }
  return "body";
}

function groupLines(rawLines) {
  const groups = [];
  let buf = null;

  function flush() {
    if (buf) { groups.push(buf); buf = null; }
  }

  for (const raw of rawLines) {
    const trimmed = raw.trim();
    if (!trimmed) { flush(); continue; }

    const kind = classifyRawLine(trimmed);

    if (kind !== "body") {
      // Headings always stand alone
      flush();
      groups.push({ kind, text: trimmed });
    } else {
      // "SECTION X." always starts a fresh paragraph
      if (/^SECTION\s+\d+/i.test(trimmed)) {
        flush();
        buf = { kind: "body", text: trimmed };
      } else if (!buf) {
        buf = { kind: "body", text: trimmed };
      } else {
        // Join continuation line — add space
        buf.text += " " + trimmed;
      }
    }
  }
  flush();
  return groups;
}

// Smart title-case (keeps small words lowercase unless first word)
function toTitleCase(str) {
  const small = new Set(["of","and","the","in","or","a","an","for","to","by","with","at"]);
  return str.toLowerCase().split(" ").map((w, i) =>
    (!small.has(w) || i === 0) ? w.charAt(0).toUpperCase() + w.slice(1) : w
  ).join(" ");
}

// Build TOC from grouped lines — only top-level structural markers
function buildToc(groups) {
  const items = [];
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i];
    if (g.kind === "title" && g.text === "PREAMBLE") {
      items.push({ idx: i, label: "Preamble" });
    } else if (g.kind === "article" && /^ARTICLE\s+/i.test(g.text)) {
      const numPart = g.text.replace(/^ARTICLE\s+/i, "");
      // Look for subtitle on the very next group
      const next = groups[i + 1];
      const hasSub = next && next.kind === "article"
        && !/^ARTICLE\s+/i.test(next.text)
        && !/^SCHEDULE\b/i.test(next.text);
      const label = hasSub
        ? `Article ${numPart} — ${toTitleCase(next.text)}`
        : `Article ${numPart}`;
      items.push({ idx: i, label });
    } else if (g.kind === "article" && /^SCHEDULE\b/i.test(g.text)) {
      items.push({ idx: i, label: toTitleCase(g.text) });
    }
  }
  return items;
}

// ─────────────────────────────────────────────────────────────────────────────
// Global CSS
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100vh; background: ${CREAM}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${CREAM}; }
  ::-webkit-scrollbar-thumb { background: #C9C0AE; border-radius: 3px; }

  .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; color: rgba(255,255,255,.82); font-weight: 600; padding: 4px 0; transition: color .15s; }
  .nav-btn:hover, .nav-btn.active { color: ${GOLD}; }
  .nav-btn.active { border-bottom: 2px solid ${GOLD}; padding-bottom: 2px; }
  .contact-btn { background: ${PRIMARY}; color: white; border: 1px solid rgba(255,255,255,.25); padding: 7px 18px; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; font-size: .84rem; cursor: pointer; }

  .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: .86rem; color: #374151; cursor: pointer; background: none; border: none; width: 100%; text-align: left; transition: background .12s; }
  .sidebar-link:hover { background: #EEE9DF; }
  .sidebar-link.active { background: #EEF2FF; color: ${PRIMARY}; font-weight: 600; border-left: 3px solid ${PRIMARY}; }

  .select-input { padding: 9px 11px; border: 1px solid #C9C0AE; border-radius: 5px; font-family: 'Source Sans 3', sans-serif; font-size: .9rem; background: white; outline: none; color: #1a1a2e; }
  .select-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 3px #1B3A6B18; }

  .primary-btn { background: ${PRIMARY}; color: white; border: none; padding: 10px 26px; border-radius: 5px; font-family: 'Source Sans 3', sans-serif; font-weight: 700; font-size: .9rem; cursor: pointer; transition: background .15s; }
  .primary-btn:hover { background: #152e55; }

  .text-input { padding: 9px 12px; border: 1px solid #C9C0AE; border-radius: 5px; font-family: 'Source Sans 3', sans-serif; font-size: .9rem; background: white; outline: none; color: #1a1a2e; }
  .text-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 3px #1B3A6B18; }
  .text-input::placeholder { color: #aaa; }

  .field-label { font-family: 'Source Sans 3', sans-serif; font-size: .73rem; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 6px; display: block; }

  .error-box { background: #FEF2F2; border: 1px solid #FECACA; border-radius: 6px; padding: 10px 15px; font-family: 'Source Sans 3', sans-serif; font-size: .85rem; color: #991B1B; margin-top: 12px; }

  .back-link { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .82rem; color: #6B7280; padding: 0; display: inline-flex; align-items: center; gap: 4px; transition: color .12s; }
  .back-link:hover { color: ${PRIMARY}; }

  .toc-btn { display: block; width: 100%; text-align: left; background: none; border: none; border-radius: 4px; padding: 6px 8px; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .78rem; color: #374151; line-height: 1.45; margin-bottom: 2px; transition: background .1s, color .1s; }
  .toc-btn:hover { background: #EEE9DF; color: ${PRIMARY}; }

  /* Constitution text styles */
  .const-title   { font-family: 'Libre Baskerville', serif; font-size: 1rem; font-weight: 700; color: ${PRIMARY}; text-align: center; margin: 28px 0 6px; letter-spacing: .03em; }
  .const-article { font-family: 'Libre Baskerville', serif; font-size: .97rem; font-weight: 700; color: ${PRIMARY}; margin: 30px 0 4px; letter-spacing: .04em; }
  .const-body    { font-family: 'Libre Baskerville', serif; font-size: .93rem; line-height: 1.95; color: #1a1a2e; margin-bottom: 10px; }

  mark { background: #FEF08A; color: inherit; border-radius: 2px; padding: 0 1px; }
  mark.active-match { background: #F59E0B; outline: 2px solid #D97706; border-radius: 2px; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Shared Header
// ─────────────────────────────────────────────────────────────────────────────
function Header({ onHome, isHome }) {
  return (
    <header style={{ background: PRIMARY, borderBottom: `3px solid ${GOLD}`, padding: "0 44px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 13, padding: 0 }}>
          {/* Gold teardrop pin */}
          <svg width="22" height="30" viewBox="0 0 60 78" fill={GOLD}>
            <path d="M30 2 C13 2 2 17 2 33 C2 51 13 63 21 71 C24 74 27 77 30 79 C33 77 36 74 39 71 C47 63 58 51 58 33 C58 17 47 2 30 2Z"/>
            <circle cx="30" cy="33" r="10" fill={PRIMARY}/>
          </svg>
          <div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.1rem", fontWeight: 700, color: "white", lineHeight: 1.15 }}>Florida Constitution</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".57rem", color: "rgba(255,255,255,.55)", letterSpacing: ".16em", textTransform: "uppercase" }}>Text and History Archive</div>
          </div>
        </button>
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <button className={`nav-btn${isHome ? " active" : ""}`} onClick={onHome}>Home</button>
          <button className="nav-btn">About</button>
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Footer
// ─────────────────────────────────────────────────────────────────────────────
function SocialIcon({ label, path }) {
  return (
    <a href="#" aria-label={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", color: "rgba(255,255,255,.7)", transition: "border-color .15s, color .15s" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d={path}/>
      </svg>
    </a>
  );
}

function Footer() {
  return (
    <footer style={{ background: PRIMARY, borderTop: `3px solid ${GOLD}`, marginTop: 0 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "40px 44px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>

        {/* Left — UF Law branding */}
        <div>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".65rem", color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>
            University of Florida Levin College of Law
          </p>
          <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", fontWeight: 700, color: "white", lineHeight: 1.35 }}>
            Law &amp; Government Program
          </p>
        </div>

        {/* Center — Contact */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".65rem", fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 10 }}>
            Contact
          </p>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "rgba(255,255,255,.8)", marginBottom: 5 }}>thefloridaconstitution@ufl.edu</p>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "rgba(255,255,255,.8)" }}>(352) 273-0890</p>
        </div>

        {/* Right — About + social icons */}
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "rgba(255,255,255,.8)", marginBottom: 14 }}>About</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            {/* Facebook */}
            <SocialIcon label="Facebook" path="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            {/* X (Twitter) */}
            <SocialIcon label="X" path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            {/* LinkedIn */}
            <SocialIcon label="LinkedIn" path="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>
            {/* YouTube */}
            <SocialIcon label="YouTube" path="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", padding: "14px 44px" }}>
        <p style={{ maxWidth: 1300, margin: "0 auto", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "rgba(255,255,255,.35)", textAlign: "center" }}>
          &copy; {new Date().getFullYear()} University of Florida Levin College of Law -- Law &amp; Government Program. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root — manages panels
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [panel, setPanel]           = useState("home");   // "home" | "timeline"
  const [viewVersionId, setViewVersionId] = useState(null);

  function openVersion(id) {
    setViewVersionId(id);
  }

  if (viewVersionId) {
    return <ConstitutionView versionId={viewVersionId} onBack={() => setViewVersionId(null)} />;
  }

  if (panel === "timeline") {
    return (
      <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <style>{GLOBAL_CSS}</style>
        <Header onHome={() => setPanel("home")} isHome={false} />
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "36px 44px", width: "100%", flex: 1 }}>
          <button className="back-link" onClick={() => setPanel("home")} style={{ marginBottom: 20 }}>← Back to Home</button>
          <TimelinePanel onOpenVersion={openVersion} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{GLOBAL_CSS}</style>
      <Header onHome={() => setPanel("home")} isHome={true} />
      <HomePanel onOpenVersion={openVersion} onTimeline={() => setPanel("timeline")} />
      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home — date picker (full-width, centered, no sidebar)
// ─────────────────────────────────────────────────────────────────────────────
function HomePanel({ onOpenVersion, onTimeline }) {
  const [month, setMonth] = useState(1);
  const [day,   setDay]   = useState(7);
  const [year,  setYear]  = useState(1969);
  const [error, setError] = useState("");

  async function handleView() {
    const id = await findVersionForDate(year, month, day);
    if (id) { onOpenVersion(id); setError(""); }
    else setError(`No constitution was in force on ${MONTHS[month - 1]} ${day}, ${year}. Data covers January 7, 1969 – January 3, 1989.`);
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 44px 72px" }}>
      {/* Page heading */}
      <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "2rem", fontWeight: 700, color: PRIMARY, marginBottom: 14, textAlign: "center" }}>
        Explore the Florida Constitution
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem", color: "#4B5563", lineHeight: 1.7, marginBottom: 44, maxWidth: 560, textAlign: "center" }}>
        Enter any date to view the full text of Florida&apos;s Constitution as it was legally in force on that day.
        Our archive spans <strong>January 7, 1969</strong> through <strong>January 3, 1989</strong>.
      </p>

      {/* Date picker card */}
      <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 10, padding: "32px 36px", width: "100%", maxWidth: 540, boxShadow: "0 4px 20px rgba(27,58,107,.09)" }}>
        <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.05rem", fontWeight: 700, color: PRIMARY, marginBottom: 24, textAlign: "center" }}>
          Text of the Florida Constitution Over Time
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.3fr", gap: 14, marginBottom: 24 }}>
          <div>
            <label className="field-label">Month</label>
            <select className="select-input" value={month} onChange={e => setMonth(Number(e.target.value))} style={{ width: "100%" }}>
              {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Day</label>
            <select className="select-input" value={day} onChange={e => setDay(Number(e.target.value))} style={{ width: "100%" }}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label">Year</label>
            <input type="number" className="text-input" value={year} min={1969} max={1982} onChange={e => setYear(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        </div>

        <button
          className="primary-btn"
          onClick={handleView}
          style={{ width: "100%", padding: "12px", fontSize: ".95rem", borderRadius: 6 }}
        >
          View Constitution
        </button>

        {error && <div className="error-box">{error}</div>}
      </div>

      {/* Timeline link */}
      <button
        onClick={onTimeline}
        style={{ marginTop: 24, background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: PRIMARY, textDecoration: "underline", textUnderlineOffset: 3 }}
      >
        Or browse all versions on the timeline &rarr;
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline — single continuous ruler 1969 → 1983
// ─────────────────────────────────────────────────────────────────────────────
const TL_START = 1969;
const TL_END   = 1990; // covers through Jan 1989 + padding
const TL_SPAN  = TL_END - TL_START;

function tlPct(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dec = (y - TL_START) + (m - 1) / 12 + (d - 1) / 365;
  return Math.max(0, Math.min((dec / TL_SPAN) * 100, 100));
}

function TimelinePanel({ onOpenVersion }) {
  const [hovered,   setHovered]   = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  // Every integer year label from 1969 to 1983
  const yearLabels = Array.from({ length: TL_SPAN + 1 }, (_, i) => TL_START + i);

  return (
    <div>
      {/* Heading row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.65rem", fontWeight: 700, color: PRIMARY }}>
          Constitution Timeline
        </h1>
        <button
          onClick={() => setShowAbout(v => !v)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #C9C0AE", borderRadius: 5, padding: "6px 14px", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#374151" }}
        >
          <span style={{ color: PRIMARY }}>ⓘ</span> About This Timeline
        </button>
      </div>

      {showAbout && (
        <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: "#1E40AF", lineHeight: 1.75 }}>
            This timeline shows every version of Florida&apos;s Constitution (1968 revision) that was legally
            in force from 1969 through 1982. Each vertical mark represents the effective date of a new
            version. Hover to see dates; click any mark to read the full text.
          </p>
        </div>
      )}

      {/* ── Single unified timeline card ── */}
      <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 10, padding: "28px 32px 24px", userSelect: "none" }}>

        {/* Year labels */}
        <div style={{ position: "relative", height: 22, marginBottom: 8 }}>
          {yearLabels.map(yr => (
            <span
              key={yr}
              style={{
                position: "absolute",
                left: `${((yr - TL_START) / TL_SPAN) * 100}%`,
                transform: "translateX(-50%)",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: yr % 5 === 0 ? ".78rem" : ".7rem",
                fontWeight: yr % 5 === 0 ? 700 : 500,
                color: yr % 5 === 0 ? "#374151" : "#9CA3AF",
                whiteSpace: "nowrap",
              }}
            >
              {yr}
            </span>
          ))}
        </div>

        {/* Ruler */}
        <div style={{ position: "relative", height: 64 }}>
          {/* Baseline bar */}
          <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 3, background: "#D1D5DB", transform: "translateY(-50%)", borderRadius: 2 }} />

          {/* Year boundary ticks */}
          {yearLabels.map(yr => (
            <div
              key={yr}
              style={{
                position: "absolute",
                left: `${((yr - TL_START) / TL_SPAN) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 1,
                height: yr % 5 === 0 ? 20 : 12,
                background: yr % 5 === 0 ? "#9CA3AF" : "#D1D5DB",
              }}
            />
          ))}

          {/* Effective-date tick marks — all 13 on one ruler */}
          {VERSION_DETAILS.map(v => {
            const p     = tlPct(v.startISO);
            const isHov = hovered === v.id;
            return (
              <div
                key={v.id}
                style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: isHov ? 10 : 1 }}
              >
                {/* Hover tooltip */}
                {isHov && (
                  <div style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    left: "50%",
                    transform: p > 80 ? "translateX(-93%)" : p < 8 ? "translateX(-7%)" : "translateX(-50%)",
                    background: PRIMARY,
                    color: "white",
                    borderRadius: 7,
                    padding: "11px 15px",
                    zIndex: 20,
                    pointerEvents: "none",
                    boxShadow: "0 6px 20px rgba(27,58,107,.35)",
                    minWidth: 240,
                    maxWidth: 300,
                  }}>
                    <div style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 700, fontSize: ".82rem", marginBottom: 5, lineHeight: 1.4 }}>{v.title}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem", opacity: .85 }}>Effective: {v.startDate}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".71rem", opacity: .6, marginTop: 2 }}>Through: {v.endDate}</div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".69rem", color: GOLD, marginTop: 7, fontWeight: 600 }}>Click to view →</div>
                    <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${PRIMARY}` }} />
                  </div>
                )}
                {/* The tick */}
                <div
                  style={{
                    width: isHov ? 4 : 3,
                    height: isHov ? 52 : 44,
                    background: isHov ? GOLD : PRIMARY,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all .15s ease",
                    boxShadow: isHov ? `0 0 0 3px ${GOLD}44` : "none",
                  }}
                  onMouseEnter={() => setHovered(v.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onOpenVersion(v.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 3, height: 18, background: PRIMARY, borderRadius: 2 }} />
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#6B7280" }}>Effective date — click to view constitution</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 1, height: 14, background: "#9CA3AF" }} />
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#6B7280" }}>Year boundary</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Constitution full-text view
// ─────────────────────────────────────────────────────────────────────────────
function ConstitutionView({ versionId, onBack }) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch]           = useState("");
  const [matchCursor, setMatchCursor] = useState(0);
  const [rawText, setRawText]   = useState("");
  const [loadedFor, setLoadedFor] = useState(null);

  const meta      = VERSION_DETAILS.find(v => v.id === versionId);
  const isLoading = loadedFor !== versionId;

  // Load the full text from the SQLite DB; track which versionId it belongs to
  useEffect(() => {
    let cancelled = false;
    getVersionText(versionId).then(text => {
      if (!cancelled) { setRawText(text); setLoadedFor(versionId); }
    });
    return () => { cancelled = true; };
  }, [versionId]);

  const groups   = useMemo(() => isLoading ? [] : groupLines(rawText.split("\n")), [rawText, isLoading]);
  const tocItems = useMemo(() => buildToc(groups), [groups]);

  const searchLower = search.toLowerCase();

  // Indices of groups that contain the search term
  const matchIndices = useMemo(() => {
    if (!search) return [];
    return groups.reduce((acc, g, i) => {
      if (g.text.toLowerCase().includes(searchLower)) acc.push(i);
      return acc;
    }, []);
  }, [groups, search, searchLower]);

  const totalMatches  = matchIndices.length;
  const currentGroupIdx = matchIndices[matchCursor] ?? -1;

  // Ref array for every rendered group
  const groupRefs = useRef([]);

  // Scroll to current match whenever matchCursor or the match list changes
  useEffect(() => {
    const idx = matchIndices[matchCursor];
    if (idx !== undefined && groupRefs.current[idx]) {
      groupRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [matchCursor, matchIndices]);

  function commitSearch() {
    setSearch(searchInput.trim());
    setMatchCursor(0);
  }

  function clearSearch() {
    setSearchInput(""); setSearch(""); setMatchCursor(0);
  }

  function scrollToGroup(idx) {
    if (groupRefs.current[idx]) {
      groupRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Highlight ALL occurrences of term in a string, returning React nodes
  function highlightAll(text) {
    const parts = [];
    const lower = text.toLowerCase();
    let pos = 0, key = 0;
    while (pos < text.length) {
      const idx = lower.indexOf(searchLower, pos);
      if (idx === -1) { parts.push(text.slice(pos)); break; }
      if (idx > pos) parts.push(text.slice(pos, idx));
      parts.push(<mark key={key++}>{text.slice(idx, idx + search.length)}</mark>);
      pos = idx + search.length;
    }
    return parts;
  }

  // Render grouped paragraphs
  const rendered = groups.map((g, i) => {
    const isCurrentMatch = i === currentGroupIdx;
    const isAnyMatch     = search && g.text.toLowerCase().includes(searchLower);
    const content        = isAnyMatch ? highlightAll(g.text) : g.text;

    const cssClass =
      g.kind === "title"   ? "const-title"   :
      g.kind === "article" ? "const-article" :
      "const-body";

    return (
      <p
        key={i}
        ref={el => { groupRefs.current[i] = el; }}
        className={cssClass}
        style={
          isCurrentMatch
            ? { background: "#FEF3C7", outline: `2px solid ${GOLD}`, borderRadius: 3, padding: "2px 5px" }
            : isAnyMatch
            ? { background: "#FEFCE8", borderRadius: 3, padding: "1px 3px" }
            : undefined
        }
      >
        {content}
      </p>
    );
  });

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <Header onHome={onBack} isHome={false} />

      {/* ── Version banner — no description text ── */}
      <div style={{ background: "white", borderBottom: "1px solid #E5DDD0" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "18px 44px" }}>
          <button className="back-link" onClick={onBack}>← Back</button>
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY, marginTop: 10, marginBottom: 10 }}>
            {meta?.title}
          </h1>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 5, padding: "6px 16px" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: ".08em" }}>In Force</span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".93rem", fontWeight: 700, color: PRIMARY }}>
              {meta?.startDate} — {meta?.endDate}
            </span>
          </div>
        </div>
      </div>

      {/* ── Three-column layout ── */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 44px", display: "grid", gridTemplateColumns: "230px 1fr 185px", gap: 28, alignItems: "start" }}>

        {/* ── LEFT: Search + Table of Contents ── */}
        <aside style={{ position: "sticky", top: 16 }}>

          {/* Search box */}
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px", marginBottom: 14 }}>
            <label className="field-label">Search Text</label>
            <input
              className="text-input"
              style={{ width: "100%", marginBottom: 8 }}
              placeholder="Search…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && commitSearch()}
            />
            <button className="primary-btn" style={{ width: "100%", padding: "7px", fontSize: ".83rem" }} onClick={commitSearch}>
              Search
            </button>

            {/* Ctrl-F-style navigation */}
            {search && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: totalMatches === 0 ? "#991B1B" : "#4B5563", textAlign: "center", marginBottom: 7 }}>
                  {totalMatches === 0
                    ? `No results for "${search}"`
                    : `${matchCursor + 1} of ${totalMatches} match${totalMatches !== 1 ? "es" : ""}`}
                </div>
                {totalMatches > 0 && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => setMatchCursor(c => (c - 1 + totalMatches) % totalMatches)}
                      style={{ flex: 1, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 4, padding: "5px 0", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#374151" }}
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setMatchCursor(c => (c + 1) % totalMatches)}
                      style={{ flex: 1, background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 4, padding: "5px 0", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#374151" }}
                    >
                      Next →
                    </button>
                  </div>
                )}
                <button
                  onClick={clearSearch}
                  style={{ width: "100%", marginTop: 6, background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".74rem", color: "#9CA3AF" }}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Table of Contents */}
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px 12px", maxHeight: "52vh", overflowY: "auto" }}>
            <label className="field-label" style={{ paddingLeft: 4 }}>Contents</label>
            {tocItems.map(item => (
              <button key={item.idx} className="toc-btn" onClick={() => scrollToGroup(item.idx)}>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* ── CENTER: Constitution text ── */}
        <main style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "52px 64px", minHeight: 600 }}>
          {isLoading
            ? <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#9CA3AF", fontSize: ".9rem" }}>Loading…</p>
            : rendered}
        </main>

        {/* ── RIGHT: Version details — no General Rule ── */}
        <aside style={{ position: "sticky", top: 16 }}>
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "16px" }}>
            <label className="field-label">Version Details</label>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>Start Date</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", fontWeight: 700, color: PRIMARY }}>{meta?.startDate}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 5 }}>End Date</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", fontWeight: 700, color: PRIMARY }}>{meta?.endDate}</p>
            </div>
          </div>
        </aside>

      </div>

      <Footer />
    </div>
  );
}

