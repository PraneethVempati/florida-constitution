// import { useState } from "react";
// import { findVersionForDate, CONSTITUTION_VERSIONS } from "./constitutionTexts";

// // ─────────────────────────────────────────────────────────────────────────────
// // All data sourced directly from "Constitution Timeline.docx"
// // ─────────────────────────────────────────────────────────────────────────────
// const VERSION_DETAILS = [
//   {
//     id: "001",
//     title: "1969 Constitution",
//     startDate: "January 7, 1969",
//     endDate: "January 4, 1971",
//     startISO: "1969-01-07",
//     endISO: "1971-01-04",
//     description: "New Constitution Formed, no electoral changes.",
//     amendments: [],
//     notes: "",
//   },
//   {
//     id: "002",
//     title: "1971 Constitution (1970 Election)",
//     startDate: "January 5, 1971",
//     endDate: "November 1, 1971",
//     startISO: "1971-01-05",
//     endISO: "1971-11-01",
//     description: "Only reflects the changes in the election of 1970.",
//     amendments: [
//       "HJR 3853 and HJR 4040",
//       "HJR 792",
//     ],
//     notes: "",
//   },
//   {
//     id: "003",
//     title: "1971 Constitution (1970 and 1971 Special Election)",
//     startDate: "November 2, 1971",
//     endDate: "March 13, 1972",
//     startISO: "1971-11-02",
//     endISO: "1972-03-13",
//     description: "Adds the change from HJR 7B.",
//     amendments: [
//       "HJR 7B",
//     ],
//     notes: "This is the constitution published in Florida Statutes for the year of 1971.",
//   },
//   {
//     id: "004",
//     title: "1971 Constitution (1972 Special Election Change)",
//     startDate: "March 14, 1972",
//     endDate: "January 1, 1973",
//     startISO: "1972-03-14",
//     endISO: "1973-01-01",
//     description: "Adds 1971 HJR 46-D.",
//     amendments: [
//       "HJR 46-D (1971)",
//     ],
//     notes: "",
//   },
//   {
//     id: "005",
//     title: "1973 Constitution (1972 Special and General Election)",
//     startDate: "January 2, 1973",
//     endDate: "January 4, 1975",
//     startISO: "1973-01-02",
//     endISO: "1975-01-04",
//     description:
//       "Adds 1971 SJR 52-D, which has an effective date of January 1, 1973, and revises Article V of the constitution.",
//     amendments: [
//       "SJR 52-D (1971, effective January 1, 1973) — revises Article V",
//       "HJR 2835",
//       "HJR 4324",
//       "HJR 3576",
//       "SJR 292",
//     ],
//     notes: "",
//   },
//   {
//     id: "006",
//     title: "1975 Constitution (Without July Amendment)",
//     startDate: "January 5, 1975",
//     endDate: "June 30, 1975",
//     startISO: "1975-01-05",
//     endISO: "1975-06-30",
//     description: "Adds the following changes from the general election of 1974.",
//     amendments: [
//       "HJR 637 (1974)",
//       "HJR 1907 (1974)",
//       "HJR 1424 (1974)",
//       "SJR 917 (1974)",
//       "HJR 3911",
//     ],
//     notes: "",
//   },
//   {
//     id: "007",
//     title: "1975 Constitution (All Amendments Included)",
//     startDate: "July 1, 1975",
//     endDate: "March 8, 1976",
//     startISO: "1975-07-01",
//     endISO: "1976-03-08",
//     description:
//       "HJR 2289 and HJR 2984 take effect on July 1, 1975. All measures ratified in 1975 are reflected in this constitution.",
//     amendments: [
//       "HJR 2289 (effective July 1, 1975)",
//       "HJR 2984 (effective July 1, 1975)",
//     ],
//     notes: "All measures ratified in 1975 are reflected in this constitution.",
//   },
//   {
//     id: "008",
//     title: "1977 Constitution (Special Election Only)",
//     startDate: "March 9, 1976",
//     endDate: "January 3, 1977",
//     startISO: "1976-03-09",
//     endISO: "1977-01-03",
//     description: "This version adds 1975 SJR 1061, adopted in 1976.",
//     amendments: [
//       "SJR 1061 (1975, adopted in 1976)",
//     ],
//     notes: "",
//   },
//   {
//     id: "009",
//     title: "1977 Constitution (All Amendments Included)",
//     startDate: "January 4, 1977",
//     endDate: "April 1, 1980",
//     startISO: "1977-01-04",
//     endISO: "1980-04-01",
//     description:
//       "Nothing passed in the 1978 election; therefore the 1977 and 1979 constitutions are identical.",
//     amendments: [
//       "SJR 1061",
//       "HJR 1709",
//       "HJR 291",
//       "SJR 49 and SJR 81",
//       "Public Disclosure Initiative (citizen initiative)",
//     ],
//     notes: "The 1977 and 1979 constitutions are identical, as nothing passed in the 1978 election.",
//   },
// ];

