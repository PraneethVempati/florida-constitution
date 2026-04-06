// import { useState } from "react";
// import {
//   ARTICLES_1968,
//   TIMELINE_YEARS_1968,
//   EDITION_EVENTS,
//   NEW_IN_1971,
//   AMENDMENT_COUNTS,
// } from "./data";

// // ─────────────────────────────────────────────────────────────────────────────
// // Florida Constitution — 1968 Revision
// // Data source: data.js (built from 1969 & 1971 PDF editions via SQL extraction)
// // Blueprint: same three-panel layout as the 1838 Way Back Machine
// // ─────────────────────────────────────────────────────────────────────────────

// const STATUS = {
//   Adopted:  { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
//   Proposed: { bg: "#DBEAFE", color: "#1E40AF", dot: "#3B82F6" },
//   Defeated: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
// };

// export default function App() {
//   const [viewYear, setViewYear]               = useState(1968);
//   const [activeArticleId, setActiveArticleId] = useState("art5");
//   const [search, setSearch]                   = useState("");
//   const [expandedSections, setExpandedSections] = useState({});

//   const activeArticle = ARTICLES_1968.find(a => a.id === activeArticleId);

//   const visibleAmendments = (section) =>
//     section.amendments.filter(a => a.year <= viewYear);

//   const searchMatch = (text) =>
//     search === "" || text.toLowerCase().includes(search.toLowerCase());

//   const toggleSection = (id) =>
//     setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

//   const eventsToDate = EDITION_EVENTS.filter(e => e.year <= viewYear);

//   return (
//     <div style={{ fontFamily: "'Georgia', serif", background: "#F8F6F1", minHeight: "100vh", width: "100%", color: "#1a1a2e" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html, body, #root { width: 100%; min-height: 100vh; background: #F8F6F1; }
//         ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F8F6F1; } ::-webkit-scrollbar-thumb { background: #C9C0AE; border-radius: 3px; }

//         .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .87rem; color: rgba(255,255,255,.85); font-weight: 600; padding: 4px 0; transition: color .15s; }
//         .nav-btn:hover { color: #C4882A; }

//         .toc-btn { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 7px 10px; font-family: 'Source Sans 3', sans-serif; font-size: .79rem; color: #374151; border-radius: 4px; transition: background .12s; display: flex; justify-content: space-between; align-items: center; }
//         .toc-btn:hover { background: #EEE9DF; }
//         .toc-btn.active { background: #1B3A6B; color: white; }

//         .section-card { background: white; border: 1px solid #E5DDD0; border-radius: 6px; padding: 20px 22px; margin-bottom: 14px; }
//         .section-card.amended { border-left: 3px solid #C4882A; }

//         /* Amendment box — default state */
//         .amend-box { background: #FFFBF5; border: 1px solid #F0D8AA; border-radius: 5px; padding: 12px 14px; margin-top: 12px; }
//         /* Amendment box — new in 1971 gets a slightly stronger border */
//         .amend-box.new71 { border-left: 3px solid #C4882A; }

//         .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-family: 'Source Sans 3', sans-serif; font-size: .68rem; font-weight: 700; flex-shrink: 0; }
//         .new-badge { background: #FEF3C7; color: #92400E; border: 1px solid #F0D8AA; padding: 2px 8px; border-radius: 20px; font-size: .65rem; font-weight: 700; white-space: nowrap; }

//         .search-input { width: 100%; padding: 7px 10px; border: 1px solid #C9C0AE; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-size: .82rem; background: white; outline: none; }
//         .search-input:focus { border-color: #1B3A6B; }
//         .search-input::placeholder { color: #bbb; }

//         .year-dot { width: 12px; height: 12px; border-radius: 50%; cursor: pointer; border: 2px solid white; transition: transform .15s; flex-shrink: 0; }
//         .year-dot:hover { transform: scale(1.4); }

//         .expand-btn { background: none; border: none; cursor: pointer; text-align: left; width: 100%; padding: 0; font-family: 'Source Sans 3', sans-serif; }
//         .sidebar-row { position: relative; padding-left: 18px; padding-bottom: 14px; }
//         .sidebar-dot { position: absolute; left: 0; top: 3px; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; }
//         .sidebar-line { position: absolute; left: 4px; top: 12px; bottom: 0; width: 2px; background: #E5DDD0; }

//         /* Full text expand panel */
//         .full-text-panel { background: #F8F6F1; border: 1px solid #E5DDD0; border-radius: 4px; padding: 12px 14px; margin-top: 10px; }
//         .full-text-label { font-family: 'Source Sans 3', sans-serif; font-size: .68rem; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
//         .full-text-body { font-family: 'Libre Baskerville', serif; font-size: .85rem; line-height: 1.85; color: #1a1a2e; white-space: pre-wrap; }
//       `}</style>

