import { useState } from "react";
import { findVersionForDate, CONSTITUTION_VERSIONS } from "./constitutionTexts";

// ─────────────────────────────────────────────────────────────────────────────
// All data sourced directly from "Constitution Timeline.docx"
// ─────────────────────────────────────────────────────────────────────────────
const VERSION_DETAILS = [
  {
    id: "001",
    title: "1969 Constitution",
    startDate: "January 7, 1969",
    endDate: "January 4, 1971",
    startISO: "1969-01-07",
    endISO: "1971-01-04",
    description: "New Constitution Formed, no electoral changes.",
    amendments: [],
    notes: "",
  },
  {
    id: "002",
    title: "1971 Constitution (1970 Election)",
    startDate: "January 5, 1971",
    endDate: "November 1, 1971",
    startISO: "1971-01-05",
    endISO: "1971-11-01",
    description: "Only reflects the changes in the election of 1970.",
    amendments: [
      "HJR 3853 and HJR 4040",
      "HJR 792",
    ],
    notes: "",
  },
  {
    id: "003",
    title: "1971 Constitution (1970 and 1971 Special Election)",
    startDate: "November 2, 1971",
    endDate: "March 13, 1972",
    startISO: "1971-11-02",
    endISO: "1972-03-13",
    description: "Adds the change from HJR 7B.",
    amendments: [
      "HJR 7B",
    ],
    notes: "This is the constitution published in Florida Statutes for the year of 1971.",
  },
  {
    id: "004",
    title: "1971 Constitution (1972 Special Election Change)",
    startDate: "March 14, 1972",
    endDate: "January 1, 1973",
    startISO: "1972-03-14",
    endISO: "1973-01-01",
    description: "Adds 1971 HJR 46-D.",
    amendments: [
      "HJR 46-D (1971)",
    ],
    notes: "",
  },
  {
    id: "005",
    title: "1973 Constitution (1972 Special and General Election)",
    startDate: "January 2, 1973",
    endDate: "January 4, 1975",
    startISO: "1973-01-02",
    endISO: "1975-01-04",
    description:
      "Adds 1971 SJR 52-D, which has an effective date of January 1, 1973, and revises Article V of the constitution.",
    amendments: [
      "SJR 52-D (1971, effective January 1, 1973) — revises Article V",
      "HJR 2835",
      "HJR 4324",
      "HJR 3576",
      "SJR 292",
    ],
    notes: "",
  },
  {
    id: "006",
    title: "1975 Constitution (Without July Amendment)",
    startDate: "January 5, 1975",
    endDate: "June 30, 1975",
    startISO: "1975-01-05",
    endISO: "1975-06-30",
    description: "Adds the following changes from the general election of 1974.",
    amendments: [
      "HJR 637 (1974)",
      "HJR 1907 (1974)",
      "HJR 1424 (1974)",
      "SJR 917 (1974)",
      "HJR 3911",
    ],
    notes: "",
  },
  {
    id: "007",
    title: "1975 Constitution (All Amendments Included)",
    startDate: "July 1, 1975",
    endDate: "March 8, 1976",
    startISO: "1975-07-01",
    endISO: "1976-03-08",
    description:
      "HJR 2289 and HJR 2984 take effect on July 1, 1975. All measures ratified in 1975 are reflected in this constitution.",
    amendments: [
      "HJR 2289 (effective July 1, 1975)",
      "HJR 2984 (effective July 1, 1975)",
    ],
    notes: "All measures ratified in 1975 are reflected in this constitution.",
  },
  {
    id: "008",
    title: "1977 Constitution (Special Election Only)",
    startDate: "March 9, 1976",
    endDate: "January 3, 1977",
    startISO: "1976-03-09",
    endISO: "1977-01-03",
    description: "This version adds 1975 SJR 1061, adopted in 1976.",
    amendments: [
      "SJR 1061 (1975, adopted in 1976)",
    ],
    notes: "",
  },
  {
    id: "009",
    title: "1977 Constitution (All Amendments Included)",
    startDate: "January 4, 1977",
    endDate: "April 1, 1980",
    startISO: "1977-01-04",
    endISO: "1980-04-01",
    description:
      "Nothing passed in the 1978 election; therefore the 1977 and 1979 constitutions are identical.",
    amendments: [
      "SJR 1061",
      "HJR 1709",
      "HJR 291",
      "SJR 49 and SJR 81",
      "Public Disclosure Initiative (citizen initiative)",
    ],
    notes: "The 1977 and 1979 constitutions are identical, as nothing passed in the 1978 election.",
  },
];