// const GENERAL_RULE =
//   "Florida constitutional amendments approved by voters take effect on the first Tuesday after the first Monday in January following the November general election, unless the amendment specifies a different effective date.";

// const MONTHS = [
//   "January","February","March","April","May","June",
//   "July","August","September","October","November","December",
// ];

// const PRIMARY = "#1B3A6B";
// const GOLD    = "#C4882A";
// const CREAM   = "#F8F6F1";

// // ─────────────────────────────────────────────────────────────────────────────
// // Shared styles injected once
// // ─────────────────────────────────────────────────────────────────────────────
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   html, body, #root { width: 100%; min-height: 100vh; background: ${CREAM}; }
//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: ${CREAM}; }
//   ::-webkit-scrollbar-thumb { background: #C9C0AE; border-radius: 3px; }

//   .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; color: rgba(255,255,255,.85); font-weight: 600; padding: 4px 0; transition: color .15s; }
//   .nav-btn:hover { color: ${GOLD}; }
//   .nav-btn.active { color: ${GOLD}; border-bottom: 2px solid ${GOLD}; padding-bottom: 2px; }

//   .contact-btn { background: ${PRIMARY}; color: white; border: 1px solid rgba(255,255,255,.3); padding: 7px 18px; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; font-size: .84rem; cursor: pointer; }

//   .select-input { padding: 7px 10px; border: 1px solid #C9C0AE; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-size: .9rem; background: white; outline: none; color: #1a1a2e; }
//   .select-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 2px #1B3A6B22; }

//   .view-btn { background: ${PRIMARY}; color: white; border: none; padding: 9px 22px; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-weight: 700; font-size: .9rem; cursor: pointer; transition: background .15s; white-space: nowrap; }
//   .view-btn:hover { background: #152e55; }

//   .version-card { background: white; border: 1px solid #E5DDD0; border-radius: 8px; padding: 20px 24px; transition: box-shadow .15s, border-color .15s; }
//   .version-card:hover { box-shadow: 0 4px 16px rgba(27,58,107,.12); border-color: #C9C0AE; }

//   .amend-tag { display: inline-block; background: #EEF2FF; color: #3730A3; border: 1px solid #C7D2FE; border-radius: 4px; padding: 3px 10px; font-family: 'Source Sans 3', sans-serif; font-size: .76rem; font-weight: 600; }

//   .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; color: #374151; cursor: pointer; border-radius: 4px; background: none; border: none; width: 100%; text-align: left; transition: background .12s; }
//   .sidebar-link:hover { background: #EEE9DF; color: ${PRIMARY}; }

//   .search-input { width: 100%; padding: 8px 12px; border: 1px solid #C9C0AE; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; background: white; outline: none; }
//   .search-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 2px #1B3A6B22; }
//   .search-input::placeholder { color: #bbb; }

//   .para-heading  { font-family: 'Libre Baskerville', serif; font-size: .95rem; font-weight: 700; color: ${PRIMARY}; margin-bottom: 6px; margin-top: 22px; letter-spacing: .04em; }
//   .para-subhead  { font-family: 'Libre Baskerville', serif; font-size: .88rem; font-weight: 700; color: #374151; margin-bottom: 4px; margin-top: 14px; }
//   .para-body     { font-family: 'Libre Baskerville', serif; font-size: .91rem; line-height: 1.9; color: #1a1a2e; margin-bottom: 2px; }
//   .para-empty    { height: 8px; }
// `;

