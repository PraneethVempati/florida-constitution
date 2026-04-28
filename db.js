/**
 * SQLite database access via sql.js (WebAssembly).
 * The .db file is served from /public/florida-constitution.db.
 * The WASM binary is served from /public/sql-wasm.wasm.
 *
 * All exports are async — call them from useEffect / async handlers.
 */

import initSqlJs from "sql.js";

let _db = null;

async function getDB() {
  if (_db) return _db;
  const SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  const buf = await fetch("/florida-constitution.db").then(r => r.arrayBuffer());
  _db = new SQL.Database(new Uint8Array(buf));
  return _db;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function rows(result) {
  if (!result || !result.length) return [];
  const { columns, values } = result[0];
  return values.map(row => Object.fromEntries(columns.map((c, i) => [c, row[i]])));
}

function isoDate(datetimeStr) {
  // DB stores "YYYY-MM-DD HH:MM:SS" — take just the date part
  return datetimeStr ? datetimeStr.slice(0, 10) : "";
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Returns all versions from the DB, ordered by version id.
 * Shape: { version, effectiveBegin, effectiveEnd }
 */
export async function getAllVersions() {
  const db = await getDB();
  const res = db.exec(
    "SELECT version, effective_begin, effective_end FROM versions ORDER BY version"
  );
  return rows(res).map(r => ({
    version:        r.version,
    effectiveBegin: isoDate(r.effective_begin),
    effectiveEnd:   isoDate(r.effective_end),
  }));
}

/**
 * Finds the version in force on the given calendar date.
 * Returns the version string (e.g. "003") or null.
 */
export async function findVersionForDate(year, month, day) {
  const db  = await getDB();
  const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const res = db.exec(
    `SELECT version FROM versions
     WHERE DATE(effective_begin) <= DATE('${iso}')
       AND DATE(effective_end)   >= DATE('${iso}')
     LIMIT 1`
  );
  const r = rows(res);
  return r.length ? r[0].version : null;
}

/**
 * Loads all provisions for a version and returns them as a plain-text string
 * (one provision per line), ready to feed into the existing groupLines() parser.
 */
export async function getVersionText(version) {
  const db  = await getDB();
  const res = db.exec(
    `SELECT provision_text FROM provisions
     WHERE version = '${version}'
     ORDER BY provision_id`
  );
  const r = rows(res);
  return r.map(row => row.provision_text ?? "").join("\n");
}