//       {/* ── HEADER ── */}
//       <header style={{ background: "#1B3A6B", borderBottom: "3px solid #C4882A", padding: "0 36px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
//             <span style={{ fontSize: "1.4rem" }}>⚖</span>
//             <div>
//               <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.05rem", fontWeight: 700, color: "white" }}>Florida Constitution</div>
//               <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.58rem", color: "rgba(255,255,255,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>Historical Archive · FSU Law Library</div>
//             </div>
//           </div>
//           <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
//             {["Home", "The Constitutions", "Research Guides", "About"].map(n => (
//               <button key={n} className="nav-btn" style={{ color: n === "The Constitutions" ? "#C4882A" : undefined, borderBottom: n === "The Constitutions" ? "2px solid #C4882A" : "2px solid transparent", paddingBottom: 2 }}>{n}</button>
//             ))}
//             <button style={{ background: "#C4882A", color: "white", border: "none", padding: "6px 16px", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, fontSize: ".84rem", cursor: "pointer" }}>Search</button>
//           </nav>
//         </div>
//       </header>

//       {/* ── TIMELINE ── */}
//       <div style={{ background: "white", borderBottom: "1px solid #E5DDD0", padding: "14px 36px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto" }}>
//           <div style={{ fontSize: ".7rem", fontFamily: "'Source Sans 3', sans-serif", color: "#9CA3AF", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>
//             Constitution of 1968 — PDF Edition Timeline
//           </div>
//           <div style={{ position: "relative" }}>
//             <div style={{ position: "absolute", left: 6, right: 6, height: 2, background: "#D1D5DB", top: "50%", transform: "translateY(-50%)", zIndex: 0 }} />
//             <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
//               {TIMELINE_YEARS_1968.map(yr => {
//                 const isActive = yr === viewYear;
//                 const isPast   = yr < viewYear;
//                 const labels   = { 1968: "Adopted", 1969: "1st Edition", 1971: "2nd Edition" };
//                 return (
//                   <div key={yr} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }} onClick={() => setViewYear(yr)}>
//                     <div className="year-dot" style={{ background: isActive ? "#C4882A" : isPast ? "#1B3A6B" : "#D1D5DB", boxShadow: isActive ? "0 0 0 3px #C4882A44" : "none", transform: isActive ? "scale(1.4)" : "scale(1)" }} />
//                     <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", fontWeight: isActive ? 700 : 400, color: isActive ? "#C4882A" : "#6B7280" }}>{yr}</span>
//                     <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".62rem", color: "#9CA3AF" }}>{labels[yr]}</span>
//                     {yr === 1971 && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".58rem", color: "#C4882A", fontWeight: 700 }}>{NEW_IN_1971.length} new</span>}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── DATE BAR ── */}
//       <div style={{ background: "#F0EBE1", borderBottom: "1px solid #E5DDD0", padding: "9px 36px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "#374151" }}>Viewing edition:</span>
//             <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", fontWeight: 700, color: "#1B3A6B" }}>{viewYear}</span>
//           </div>
//           <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
//             <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))} style={{ padding: "5px 9px", border: "1px solid #C9C0AE", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", background: "white" }}>
//               {TIMELINE_YEARS_1968.map(y => <option key={y} value={y}>{y}</option>)}
//             </select>
//             <button style={{ padding: "5px 14px", background: "#1B3A6B", color: "white", border: "none", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", cursor: "pointer" }}>Update</button>
//             <button style={{ padding: "5px 12px", border: "1px solid #C9C0AE", borderRadius: 4, background: "white", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".77rem", color: "#374151", cursor: "pointer" }}>⬇ PDF</button>
//             <button style={{ padding: "5px 12px", border: "1px solid #C9C0AE", borderRadius: 4, background: "white", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".77rem", color: "#374151", cursor: "pointer" }}>🖨 Print</button>
//           </div>
//         </div>
//       </div>

//       {/* ── STATUS BAR ── */}
//       <div style={{ background: "#1B3A6B", padding: "6px 36px" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
//           <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
//             Now Displaying: Constitution of 1968 — {viewYear === 1968 ? "As Adopted" : `Amended through ${viewYear} edition`}
//           </span>
//           <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "rgba(255,255,255,.45)" }}>
//             Source: FSU College of Law Library · PDF editions extracted via SQL
//           </span>
//         </div>
//       </div>

//       {/* ── THREE-PANEL LAYOUT ── */}
//       <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 36px", display: "grid", gridTemplateColumns: "230px 1fr 270px", gap: 22, alignItems: "start" }}>