// // ─────────────────────────────────────────────────────────────────────────────
// // Shared Header
// // ─────────────────────────────────────────────────────────────────────────────
// function Header({ onHome }) {
//   return (
//     <header style={{ background: PRIMARY, borderBottom: `3px solid ${GOLD}`, padding: "0 40px" }}>
//       <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
//         <button
//           onClick={onHome}
//           style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}
//         >
//           <svg width="30" height="38" viewBox="0 0 60 80" fill="white" opacity="0.9">
//             <path d="M30 2 C12 2 2 18 2 34 C2 52 14 64 22 72 C25 75 28 78 30 80 C32 78 35 75 38 72 C46 64 58 52 58 34 C58 18 48 2 30 2 Z"/>
//           </svg>
//           <div style={{ textAlign: "left" }}>
//             <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.1rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
//               Florida Constitution
//             </div>
//             <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".6rem", color: "rgba(255,255,255,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>
//               Historical Archive
//             </div>
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
//     <footer style={{ borderTop: "1px solid #E5DDD0", padding: "16px 40px", background: "white", marginTop: 40 }}>
//       <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem", color: "#9CA3AF" }}>
//           © 2024 Organization Name
//         </span>
//         <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem", color: "#9CA3AF" }}>
//           Privacy Policy &nbsp;|&nbsp; Terms of Use &nbsp;|&nbsp; Site Map
//         </span>
//       </div>
//     </footer>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Landing Page
// // ─────────────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [selectedMonth, setSelectedMonth] = useState(1);
//   const [selectedDay,   setSelectedDay]   = useState(7);
//   const [selectedYear,  setSelectedYear]  = useState(1969);
//   const [viewedVersion, setViewedVersion] = useState(null);
//   const [errorMsg,      setErrorMsg]      = useState("");

//   function handleViewConstitution() {
//     const version = findVersionForDate(selectedYear, selectedMonth, selectedDay);
//     if (version) {
//       setViewedVersion(version);
//       setErrorMsg("");
//     } else {
//       setErrorMsg(
//         `No constitution data found for ${MONTHS[selectedMonth - 1]} ${selectedDay}, ${selectedYear}. ` +
//         `Available data covers January 7, 1969 through April 1, 1980.`
//       );
//     }
//   }

//   function openVersion(id) {
//     const version = CONSTITUTION_VERSIONS.find(v => v.id === id);
//     if (version) { setViewedVersion(version); setErrorMsg(""); }
//   }

//   if (viewedVersion) {
//     return (
//       <ConstitutionView
//         version={viewedVersion}
//         onBack={() => setViewedVersion(null)}
//         onOpenVersion={openVersion}
//       />
//     );
//   }

//   return (
//     <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh", color: "#1a1a2e" }}>
//       <style>{GLOBAL_CSS}</style>
//       <Header onHome={() => {}} />

//       <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 40px", display: "grid", gridTemplateColumns: "210px 1fr", gap: 36 }}>

//         {/* ── LEFT SIDEBAR ── */}
//         <aside>
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, overflow: "hidden" }}>
//             <button className="sidebar-link">
//               <span style={{ fontSize: "1.1rem", color: PRIMARY }}>≡</span>
//               History of the Constitutions
//             </button>
//             <div style={{ height: 1, background: "#F0EBE1" }} />
//             <button className="sidebar-link">
//               <span style={{ fontSize: "1rem", color: PRIMARY }}>⊞</span>
//               Timeline of Amendments
//             </button>
//             <div style={{ height: 1, background: "#F0EBE1" }} />
//             <button className="sidebar-link">
//               <span style={{ fontSize: "1rem", color: PRIMARY }}>📄</span>
//               Resources
//             </button>
//           </div>
//         </aside>

//         {/* ── MAIN CONTENT ── */}
//         <main>

//           {/* Title */}
//           <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.7rem", fontWeight: 700, color: PRIMARY, marginBottom: 10 }}>
//             Explore the Florida Constitution Through History
//           </h1>
//           <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".97rem", color: "#374151", marginBottom: 28, lineHeight: 1.65 }}>
//             Enter a date below to view the Florida Constitution as it existed at that point in time.
//           </p>