const GENERAL_RULE =
  "Florida constitutional amendments approved by voters take effect on the first Tuesday after the first Monday in January following the November general election, unless the amendment specifies a different effective date.";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const PRIMARY = "#1B3A6B";
const GOLD    = "#C4882A";
const CREAM   = "#F8F6F1";

// ─────────────────────────────────────────────────────────────────────────────
// Shared styles injected once
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100vh; background: ${CREAM}; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${CREAM}; }
  ::-webkit-scrollbar-thumb { background: #C9C0AE; border-radius: 3px; }

  .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; color: rgba(255,255,255,.85); font-weight: 600; padding: 4px 0; transition: color .15s; }
  .nav-btn:hover { color: ${GOLD}; }
  .nav-btn.active { color: ${GOLD}; border-bottom: 2px solid ${GOLD}; padding-bottom: 2px; }

  .contact-btn { background: ${PRIMARY}; color: white; border: 1px solid rgba(255,255,255,.3); padding: 7px 18px; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; font-size: .84rem; cursor: pointer; }

  .select-input { padding: 7px 10px; border: 1px solid #C9C0AE; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-size: .9rem; background: white; outline: none; color: #1a1a2e; }
  .select-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 2px #1B3A6B22; }

  .view-btn { background: ${PRIMARY}; color: white; border: none; padding: 9px 22px; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-weight: 700; font-size: .9rem; cursor: pointer; transition: background .15s; white-space: nowrap; }
  .view-btn:hover { background: #152e55; }

  .version-card { background: white; border: 1px solid #E5DDD0; border-radius: 8px; padding: 20px 24px; transition: box-shadow .15s, border-color .15s; }
  .version-card:hover { box-shadow: 0 4px 16px rgba(27,58,107,.12); border-color: #C9C0AE; }

  .amend-tag { display: inline-block; background: #EEF2FF; color: #3730A3; border: 1px solid #C7D2FE; border-radius: 4px; padding: 3px 10px; font-family: 'Source Sans 3', sans-serif; font-size: .76rem; font-weight: 600; }

  .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; color: #374151; cursor: pointer; border-radius: 4px; background: none; border: none; width: 100%; text-align: left; transition: background .12s; }
  .sidebar-link:hover { background: #EEE9DF; color: ${PRIMARY}; }

  .search-input { width: 100%; padding: 8px 12px; border: 1px solid #C9C0AE; border-radius: 4px; font-family: 'Source Sans 3', sans-serif; font-size: .88rem; background: white; outline: none; }
  .search-input:focus { border-color: ${PRIMARY}; box-shadow: 0 0 0 2px #1B3A6B22; }
  .search-input::placeholder { color: #bbb; }

  .para-heading  { font-family: 'Libre Baskerville', serif; font-size: .95rem; font-weight: 700; color: ${PRIMARY}; margin-bottom: 6px; margin-top: 22px; letter-spacing: .04em; }
  .para-subhead  { font-family: 'Libre Baskerville', serif; font-size: .88rem; font-weight: 700; color: #374151; margin-bottom: 4px; margin-top: 14px; }
  .para-body     { font-family: 'Libre Baskerville', serif; font-size: .91rem; line-height: 1.9; color: #1a1a2e; margin-bottom: 2px; }
  .para-empty    { height: 8px; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Shared Header
// ─────────────────────────────────────────────────────────────────────────────
function Header({ onHome }) {
  return (
    <header style={{ background: PRIMARY, borderBottom: `3px solid ${GOLD}`, padding: "0 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
        <button
          onClick={onHome}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 11, padding: 0 }}
        >
          <svg width="30" height="38" viewBox="0 0 60 80" fill="white" opacity="0.9">
            <path d="M30 2 C12 2 2 18 2 34 C2 52 14 64 22 72 C25 75 28 78 30 80 C32 78 35 75 38 72 C46 64 58 52 58 34 C58 18 48 2 30 2 Z"/>
          </svg>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.1rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
              Florida Constitution
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".6rem", color: "rgba(255,255,255,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>
              Historical Archive
            </div>
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
    <footer style={{ borderTop: "1px solid #E5DDD0", padding: "16px 40px", background: "white", marginTop: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem", color: "#9CA3AF" }}>
          © 2024 Organization Name
        </span>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem", color: "#9CA3AF" }}>
          Privacy Policy &nbsp;|&nbsp; Terms of Use &nbsp;|&nbsp; Site Map
        </span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Landing Page
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay,   setSelectedDay]   = useState(7);
  const [selectedYear,  setSelectedYear]  = useState(1969);
  const [viewedVersion, setViewedVersion] = useState(null);
  const [errorMsg,      setErrorMsg]      = useState("");

  function handleViewConstitution() {
    const version = findVersionForDate(selectedYear, selectedMonth, selectedDay);
    if (version) {
      setViewedVersion(version);
      setErrorMsg("");
    } else {
      setErrorMsg(
        `No constitution data found for ${MONTHS[selectedMonth - 1]} ${selectedDay}, ${selectedYear}. ` +
        `Available data covers January 7, 1969 through April 1, 1980.`
      );
    }
  }

  function openVersion(id) {
    const version = CONSTITUTION_VERSIONS.find(v => v.id === id);
    if (version) { setViewedVersion(version); setErrorMsg(""); }
  }

  if (viewedVersion) {
    return (
      <ConstitutionView
        version={viewedVersion}
        onBack={() => setViewedVersion(null)}
        onOpenVersion={openVersion}
      />
    );
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh", color: "#1a1a2e" }}>
      <style>{GLOBAL_CSS}</style>
      <Header onHome={() => {}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 40px", display: "grid", gridTemplateColumns: "210px 1fr", gap: 36 }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside>
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, overflow: "hidden" }}>
            <button className="sidebar-link">
              <span style={{ fontSize: "1.1rem", color: PRIMARY }}>≡</span>
              History of the Constitutions
            </button>
            <div style={{ height: 1, background: "#F0EBE1" }} />
            <button className="sidebar-link">
              <span style={{ fontSize: "1rem", color: PRIMARY }}>⊞</span>
              Timeline of Amendments
            </button>
            <div style={{ height: 1, background: "#F0EBE1" }} />
            <button className="sidebar-link">
              <span style={{ fontSize: "1rem", color: PRIMARY }}>📄</span>
              Resources
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main>

          {/* Title */}
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.7rem", fontWeight: 700, color: PRIMARY, marginBottom: 10 }}>
            Explore the Florida Constitution Through History
          </h1>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".97rem", color: "#374151", marginBottom: 28, lineHeight: 1.65 }}>
            Enter a date below to view the Florida Constitution as it existed at that point in time.
          </p>

          {/* ── DATE PICKER ── */}
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 10, padding: "22px 28px", marginBottom: 10, display: "inline-flex", alignItems: "center", gap: 12, flexWrap: "wrap", boxShadow: "0 2px 8px rgba(27,58,107,.07)" }}>
            <select className="select-input" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
              {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </select>
            <select className="select-input" style={{ width: 72 }} value={selectedDay} onChange={e => setSelectedDay(Number(e.target.value))}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input
              type="number"
              className="select-input"
              style={{ width: 95 }}
              value={selectedYear}
              min={1969} max={1980}
              onChange={e => setSelectedYear(Number(e.target.value))}
            />
            <button className="view-btn" onClick={handleViewConstitution}>
              View Constitution
            </button>
          </div>

          {errorMsg && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "11px 16px", marginBottom: 20, fontFamily: "'Source Sans 3', sans-serif", fontSize: ".86rem", color: "#991B1B" }}>
              {errorMsg}
            </div>
          )}

          {/* ── DATA RANGE NOTE ── */}
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".8rem", color: "#6B7280", marginBottom: 36, marginTop: 10 }}>
            Data available from <strong>January 7, 1969</strong> through <strong>April 1, 1980</strong>.
          </p>

          {/* ── ALL VERSIONS TIMELINE ── */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY }}>
                Constitution Versions
              </h2>
              <div style={{ flex: 1, height: 1, background: "#E5DDD0" }} />
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#9CA3AF", whiteSpace: "nowrap" }}>
                9 versions · 1969 – 1980
              </span>
            </div>

            {/* Version cards */}
            <div style={{ position: "relative" }}>
              {/* Vertical timeline line */}
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: "#E5DDD0", zIndex: 0 }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {VERSION_DETAILS.map((v) => (
                  <div key={v.id} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    {/* Dot + connector */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: PRIMARY, color: "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", fontWeight: 700,
                        border: `3px solid ${CREAM}`,
                        boxShadow: "0 2px 6px rgba(27,58,107,.25)",
                        flexShrink: 0,
                      }}>
                        {v.id}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="version-card" style={{ flex: 1 }}>
                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
                        <div>
                          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1rem", fontWeight: 700, color: PRIMARY, marginBottom: 4 }}>
                            {v.title}
                          </h3>
                          {/* Date range — very prominent */}
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 5, padding: "5px 12px" }}>
                            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".76rem", fontWeight: 700, color: "#1E40AF", textTransform: "uppercase", letterSpacing: ".06em" }}>
                              Effective Dates
                            </span>
                            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", fontWeight: 700, color: PRIMARY }}>
                              {v.startDate} — {v.endDate}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => openVersion(v.id)}
                          style={{
                            background: PRIMARY, color: "white", border: "none",
                            padding: "7px 16px", borderRadius: 5,
                            fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, fontSize: ".82rem",
                            cursor: "pointer", whiteSpace: "nowrap",
                            transition: "background .15s",
                          }}
                          onMouseOver={e => e.currentTarget.style.background = "#152e55"}
                          onMouseOut={e => e.currentTarget.style.background = PRIMARY}
                        >
                          View Text →
                        </button>
                      </div>

                      {/* Description */}
                      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: "#374151", lineHeight: 1.65, marginBottom: v.amendments.length > 0 || v.notes ? 12 : 0 }}>
                        {v.description}
                      </p>

                      {/* Amendments */}
                      {v.amendments.length > 0 && (
                        <div style={{ marginBottom: v.notes ? 10 : 0 }}>
                          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".73rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>
                            Legislative Measures Incorporated
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {v.amendments.map((a, i) => (
                              <span key={i} className="amend-tag">{a}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      {v.notes && (
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 5, padding: "8px 12px", marginTop: 4 }}>
                          <span style={{ fontSize: ".9rem", flexShrink: 0, marginTop: 1 }}>ℹ</span>
                          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#92400E", lineHeight: 1.6 }}>
                            {v.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── GENERAL RULE ── */}
          <div style={{ background: "#F0F4FF", border: "1px solid #C7D2FE", borderRadius: 8, padding: "16px 20px", marginBottom: 40, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".73rem", fontWeight: 700, color: "#3730A3", textTransform: "uppercase", letterSpacing: ".07em", whiteSpace: "nowrap", paddingTop: 2 }}>
              General Rule
            </span>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", color: "#1E1B4B", lineHeight: 1.7 }}>
              {GENERAL_RULE}
            </p>
          </div>

          {/* ── ABOUT ── */}
          <div style={{ borderTop: `3px solid ${PRIMARY}`, paddingTop: 24 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.2rem", fontWeight: 700, color: PRIMARY, marginBottom: 12 }}>
              About This Website
            </h2>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".93rem", color: "#374151", lineHeight: 1.8 }}>
              The Florida Constitutional History Database provides public access to the evolution of{" "}
              <strong>Florida&apos;s Constitution</strong> across time. This platform allows users to view the
              Constitution as it existed on any given date and to explore the legislative and electoral
              history behind constitutional change. The data presented here covers the 1968 revision of
              the Florida Constitution and all subsequent amendments through 1979.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Constitution Text View
// ─────────────────────────────────────────────────────────────────────────────
function ConstitutionView({ version, onBack, onOpenVersion }) {
  const [search, setSearch] = useState("");

  const meta = VERSION_DETAILS.find(v => v.id === version.id);
  const paragraphs = version.text.split("\n");

  const filtered = search.trim()
    ? paragraphs.filter(p => p.toLowerCase().includes(search.toLowerCase()))
    : paragraphs;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: CREAM, minHeight: "100vh", color: "#1a1a2e" }}>
      <style>{GLOBAL_CSS}</style>
      <Header onHome={onBack} />

      {/* ── VERSION BANNER ── */}
      <div style={{ background: "white", borderBottom: "1px solid #E5DDD0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 40px" }}>

          {/* Back link */}
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: ".82rem", color: "#6B7280", marginBottom: 14, display: "flex", alignItems: "center", gap: 5, padding: 0 }}
          >
            ← Back to Date Search
          </button>

          {/* Version identity row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{
                  background: PRIMARY, color: "white", borderRadius: 5,
                  padding: "3px 10px", fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: ".75rem", fontWeight: 700, letterSpacing: ".06em"
                }}>
                  VERSION {meta?.id}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.35rem", fontWeight: 700, color: PRIMARY, marginBottom: 8 }}>
                {meta?.title}
              </h1>
              {/* Effective date — large and clear */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 6, padding: "7px 16px" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".76rem", fontWeight: 700, color: "#1E40AF", textTransform: "uppercase", letterSpacing: ".08em" }}>
                  Effective Dates
                </span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1rem", fontWeight: 700, color: PRIMARY }}>
                  {meta?.startDate} — {meta?.endDate}
                </span>
              </div>
            </div>

            {/* Amendments in banner */}
            {meta?.amendments.length > 0 && (
              <div style={{ maxWidth: 460 }}>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>
                  Legislative Measures in This Version
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {meta.amendments.map((a, i) => (
                    <span key={i} className="amend-tag">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {meta?.description && (
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", color: "#374151", lineHeight: 1.65, marginTop: 14 }}>
              {meta.description}
            </p>
          )}

          {/* Notes */}
          {meta?.notes && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 5, padding: "9px 14px", marginTop: 12 }}>
              <span style={{ fontSize: ".9rem", flexShrink: 0, marginTop: 1 }}>ℹ</span>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".84rem", color: "#92400E", lineHeight: 1.6 }}>
                {meta.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── THREE COLUMN LAYOUT ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 40px", display: "grid", gridTemplateColumns: "220px 1fr 200px", gap: 28, alignItems: "start" }}>

        {/* ── LEFT: SEARCH + VERSION LIST ── */}
        <aside style={{ position: "sticky", top: 16 }}>
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px 14px", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
              Search Text
            </p>
            <input
              className="search-input"
              placeholder="Search constitution..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".72rem", color: "#9CA3AF", marginTop: 6 }}>
                {filtered.filter(p => p.trim()).length} matching lines
              </p>
            )}
          </div>

          {/* All versions list */}
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "14px 12px" }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>
              All Versions
            </p>
            {VERSION_DETAILS.map(v => (
              <button
                key={v.id}
                onClick={() => onOpenVersion(v.id)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: v.id === version.id ? PRIMARY : "none",
                  color: v.id === version.id ? "white" : "#374151",
                  border: "none", borderRadius: 5, padding: "7px 10px", cursor: "pointer",
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: ".75rem",
                  marginBottom: 3, lineHeight: 1.45,
                  fontWeight: v.id === version.id ? 700 : 400,
                  transition: "background .1s",
                }}
              >
                <span style={{ opacity: .6, marginRight: 5 }}>{v.id}</span>
                {v.title}
              </button>
            ))}
          </div>
        </aside>

        {/* ── CENTER: CONSTITUTION TEXT ── */}
        <main style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "36px 44px", minHeight: 600 }}>
          {filtered.length === 0 && search && (
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".9rem", color: "#9CA3AF", textAlign: "center", padding: "60px 0" }}>
              No results found for &ldquo;{search}&rdquo;
            </p>
          )}
          {filtered.map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={i} className="para-empty" />;
            const allCaps = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
            const isMainHead = allCaps && (trimmed.startsWith("ARTICLE") || trimmed.startsWith("PREAMBLE") || trimmed === "CONSTITUTION OF THE STATE OF FLORIDA");
            const isSectionHead = allCaps && trimmed.startsWith("SECTION");
            if (isMainHead) return <p key={i} className="para-heading">{trimmed}</p>;
            if (isSectionHead) return <p key={i} className="para-subhead">{trimmed}</p>;
            return <p key={i} className="para-body">{trimmed}</p>;
          })}
        </main>

        {/* ── RIGHT: VERSION QUICK FACTS ── */}
        <aside style={{ position: "sticky", top: 16 }}>
          <div style={{ background: "white", border: "1px solid #E5DDD0", borderRadius: 8, padding: "16px 16px" }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>
              Version Details
            </p>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>Start Date</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", fontWeight: 700, color: PRIMARY }}>{meta?.startDate}</p>
            </div>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>End Date</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".88rem", fontWeight: 700, color: PRIMARY }}>{meta?.endDate}</p>
            </div>
            {meta?.amendments.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Measures</p>
                {meta.amendments.map((a, i) => (
                  <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".78rem", color: "#374151", marginBottom: 4, paddingLeft: 8, borderLeft: `2px solid ${GOLD}`, lineHeight: 1.5 }}>
                    {a}
                  </p>
                ))}
              </div>
            )}
            <div style={{ borderTop: "1px solid #E5DDD0", paddingTop: 12, marginTop: 4 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: ".7rem", color: "#9CA3AF", lineHeight: 1.6 }}>
                {GENERAL_RULE}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