//         {/* ── LEFT: TABLE OF CONTENTS ── */}
//         <aside style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 6, padding: "15px 12px", position: "sticky", top: 16 }}>
//           <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".88rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 11, paddingBottom: 9, borderBottom: "1px solid #E5DDD0" }}>
//             Table of Contents
//           </h3>
//           <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {ARTICLES_1968.map(a => {
//               const amendedCount = a.sections.filter(s => visibleAmendments(s).length > 0).length;
//               return (
//                 <button key={a.id} className={`toc-btn ${activeArticleId === a.id ? "active" : ""}`} onClick={() => setActiveArticleId(a.id)}>
//                   <span>{a.title}</span>
//                   <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                     {amendedCount > 0 && (
//                       <span style={{ background: "#C4882A", color: "white", borderRadius: "50%", width: 16, height: 16, fontSize: ".6rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
//                         {amendedCount}
//                       </span>
//                     )}
//                     <span style={{ opacity: .45, fontSize: ".73rem" }}>›</span>
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Search */}
//           <div style={{ marginTop: 16, paddingTop: 13, borderTop: "1px solid #E5DDD0" }}>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Search Document</p>
//             <div style={{ display: "flex", gap: 5 }}>
//               <input className="search-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
//               <button style={{ background: "#1B3A6B", color: "white", border: "none", borderRadius: 4, padding: "0 8px", cursor: "pointer", fontSize: ".88rem" }}>⌕</button>
//             </div>
//           </div>

//           {/* Amendment count mini chart */}
//           <div style={{ marginTop: 16, paddingTop: 13, borderTop: "1px solid #E5DDD0" }}>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Amendments by Article</p>
//             {AMENDMENT_COUNTS.map(ac => (
//               <div key={ac.article_number} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
//                 <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#374151" }}>Art. {ac.article_number}</span>
//                 <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
//                   <div style={{ width: `${ac.total_amendments * 8}px`, height: 6, background: "#1B3A6B", borderRadius: 3 }} />
//                   <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#9CA3AF" }}>{ac.total_amendments}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* ── CENTER: CONSTITUTION TEXT ── */}
//         <main>
//           <div style={{ background: "linear-gradient(to bottom, #F0EBE1, #E8E0D2)", border: "1px solid #C9C0AE", borderRadius: 6, padding: "18px 20px", textAlign: "center", marginBottom: 16 }}>
//             <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.18rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 4 }}>
//               Constitution of the State of Florida
//             </h1>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#6B7280", letterSpacing: ".1em", textTransform: "uppercase" }}>
//               AS REVISED IN 1968 AND SUBSEQUENTLY AMENDED
//             </p>
//             {viewYear > 1968 && (
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#C4882A", marginTop: 6, fontWeight: 600 }}>
//                 {viewYear === 1971 ? `Showing 1971 edition — includes ${NEW_IN_1971.length} new changes` : "Showing 1969 edition — first printing"}
//               </p>
//             )}
//           </div>

//           {activeArticle && (
//             <>
//               <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.12rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 14 }}>
//                 {activeArticle.title}
//               </h2>

//               {activeArticle.sections
//                 .filter(s => searchMatch(s.text) || searchMatch(s.number || ""))
//                 .map(section => {
//                   const amendments = visibleAmendments(section);
//                   const hasAmend   = amendments.length > 0;

//                   return (
//                     <div key={section.id} className={`section-card ${hasAmend ? "amended" : ""}`}>
//                       {section.number && (
//                         <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".92rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 9 }}>
//                           {section.number}
//                         </h3>
//                       )}

//                       <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".9rem", lineHeight: 1.88, color: "#1a1a2e" }}>
//                         {hasAmend && <span style={{ color: "#C4882A", marginRight: 5 }}>●</span>}
//                         {section.text}
//                       </p>

//                       {/* ── AMENDMENT BOXES ── */}
//                       {amendments.map((am, i) => {
//                         const st   = STATUS[am.status] || STATUS.Adopted;
//                         const key  = `${section.id}-${i}`;
//                         const open = expandedSections[key];

//                         return (
//                           <div key={i} className={`amend-box ${am.isNew1971 ? "new71" : ""}`}>

//                             {/* ── TOP ROW: label + badges ── */}
//                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
//                               <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", flex: 1 }}>
//                                 <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#92400E" }}>
//                                   {am.label}
//                                 </span>
//                                 {am.isNew1971 && <span className="new-badge">NEW in '71</span>}
//                               </div>
//                               {/* STATUS BADGE — Adopted (green) or Proposed (blue) */}
//                               <span className="badge" style={{ background: st.bg, color: st.color, marginLeft: 8 }}>
//                                 <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
//                                 {am.status}
//                               </span>
//                             </div>

//                             {/* ── SHORT SUMMARY — always visible ── */}
//                             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#374151", lineHeight: 1.65, marginBottom: 8 }}>
//                               {am.shortSummary}
//                             </p>