//           {/* ── DATE PICKER ── */}
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 10, padding: "22px 28px", marginBottom: 10, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap", boxShadow: "0 2px 8px rgba(27,58,107,.07)" }}>
//             <select className="select-input" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
//               {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
//             </select>
//             <select className="select-input" style={{ width: 72 }} value={selectedDay} onChange={e => setSelectedDay(Number(e.target.value))}>
//               {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
//             </select>
//             <input
//               type="number"
//               className="select-input"
//               style={{ width: 95 }}
//               value={selectedYear}
//               min={1969} max={1980}
//               onChange={e => setSelectedYear(Number(e.target.value))}
//             />
//             <button className="view-btn" onClick={handleViewConstitution}>
//               View Constitution
//             </button>
//           </div>

//           {errorMsg && (
//             <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "11px 16px", marginBottom: 20, fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "#991B1B" }}>
//               {errorMsg}
//             </div>
//           )}

//           {/* ── DATA RANGE NOTE ── */}
//           <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#6B7280", marginBottom: 36, marginTop: 10 }}>
//             Data available from <strong>January 7, 1969</strong> through <strong>April 1, 1980</strong>.
//           </p>

//           {/* ── ALL VERSIONS TIMELINE ── */}
//           <div style={{ marginBottom: 40 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
//               <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY }}>
//                 Constitution Versions
//               </h2>
//               <div style={{ flex: 1, height: 1, background: "#E5DDD0" }} />
//               <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#9CA3AF", whiteSpace: "nowrap" }}>
//                 9 versions · 1969 – 1980
//               </span>
//             </div>

//             {/* Version cards */}
//             <div style={{ position: "relative" }}>
//               {/* Vertical timeline line */}
//               <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "#E5DDD0", zIndex: 0 }} />

//               <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//                 {VERSION_DETAILS.map((v) => (
//                   <div key={v.id} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
//                     {/* Dot + connector */}
//                     <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
//                       <div style={{
//                         width: 40, height: 40, borderRadius: "50%",
//                         background: PRIMARY, color: "white",
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", fontWeight: 700,
//                         border: `3px solid ${CREAM}`,
//                         boxShadow: "0 2px 6px rgba(27,58,107,.25)",
//                         flexShrink: 0,
//                       }}>
//                         {v.id}
//                       </div>
//                     </div>

//                     {/* Card */}
//                     <div className="version-card" style={{ flex: 1 }}>
//                       {/* Header row */}
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
//                         <div>
//                           <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", fontWeight: 700, color: PRIMARY, marginBottom: 4 }}>
//                             {v.title}
//                           </h3>
//                           {/* Date range — very prominent */}
//                           <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 5, padding: "5px 12px" }}>
//                             <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".76rem", fontWeight: 700, color: "#1E40AF", textTransform: "uppercase", letterSpacing: ".06em" }}>
//                               Effective Dates
//                             </span>
//                             <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", fontWeight: 700, color: PRIMARY }}>
//                               {v.startDate} — {v.endDate}
//                             </span>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => openVersion(v.id)}
//                           style={{
//                             background: PRIMARY, color: "white", border: "none",
//                             padding: "7px 16px", borderRadius: 5,
//                             fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, fontSize: ".82rem",
//                             cursor: "pointer", whiteSpace: "nowrap",
//                             transition: "background .15s",
//                           }}
//                           onMouseOver={e => e.currentTarget.style.background = "#152e55"}
//                           onMouseOut={e => e.currentTarget.style.background = PRIMARY}
//                         >
//                           View Text →
//                         </button>
//                       </div>

//                       {/* Description */}
//                       <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: "#374151", lineHeight: 1.65, marginBottom: v.amendments.length > 0 || v.notes ? 12 : 0 }}>
//                         {v.description}
//                       </p>

//                       {/* Amendments */}
//                       {v.amendments.length > 0 && (
//                         <div style={{ marginBottom: v.notes ? 10 : 0 }}>
//                           <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".73rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>
//                             Legislative Measures Incorporated
//                           </p>
//                           <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                             {v.amendments.map((a, i) => (
//                               <span key={i} className="amend-tag">{a}</span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Notes */}
//                       {v.notes && (
//                         <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 5, padding: "8px 12px", marginTop: 4 }}>
//                           <span style={{ fontSize: ".9rem", flexShrink: 0, marginTop: 1 }}>ℹ</span>
//                           <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#92400E", lineHeight: 1.6 }}>
//                             {v.notes}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── GENERAL RULE ── */}
//           <div style={{ background: "#F0F4FF", border: "1px solid #C7D2FE", borderRadius: 8, padding: "16px 20px", marginBottom: 40, display: "flex", gap: 12, alignItems: "flex-start" }}>
//             <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".73rem", fontWeight: 700, color: "#3730A3", textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap", paddingTop: 2 }}>
//               General Rule
//             </span>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: "#1E1B4B", lineHeight: 1.7 }}>
//               {GENERAL_RULE}
//             </p>
//           </div>

//           {/* ── ABOUT ── */}
//           <div style={{ borderTop: `3px solid ${PRIMARY}`, paddingTop: 24 }}>
//             <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY, marginBottom: 12 }}>
//               About This Website
//             </h2>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".93rem", color: "#374151", lineHeight: 1.8 }}>
//               The Florida Constitutional History Database provides public access to the evolution of{" "}
//               <strong>Florida&apos;s Constitution</strong> across time. This platform allows users to view the
//               Constitution as it existed on any given date and to explore the legislative and electoral
//               history behind constitutional change. The data presented here covers the 1968 revision of
//               the Florida Constitution and all subsequent amendments through 1979.
//             </p>
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Constitution Text View
// // ─────────────────────────────────────────────────────────────────────────────
// function ConstitutionView({ version, onBack, onOpenVersion }) {
//   const [search, setSearch] = useState("");

//   const meta = VERSION_DETAILS.find(v => v.id === version.id);
//   const paragraphs = version.text.split("\n");

//   const filtered = search.trim()
//     ? paragraphs.filter(p => p.toLowerCase().includes(search.toLowerCase()))
//     : paragraphs;

//   return (
//     <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh", color: "#1a1a2e" }}>
//       <style>{GLOBAL_CSS}</style>
//       <Header onHome={onBack} />

//       {/* ── VERSION BANNER ── */}
//       <div style={{ background: "white", borderBottom: "1px solid #E5DDD0" }}>
//         <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 40px" }}>

//           {/* Back link */}
//           <button
//             onClick={onBack}
//             style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#6B7280", marginBottom: 14, display: "flex", alignItems: "center", gap: 5, padding: 0 }}
//           >
//             ← Back to Date Search
//           </button>

//           {/* Version identity row */}
//           <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
//                 <span style={{
//                   background: PRIMARY, color: "white", borderRadius: 5,
//                   padding: "3px 10px", fontFamily: "'Source Sans 3', sans-serif",
//                   fontSize: ".75rem", fontWeight: 700, letterSpacing: ".06em"
//                 }}>
//                   VERSION {meta?.id}
//                 </span>
//               </div>
//               <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.35rem", fontWeight: 700, color: PRIMARY, marginBottom: 8 }}>
//                 {meta?.title}
//               </h1>
//               {/* Effective date — large and clear */}
//               <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, padding: "7px 16px" }}>
//                 <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".76rem", fontWeight: 700, color: "#1E40AF", textTransform: "uppercase", letterSpacing: ".08em" }}>
//                   Effective Dates
//                 </span>
//                 <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem", fontWeight: 700, color: PRIMARY }}>
//                   {meta?.startDate} — {meta?.endDate}
//                 </span>
//               </div>
//             </div>