//                             {/* ── EXPAND BUTTON ── */}
//                             <button
//                               className="expand-btn"
//                               onClick={() => toggleSection(key)}
//                               style={{ color: "#1B3A6B", fontSize: ".75rem", fontWeight: 600, padding: "4px 0", display: "flex", alignItems: "center", gap: 5 }}
//                             >
//                               <span style={{ fontSize: ".65rem" }}>{open ? "▲" : "▼"}</span>
//                               {open ? "Hide full text" : "View full amended text"}
//                             </button>

//                             {/* ── FULL TEXT — only shown when expanded ── */}
//                             {open && (
//                               <div className="full-text-panel">
//                                 <p className="full-text-label">Full Amended Text</p>
//                                 <p className="full-text-body">{am.fullText}</p>
//                               </div>
//                             )}

//                             {/* ── FOOTER LINE ── */}
//                             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".69rem", color: "#9CA3AF", marginTop: 8 }}>
//                               {am.passedDate}
//                             </p>
//                           </div>
//                         );
//                       })}

//                       {hasAmend && (
//                         <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: ".76rem", color: "#9CA3AF", marginTop: 10, textAlign: "center" }}>
//                           — As Amended Through {viewYear} Edition
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}
//             </>
//           )}
//         </main>

//         {/* ── RIGHT: EDITION HISTORY SIDEBAR ── */}
//         <aside style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 6, padding: "15px 14px", position: "sticky", top: 16, maxHeight: "82vh", overflowY: "auto" }}>
//           <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".88rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 11, paddingBottom: 9, borderBottom: "1px solid #E5DDD0" }}>
//             Edition History (Through {viewYear})
//           </h3>

//           {eventsToDate.length === 0 && (
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#9CA3AF", textAlign: "center", padding: "14px 0" }}>
//               Viewing 1968 as adopted.<br />No subsequent editions yet.
//             </p>
//           )}

//           {eventsToDate.map((ev, i) => {
//             const isLast = i === eventsToDate.length - 1;
//             const open   = expandedSections[`ev-${ev.year}`];
//             const st     = STATUS[ev.status] || STATUS.Adopted;
//             return (
//               <div key={ev.year} className="sidebar-row">
//                 {!isLast && <div className="sidebar-line" />}
//                 <div className="sidebar-dot" style={{ background: st.dot, boxShadow: `0 0 0 1px ${st.dot}` }} />
//                 <button className="expand-btn" onClick={() => toggleSection(`ev-${ev.year}`)}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <div>
//                       <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#1B3A6B" }}>{ev.label}</span>
//                       <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#9CA3AF", marginTop: 1 }}>{ev.year}</div>
//                     </div>
//                     <span className="badge" style={{ background: st.bg, color: st.color, marginLeft: 6 }}>
//                       <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
//                       {ev.status}
//                     </span>
//                   </div>
//                   <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#6B7280", marginTop: 4 }}>{ev.sublabel}</div>
//                 </button>
//                 {open && (
//                   <div style={{ marginTop: 7 }}>
//                     {ev.items.map((item, j) => (
//                       <div key={j} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#374151", marginBottom: 4, paddingLeft: 6, borderLeft: "2px solid #E5DDD0", lineHeight: 1.5 }}>
//                         {item}
//                       </div>
//                     ))}
//                     <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#6B7280", marginTop: 5, fontStyle: "italic", lineHeight: 1.55 }}>
//                       {ev.note}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           <div style={{ marginTop: 14, paddingTop: 11, borderTop: "1px solid #E5DDD0" }}>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".66rem", color: "#C9C0AE", lineHeight: 1.6 }}>
//               Source: FSU College of Law Library<br />
//               <em>Florida's Constitutions: The Documentary History</em><br />
//               Data extracted via SQL from 1969 & 1971 PDF editions
//             </p>
//           </div>
//         </aside>
//       </div>

//       {/* ── FOOTER ── */}
//       <footer style={{ borderTop: "1px solid #E5DDD0", padding: "16px 36px", background: "white", marginTop: 20 }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
//           <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#9CA3AF" }}>© 2025 Florida Constitution Project · University of Florida</span>
//           <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#9CA3AF" }}>Privacy Policy · Terms of Use · Site Map</span>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { useState } from "react";
import {
  ARTICLES_1968,
  TIMELINE_YEARS_1968,
  EDITION_EVENTS,
  NEW_IN_1971,
  NEW_IN_1973,
  NEW_IN_1975,
  NEW_IN_1977,
  AMENDMENT_COUNTS,
} from "./data";