//             {/* Amendments in banner */}
//             {meta?.amendments.length > 0 && (
//               <div style={{ maxWidth: 460 }}>
//                 <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>
//                   Legislative Measures in This Version
//                 </p>
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                   {meta.amendments.map((a, i) => (
//                     <span key={i} className="amend-tag">{a}</span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           {meta?.description && (
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", color: "#374151", lineHeight: 1.65, marginTop: 14 }}>
//               {meta.description}
//             </p>
//           )}

//           {/* Notes */}
//           {meta?.notes && (
//             <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 5, padding: "9px 14px", marginTop: 12 }}>
//               <span style={{ fontSize: ".9rem", flexShrink: 0, marginTop: 1 }}>ℹ</span>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".84rem", color: "#92400E", lineHeight: 1.6 }}>
//                 {meta.notes}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── THREE COLUMN LAYOUT ── */}
//       <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px", display: "grid", gridTemplateColumns: "220px 1fr 200px", gap: 28, alignItems: "start" }}>

//         {/* ── LEFT: SEARCH + VERSION LIST ── */}
//         <aside style={{ position: "sticky", top: 16 }}>
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px 14px", marginBottom: 16 }}>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
//               Search Text
//             </p>
//             <input
//               className="search-input"
//               placeholder="Search constitution..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             {search && (
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#9CA3AF", marginTop: 6 }}>
//                 {filtered.filter(p => p.trim()).length} matching lines
//               </p>
//             )}
//           </div>

//           {/* All versions list */}
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px 12px" }}>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>
//               All Versions
//             </p>
//             {VERSION_DETAILS.map(v => (
//               <button
//                 key={v.id}
//                 onClick={() => onOpenVersion(v.id)}
//                 style={{
//                   display: "block", width: "100%", textAlign: "left",
//                   background: v.id === version.id ? PRIMARY : "none",
//                   color: v.id === version.id ? "white" : "#374151",
//                   border: "none", borderRadius: 5, padding: "7px 10px", cursor: "pointer",
//                   fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem",
//                   marginBottom: 3, lineHeight: 1.45,
//                   fontWeight: v.id === version.id ? 700 : 400,
//                   transition: "background .1s",
//                 }}
//               >
//                 <span style={{ opacity: .6, marginRight: 5 }}>{v.id}</span>
//                 {v.title}
//               </button>
//             ))}
//           </div>
//         </aside>

//         {/* ── CENTER: CONSTITUTION TEXT ── */}
//         <main style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "36px 44px", minHeight: 600 }}>
//           {filtered.length === 0 && search && (
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", color: "#9CA3AF", textAlign: "center", padding: "60px 0" }}>
//               No results found for &ldquo;{search}&rdquo;
//             </p>
//           )}
//           {filtered.map((line, i) => {
//             const trimmed = line.trim();
//             if (!trimmed) return <div key={i} className="para-empty" />;
//             const allCaps = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
//             const isMainHead = allCaps && (trimmed.startsWith("ARTICLE") || trimmed.startsWith("PREAMBLE") || trimmed === "CONSTITUTION OF THE STATE OF FLORIDA");
//             const isSectionHead = allCaps && trimmed.startsWith("SECTION");
//             if (isMainHead) return <p key={i} className="para-heading">{trimmed}</p>;
//             if (isSectionHead) return <p key={i} className="para-subhead">{trimmed}</p>;
//             return <p key={i} className="para-body">{trimmed}</p>;
//           })}
//         </main>

//         {/* ── RIGHT: VERSION QUICK FACTS ── */}
//         <aside style={{ position: "sticky", top: 16 }}>
//           <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "16px 16px" }}>
//             <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>
//               Version Details
//             </p>
//             <div style={{ marginBottom: 14 }}>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Start Date</p>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", fontWeight: 700, color: PRIMARY }}>{meta?.startDate}</p>
//             </div>
//             <div style={{ marginBottom: 14 }}>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>End Date</p>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", fontWeight: 700, color: PRIMARY }}>{meta?.endDate}</p>
//             </div>
//             {meta?.amendments.length > 0 && (
//               <div style={{ marginBottom: 14 }}>
//                 <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Measures</p>
//                 {meta.amendments.map((a, i) => (
//                   <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#374151", marginBottom: 4, paddingLeft: 8, borderLeft: `2px solid ${GOLD}`, lineHeight: 1.5 }}>
//                     {a}
//                   </p>
//                 ))}
//               </div>
//             )}
//             <div style={{ borderTop: "1px solid #E5DDD0", paddingTop: 12, marginTop: 4 }}>
//               <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#9CA3AF", lineHeight: 1.6 }}>
//                 {GENERAL_RULE}
//               </p>
//             </div>
//           </div>
//         </aside>
//       </div>

//       <Footer />
//     </div>
//   );
// }
import { useState, useRef, useEffect, useMemo } from "react";
import { findVersionForDate, CONSTITUTION_VERSIONS } from "./constitutionTexts";

// ─────────────────────────────────────────────────────────────────────────────
// Version data — sourced directly from Constitution Timeline For Website.docx
// ─────────────────────────────────────────────────────────────────────────────
const VERSION_DETAILS = [
  // ── 1969–1979 ──
  { id: "001", title: "1969 Constitution",                                              startDate: "January 7, 1969",   endDate: "January 4, 1971",   startISO: "1969-01-07", era: "1969–1979" },
  { id: "002", title: "1971 Constitution (1970 Election)",                              startDate: "January 5, 1971",   endDate: "November 1, 1971",  startISO: "1971-01-05", era: "1969–1979" },
  { id: "003", title: "1971 Constitution (1970 & 1971 Special Election)",               startDate: "November 2, 1971",  endDate: "March 13, 1972",    startISO: "1971-11-02", era: "1969–1979" },
  { id: "004", title: "1971 Constitution (1972 Special Election Change)",               startDate: "March 14, 1972",    endDate: "January 1, 1973",   startISO: "1972-03-14", era: "1969–1979" },
  { id: "005", title: "1973 Constitution (1972 Special & General Election)",            startDate: "January 2, 1973",   endDate: "December 31, 1974", startISO: "1973-01-02", era: "1969–1979" },
  { id: "006", title: "1973 Constitution (Only January 1 Amendment — HJR 3911)",        startDate: "January 1, 1975",   endDate: "January 4, 1975",   startISO: "1975-01-01", era: "1969–1979" },
  { id: "007", title: "1975 Constitution (Without July Amendment)",                     startDate: "January 5, 1975",   endDate: "June 30, 1975",     startISO: "1975-01-05", era: "1969–1979" },
  { id: "008", title: "1975 Constitution (All Amendments Included)",                    startDate: "July 1, 1975",      endDate: "March 8, 1976",     startISO: "1975-07-01", era: "1969–1979" },
  { id: "009", title: "1977 Constitution (Special Election Only)",                      startDate: "March 9, 1976",     endDate: "January 3, 1977",   startISO: "1976-03-09", era: "1969–1979" },
  { id: "010", title: "1977 Constitution (All Amendments Included)",                    startDate: "January 4, 1977",   endDate: "March 10, 1980",    startISO: "1977-01-04", era: "1969–1979" },
  // ── 1980–1990 ──
  { id: "011", title: "1980 Constitution (March Special Election — First Measure)",     startDate: "March 11, 1980",    endDate: "March 31, 1980",    startISO: "1980-03-11", era: "1980–1990" },
  { id: "012", title: "1980 Constitution (March Special Election — Second Measure)",    startDate: "April 1, 1980",     endDate: "October 6, 1980",   startISO: "1980-04-01", era: "1980–1990" },
  { id: "013", title: "1980 Constitution (October Election — Immediately Effective)",   startDate: "October 7, 1980",   endDate: "December 31, 1982", startISO: "1980-10-07", era: "1980–1990" },
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
function Header({ onHome }) {
  return (
    <header style={{ background: PRIMARY, borderBottom: `3px solid ${GOLD}`, padding: "0 44px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
        <button onClick={onHome} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}>
          <svg width="26" height="34" viewBox="0 0 60 78" fill="white" opacity="0.9">
            <path d="M30 2 C13 2 2 17 2 33 C2 51 13 63 21 71 C24 74 27 77 30 79 C33 77 36 74 39 71 C47 63 58 51 58 33 C58 17 47 2 30 2Z"/>
          </svg>
          <div>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.08rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>Florida Constitution</div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".58rem", color: "rgba(255,255,255,.45)", letterSpacing: ".13em", textTransform: "uppercase" }}>Historical Archive</div>
          </div>
        </button>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Home", "The Constitutions", "Research Guides", "About"].map(n => (
            <button key={n} className={`nav-btn${n === "Home" ? " active" : ""}`}>{n}</button>
          ))}
          <button className="contact-btn">Contact</button>
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #E5DDD0", padding: "18px 44px", background: "white", marginTop: 60 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".74rem", color: "#9CA3AF" }}>© 2024 Organization Name</span>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".74rem", color: "#9CA3AF" }}>Privacy Policy &nbsp;|&nbsp; Terms of Use &nbsp;|&nbsp; Site Map</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root — manages panels
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [panel, setPanel]           = useState("home");   // "home" | "timeline"
  const [viewVersion, setViewVersion] = useState(null);

  function openVersion(id) {
    const v = CONSTITUTION_VERSIONS.find(c => c.id === id);
    if (v) setViewVersion(v);
  }

  if (viewVersion) {
    return <ConstitutionView version={viewVersion} onBack={() => setViewVersion(null)} />;
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <Header onHome={() => setPanel("home")} />

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "36px 44px", display: "grid", gridTemplateColumns: "210px 1fr", gap: 32 }}>
        {/* ── Sidebar ── */}
        <aside>
          <nav style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, overflow: "hidden" }}>
            <button className={`sidebar-link${panel === "home" ? " active" : ""}`} onClick={() => setPanel("home")}>
              <span style={{ fontSize: "1rem" }}>☰</span> History of the Constitutions
            </button>
            <div style={{ height: 1, background: "#F0EBE1" }} />
            <button className={`sidebar-link${panel === "timeline" ? " active" : ""}`} onClick={() => setPanel("timeline")}>
              <span style={{ fontSize: "1rem" }}>⊞</span> Timeline of Amendments
            </button>
            <div style={{ height: 1, background: "#F0EBE1" }} />
            <button className="sidebar-link">
              <span style={{ fontSize: "1rem" }}>📄</span> Resources
            </button>
          </nav>
        </aside>

        {/* ── Main panel ── */}
        <main>
          {panel === "home"     && <HomePanel onOpenVersion={openVersion} />}
          {panel === "timeline" && <TimelinePanel onOpenVersion={openVersion} />}
        </main>
      </div>

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Home — date picker
// ─────────────────────────────────────────────────────────────────────────────
function HomePanel({ onOpenVersion }) {
  const [month, setMonth] = useState(1);
  const [day,   setDay]   = useState(7);
  const [year,  setYear]  = useState(1969);
  const [error, setError] = useState("");

  function handleView() {
    const v = findVersionForDate(year, month, day);
    if (v) { onOpenVersion(v.id); setError(""); }
    else setError(`No constitution was in force on ${MONTHS[month - 1]} ${day}, ${year}. Data covers January 7, 1969 – December 31, 1982.`);
  }

  return (
    <div>
      <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.65rem", fontWeight: 700, color: PRIMARY, marginBottom: 10 }}>
        Explore the Florida Constitution Through History
      </h1>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".95rem", color: "#4B5563", lineHeight: 1.7, marginBottom: 36, maxWidth: 620 }}>
        Enter any date to view the full text of Florida&apos;s Constitution as it was legally in force on that day.
        Data covers <strong>January 7, 1969</strong> through <strong>December 31, 1982</strong>.
      </p>

      <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "28px 32px", maxWidth: 520, boxShadow: "0 2px 10px rgba(27,58,107,.07)" }}>
        <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: ".95rem", fontWeight: 700, color: PRIMARY, marginBottom: 20 }}>Select a date</p>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.2fr", gap: 12, marginBottom: 20 }}>
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
        <button className="primary-btn" onClick={handleView} style={{ width: "100%" }}>
          View Constitution
        </button>
        {error && <div className="error-box">{error}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Timeline — single continuous ruler 1969 → 1983
// ─────────────────────────────────────────────────────────────────────────────
const TL_START = 1969;
const TL_END   = 1983; // slight padding past last version (Dec 1982)
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
function ConstitutionView({ version, onBack }) {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch]           = useState("");
  const [matchCursor, setMatchCursor] = useState(0);

  const meta   = VERSION_DETAILS.find(v => v.id === version.id);
  const groups = useMemo(() => groupLines(version.text.split("\n")), [version.text]);
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
      <Header onHome={onBack} />

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
          {rendered}
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