const STATUS = {
  Adopted:  { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
  Proposed: { bg: "#DBEAFE", color: "#1E40AF", dot: "#3B82F6" },
  Defeated: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
};

// Badge color per edition
const EDITION_BADGE = {
  "1971 edition": { bg: "#FEF3C7", color: "#92400E", label: "NEW in '71" },
  "1973 edition": { bg: "#EDE9FE", color: "#5B21B6", label: "NEW in '73" },
  "1975 edition": { bg: "#FCE7F3", color: "#9D174D", label: "NEW in '75" },
  "1977 edition": { bg: "#DCFCE7", color: "#166534", label: "NEW in '77" },
};

export default function App() {
  const [viewYear, setViewYear]                 = useState(1968);
  const [activeArticleId, setActiveArticleId]   = useState("art5");
  const [search, setSearch]                     = useState("");
  const [expandedSections, setExpandedSections] = useState({});

  const activeArticle = ARTICLES_1968.find(a => a.id === activeArticleId);

  const visibleAmendments = (section) =>
    section.amendments.filter(a => a.year <= viewYear);

  const searchMatch = (text) =>
    search === "" || text.toLowerCase().includes(search.toLowerCase());

  const toggleSection = (id) =>
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  const eventsToDate = EDITION_EVENTS.filter(e => e.year <= viewYear);

  // Edition years that have actual published PDF editions
  const EDITION_YEARS = {
    1968: "As Adopted",
    1969: "1st Edition",
    1971: "2nd Edition",
    1973: "3rd Edition",
    1975: "4th Edition",
    1977: "5th Edition",
  };

  // Sublabel shown below each dot (only for edition years)
  const timelineLabels = EDITION_YEARS;

  // How many new changes per year (for the dot label)
  const newCountByYear = {
    1971: NEW_IN_1971.length,
    1973: NEW_IN_1973.length,
    1975: NEW_IN_1975.length,
    1977: NEW_IN_1977.length,
  };

  // Find the most recent edition at or before viewYear
  const latestEditionYear = (yr) => {
    const edYears = Object.keys(EDITION_YEARS).map(Number).sort((a, b) => a - b);
    return edYears.filter(y => y <= yr).pop();
  };

  // Status bar description — dynamic for every year
  const editionDescriptionStatic = {
    1968: "As Adopted",
    1969: "1969 Edition — First Printing",
    1971: "Amended through 1971 Edition",
    1973: "Amended through 1973 Edition (Judicial Reorganization)",
    1975: "Amended through 1975 Edition",
    1977: "Amended through 1977 Edition (Merit Retention & Ethics)",
  };
  const editionDescription = editionDescriptionStatic[viewYear]
    || `No new amendments — same as ${latestEditionYear(viewYear)} Edition`;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F8F6F1", minHeight: "100vh", width: "100%", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; background: #F8F6F1; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F8F6F1; } ::-webkit-scrollbar-thumb { background: #C9C0AE; border-radius: 3px; }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .87rem; color: rgba(255,255,255,.85); font-weight: 600; padding: 4px 0; transition: color .15s; }
        .nav-btn:hover { color: #C4882A; }
        .toc-btn { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 7px 10px; font-family: 'Source Sans 3', sans-serif; font-size: .79rem; color: #374151; border-radius: 4px; transition: background .12s; display: flex; justify-content: space-between; align-items: center; }
        .toc-btn:hover { background: #EEE9DF; }
        .toc-btn.active { background: #1B3A6B; color: white; }
        .section-card { background: white; border: 1px solid #E5DDD0; border-radius: 6px; padding: 20px 22px; margin-bottom: 14px; }
        .section-card.amended { border-left: 3px solid #C4882A; }
        .amend-box { background: #FFFBF5; border: 1px solid #F0D8AA; border-radius: 5px; padding: 12px 14px; margin-top: 12px; }
        .amend-box.new71 { border-left: 3px solid #C4882A; }
        .amend-box.new73 { border-left: 3px solid #7C3AED; }
        .amend-box.new75 { border-left: 3px solid #DB2777; }
        .amend-box.new77 { border-left: 3px solid #16A34A; }
        .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-family: 'Source Sans 3', sans-serif; font-size: .68rem; font-weight: 700; flex-shrink: 0; }
        .new-badge { padding: 2px 8px; border-radius: 20px; font-size: .65rem; font-weight: 700; white-space: nowrap; border: 1px solid; }
        .search-input { width: 100%; padding: 7px 10px; border: 1px solid #C9C0AE; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-size: .82rem; background: white; outline: none; }
        .search-input:focus { border-color: #1B3A6B; }
        .search-input::placeholder { color: #bbb; }
        .year-dot { width: 12px; height: 12px; border-radius: 50%; cursor: pointer; border: 2px solid white; transition: transform .15s; flex-shrink: 0; }
        .year-dot:hover { transform: scale(1.4); }
        .expand-btn { background: none; border: none; cursor: pointer; text-align: left; width: 100%; padding: 0; font-family: 'Source Sans 3', sans-serif; }
        .sidebar-row { position: relative; padding-left: 18px; padding-bottom: 14px; }
        .sidebar-dot { position: absolute; left: 0; top: 3px; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; }
        .sidebar-line { position: absolute; left: 4px; top: 12px; bottom: 0; width: 2px; background: #E5DDD0; }
        .full-text-panel { background: #F8F6F1; border: 1px solid #E5DDD0; border-radius: 4px; padding: 12px 14px; margin-top: 10px; }
        .full-text-label { font-family: 'Source Sans 3', sans-serif; font-size: .68rem; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
        .full-text-body { font-family: 'Libre Baskerville', serif; font-size: .85rem; line-height: 1.85; color: #1a1a2e; white-space: pre-wrap; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ background: "#1B3A6B", borderBottom: "3px solid #C4882A", padding: "0 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ fontSize: "1.4rem" }}>⚖</span>
            <div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.05rem", fontWeight: 700, color: "white" }}>Florida Constitution</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.58rem", color: "rgba(255,255,255,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>Historical Archive · FSU Law Library</div>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["Home", "The Constitutions", "Research Guides", "About"].map(n => (
              <button key={n} className="nav-btn" style={{ color: n === "The Constitutions" ? "#C4882A" : undefined, borderBottom: n === "The Constitutions" ? "2px solid #C4882A" : "2px solid transparent", paddingBottom: 2 }}>{n}</button>
            ))}
            <button style={{ background: "#C4882A", color: "white", border: "none", padding: "6px 16px", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, fontSize: ".84rem", cursor: "pointer" }}>Search</button>
          </nav>
        </div>
      </header>

      {/* ── TIMELINE ── */}
      <div style={{ background: "white", borderBottom: "1px solid #E5DDD0", padding: "14px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ fontSize: ".7rem", fontFamily: "'Source Sans 3', sans-serif", color: "#9CA3AF", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>
            Constitution of 1968 — PDF Edition Timeline
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 6, right: 6, height: 2, background: "#D1D5DB", top: "50%", transform: "translateY(-50%)", zIndex: 0 }} />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
              {TIMELINE_YEARS_1968.map(yr => {
                const isActive = yr === viewYear;
                const isPast   = yr < viewYear;
                const newCount = newCountByYear[yr];
                return (
                  <div key={yr} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }} onClick={() => setViewYear(yr)}>
                    <div className="year-dot" style={{ background: isActive ? "#C4882A" : isPast ? "#1B3A6B" : "#D1D5DB", boxShadow: isActive ? "0 0 0 3px #C4882A44" : "none", transform: isActive ? "scale(1.4)" : "scale(1)" }} />
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", fontWeight: isActive ? 700 : 400, color: isActive ? "#C4882A" : "#6B7280" }}>{yr}</span>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".62rem", color: "#9CA3AF" }}>{timelineLabels[yr]}</span>
                    {newCount && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".58rem", color: "#C4882A", fontWeight: 700 }}>{newCount} new</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── DATE BAR ── */}
      <div style={{ background: "#F0EBE1", borderBottom: "1px solid #E5DDD0", padding: "9px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "#374151" }}>Viewing edition:</span>
            <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", fontWeight: 700, color: "#1B3A6B" }}>{viewYear}</span>
          </div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))} style={{ padding: "5px 9px", border: "1px solid #C9C0AE", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", background: "white" }}>
              {TIMELINE_YEARS_1968.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <button style={{ padding: "5px 14px", background: "#1B3A6B", color: "white", border: "none", borderRadius: 4, fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", cursor: "pointer" }}>Update</button>
            <button style={{ padding: "5px 12px", border: "1px solid #C9C0AE", borderRadius: 4, background: "white", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".77rem", color: "#374151", cursor: "pointer" }}>⬇ PDF</button>
            <button style={{ padding: "5px 12px", border: "1px solid #C9C0AE", borderRadius: 4, background: "white", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".77rem", color: "#374151", cursor: "pointer" }}>🖨 Print</button>
          </div>
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div style={{ background: "#1B3A6B", padding: "6px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "rgba(255,255,255,.9)", fontWeight: 600 }}>
            Now Displaying: Constitution of 1968 — {editionDescription}
          </span>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "rgba(255,255,255,.45)" }}>
            Source: FSU College of Law Library · PDF editions extracted via SQL
          </span>
        </div>
      </div>

      {/* ── THREE-PANEL LAYOUT ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 36px", display: "grid", gridTemplateColumns: "230px 1fr 270px", gap: 22, alignItems: "start" }}>

        {/* ── LEFT: TABLE OF CONTENTS ── */}
        <aside style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 6, padding: "15px 12px", position: "sticky", top: 16 }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".88rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 11, paddingBottom: 9, borderBottom: "1px solid #E5DDD0" }}>
            Table of Contents
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {ARTICLES_1968.map(a => {
              const amendedCount = a.sections.filter(s => visibleAmendments(s).length > 0).length;
              return (
                <button key={a.id} className={`toc-btn ${activeArticleId === a.id ? "active" : ""}`} onClick={() => setActiveArticleId(a.id)}>
                  <span>{a.title}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {amendedCount > 0 && (
                      <span style={{ background: "#C4882A", color: "white", borderRadius: "50%", width: 16, height: 16, fontSize: ".6rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                        {amendedCount}
                      </span>
                    )}
                    <span style={{ opacity: .45, fontSize: ".73rem" }}>›</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div style={{ marginTop: 16, paddingTop: 13, borderTop: "1px solid #E5DDD0" }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Search Document</p>
            <div style={{ display: "flex", gap: 5 }}>
              <input className="search-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
              <button style={{ background: "#1B3A6B", color: "white", border: "none", borderRadius: 4, padding: "0 8px", cursor: "pointer", fontSize: ".88rem" }}>⌕</button>
            </div>
          </div>

          {/* Amendment count mini chart */}
          <div style={{ marginTop: 16, paddingTop: 13, borderTop: "1px solid #E5DDD0" }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Amendments by Article</p>
            {AMENDMENT_COUNTS.map(ac => (
              <div key={ac.article_number} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#374151" }}>Art. {ac.article_number}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: `${ac.total_amendments * 8}px`, height: 6, background: "#1B3A6B", borderRadius: 3 }} />
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#9CA3AF" }}>{ac.total_amendments}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Edition legend */}
          <div style={{ marginTop: 16, paddingTop: 13, borderTop: "1px solid #E5DDD0" }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Edition Key</p>
            {Object.entries(EDITION_BADGE).map(([key, val]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <span className="new-badge" style={{ background: val.bg, color: val.color, borderColor: val.color + "55" }}>{val.label}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#9CA3AF" }}>{key.replace(" edition","")}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── CENTER: CONSTITUTION TEXT ── */}
        <main>
          <div style={{ background: "linear-gradient(to bottom, #F0EBE1, #E8E0D2)", border: "1px solid #C9C0AE", borderRadius: 6, padding: "18px 20px", textAlign: "center", marginBottom: 16 }}>
            <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.18rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 4 }}>
              Constitution of the State of Florida
            </h1>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#6B7280", letterSpacing: ".1em", textTransform: "uppercase" }}>
              AS REVISED IN 1968 AND SUBSEQUENTLY AMENDED
            </p>
            {viewYear > 1968 && (
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#C4882A", marginTop: 6, fontWeight: 600 }}>
                {viewYear === 1969 && "Showing 1969 edition — first printing"}
                {viewYear === 1971 && `Showing 1971 edition — includes ${NEW_IN_1971.length} new changes`}
                {viewYear === 1973 && `Showing 1973 edition — includes ${NEW_IN_1973.length} new changes (Judicial Reorganization)`}
                {viewYear === 1975 && `Showing 1975 edition — includes ${NEW_IN_1975.length} new changes`}
                {viewYear === 1977 && `Showing 1977 edition — includes ${NEW_IN_1977.length} new changes (Merit Retention & Ethics)`}
              </p>
            )}
          </div>

          {activeArticle && (
            <>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.12rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 14 }}>
                {activeArticle.title}
              </h2>
              {activeArticle.sections
                .filter(s => searchMatch(s.text) || searchMatch(s.number || ""))
                .map(section => {
                  const amendments = visibleAmendments(section);
                  const hasAmend   = amendments.length > 0;
                  return (
                    <div key={section.id} className={`section-card ${hasAmend ? "amended" : ""}`}>
                      {section.number && (
                        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".92rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 9 }}>
                          {section.number}
                        </h3>
                      )}
                      <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".9rem", lineHeight: 1.88, color: "#1a1a2e" }}>
                        {hasAmend && <span style={{ color: "#C4882A", marginRight: 5 }}>●</span>}
                        {section.text}
                      </p>

                      {/* ── AMENDMENT BOXES ── */}
                      {amendments.map((am, i) => {
                        const st       = STATUS[am.status] || STATUS.Adopted;
                        const key      = `${section.id}-${i}`;
                        const open     = expandedSections[key];
                        const edBadge  = EDITION_BADGE[am.pdfSource];
                        const boxClass = am.isNew1977 ? "new77" : am.isNew1975 ? "new75" : am.isNew1973 ? "new73" : am.isNew1971 ? "new71" : "";
                        return (
                          <div key={i} className={`amend-box ${boxClass}`}>
                            {/* TOP ROW */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", flex: 1 }}>
                                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#92400E" }}>
                                  {am.label}
                                </span>
                                {am.effectiveDate && (
                                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#6B7280", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 3, padding: "1px 6px", whiteSpace: "nowrap" }}>
                                    Eff. {am.effectiveDate}
                                  </span>
                                )}
                                {edBadge && (
                                  <span className="new-badge" style={{ background: edBadge.bg, color: edBadge.color, borderColor: edBadge.color + "55" }}>
                                    {edBadge.label}
                                  </span>
                                )}
                              </div>
                              <span className="badge" style={{ background: st.bg, color: st.color, marginLeft: 8 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
                                {am.status}
                              </span>
                            </div>

                            {/* SHORT SUMMARY */}
                            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#374151", lineHeight: 1.65, marginBottom: 8 }}>
                              {am.shortSummary}
                            </p>

                            {/* EXPAND BUTTON */}
                            <button
                              className="expand-btn"
                              onClick={() => toggleSection(key)}
                              style={{ color: "#1B3A6B", fontSize: ".75rem", fontWeight: 600, padding: "4px 0", display: "flex", alignItems: "center", gap: 5 }}
                            >
                              <span style={{ fontSize: ".65rem" }}>{open ? "▲" : "▼"}</span>
                              {open ? "Hide full text" : "View full amended text"}
                            </button>

                            {/* FULL TEXT */}
                            {open && (
                              <div className="full-text-panel">
                                <p className="full-text-label">Full Amended Text</p>
                                <p className="full-text-body">{am.fullText}</p>
                              </div>
                            )}

                            {/* FOOTER */}
                            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".69rem", color: "#9CA3AF", marginTop: 8 }}>
                              {am.passedDate}
                            </p>
                          </div>
                        );
                      })}

                      {hasAmend && (
                        <p style={{ fontFamily: "'Libre Baskerville', serif", fontStyle: "italic", fontSize: ".76rem", color: "#9CA3AF", marginTop: 10, textAlign: "center" }}>
                          — As Amended Through {viewYear} Edition
                        </p>
                      )}
                    </div>
                  );
                })}
            </>
          )}
        </main>

        {/* ── RIGHT: EDITION HISTORY SIDEBAR ── */}
        <aside style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 6, padding: "15px 14px", position: "sticky", top: 16, maxHeight: "82vh", overflowY: "auto" }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".88rem", fontWeight: 700, color: "#1B3A6B", marginBottom: 11, paddingBottom: 9, borderBottom: "1px solid #E5DDD0" }}>
            Edition History (Through {viewYear})
          </h3>
          {eventsToDate.length === 0 && (
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#9CA3AF", textAlign: "center", padding: "14px 0" }}>
              Viewing 1968 as adopted.<br />No subsequent editions yet.
            </p>
          )}
          {eventsToDate.map((ev, i) => {
            const isLast = i === eventsToDate.length - 1;
            const open   = expandedSections[`ev-${ev.year}`];
            const st     = STATUS[ev.status] || STATUS.Adopted;
            return (
              <div key={ev.year} className="sidebar-row">
                {!isLast && <div className="sidebar-line" />}
                <div className="sidebar-dot" style={{ background: st.dot, boxShadow: `0 0 0 1px ${st.dot}` }} />
                <button className="expand-btn" onClick={() => toggleSection(`ev-${ev.year}`)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#1B3A6B" }}>{ev.label}</span>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#9CA3AF", marginTop: 1 }}>{ev.dateRange}</div>
                    </div>
                    <span className="badge" style={{ background: st.bg, color: st.color, marginLeft: 6 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                      {ev.status}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#6B7280", marginTop: 4 }}>{ev.sublabel}</div>
                </button>
                {open && (
                  <div style={{ marginTop: 7 }}>
                    {ev.items.map((item, j) => (
                      <div key={j} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#374151", marginBottom: 4, paddingLeft: 6, borderLeft: "2px solid #E5DDD0", lineHeight: 1.5 }}>
                        {item}
                      </div>
                    ))}
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".68rem", color: "#6B7280", marginTop: 5, fontStyle: "italic", lineHeight: 1.55 }}>
                      {ev.note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ marginTop: 14, paddingTop: 11, borderTop: "1px solid #E5DDD0" }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".66rem", color: "#C9C0AE", lineHeight: 1.6 }}>
              Source: FSU College of Law Library<br />
              <em>Florida's Constitutions: The Documentary History</em><br />
              Data extracted from 1969–1977 PDF editions
            </p>
          </div>
        </aside>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #E5DDD0", padding: "16px 36px", background: "white", marginTop: 20 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#9CA3AF" }}>© 2025 Florida Constitution Project · University of Florida</span>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#9CA3AF" }}>Privacy Policy · Terms of Use · Site Map</span>
        </div>
      </footer>
    </div>
  );
}