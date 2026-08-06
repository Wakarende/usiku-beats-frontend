#!/usr/bin/env node
/*
 * check-asset-case.js
 *
 * Guards against "works on my Mac, 404s in production" bugs.
 *
 * The site is a Next.js static export served from a case-sensitive Linux
 * (Apache) host. A reference like "./assets/img/library/divider.png" resolves
 * fine on a case-insensitive dev filesystem (macOS/Windows) even when the file
 * on disk is actually "Divider.png" -- but it 404s once deployed.
 *
 * This script scans source files for static "/assets/..." references and
 * verifies each one exists in public/ with EXACTLY matching case. It only
 * checks static string literals; references built from variables/templates
 * (containing `${`) are skipped because they can't be resolved statically.
 *
 * Exit code 0 = all good, 1 = at least one broken/miscased reference.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

// Directories to scan for references.
const SCAN_DIRS = ["components", "pages", "src", "hooks", "stores", "redux", "services", "lib"];
const SCAN_EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".scss"]);

// Skip these path segments entirely.
const IGNORE_SEGMENTS = new Set(["node_modules", ".next", "out", ".git"]);

// Matches quoted string literals that point at "/assets/..." or "./assets/...".
// Captures the asset path (leading "./" or "/" normalised away later).
const ASSET_REF = /["'`](\.?\/assets\/[^"'`)]+?\.[a-zA-Z0-9]+)["'`]/g;
// Matches url(...) references inside CSS / inline style strings.
const URL_REF = /url\(\s*["']?(\.?\/assets\/[^"')]+?\.[a-zA-Z0-9]+)["']?\s*\)/g;

/** Recursively collect files to scan. */
function collectFiles(dir, acc) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (IGNORE_SEGMENTS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, acc);
    } else if (SCAN_EXTS.has(path.extname(entry.name))) {
      acc.push(full);
    }
  }
  return acc;
}

/** Resolve a referenced asset path to an absolute path under public/. */
function toPublicPath(ref) {
  // Normalise "./assets/x" and "/assets/x" -> "assets/x"
  const rel = ref.replace(/^\.?\//, "");
  return path.join(PUBLIC_DIR, rel);
}

/** Case-sensitive existence check that works even on case-insensitive FS. */
function existsExactCase(absPath) {
  let current = PUBLIC_DIR;
  const rel = path.relative(PUBLIC_DIR, absPath);
  if (rel.startsWith("..")) return { ok: false, actual: null };
  for (const segment of rel.split(path.sep)) {
    let entries;
    try {
      entries = fs.readdirSync(current);
    } catch {
      return { ok: false, actual: null };
    }
    if (!entries.includes(segment)) {
      // Look for a case-insensitive match to suggest the correct casing.
      const ci = entries.find((e) => e.toLowerCase() === segment.toLowerCase());
      return { ok: false, actual: ci ? path.join(path.relative(PUBLIC_DIR, current), ci) : null };
    }
    current = path.join(current, segment);
  }
  return { ok: true, actual: null };
}

function main() {
  const files = [];
  for (const dir of SCAN_DIRS) collectFiles(path.join(ROOT, dir), files);

  const problems = [];
  const seen = new Set();

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const regex of [ASSET_REF, URL_REF]) {
      regex.lastIndex = 0;
      let m;
      while ((m = regex.exec(text)) !== null) {
        const ref = m[1];
        // Skip dynamically-built references we can't resolve statically.
        if (ref.includes("${")) continue;
        const key = ref + "@" + file;
        if (seen.has(key)) continue;
        seen.add(key);

        const result = existsExactCase(toPublicPath(ref));
        if (!result.ok) {
          problems.push({
            ref,
            file: path.relative(ROOT, file),
            actual: result.actual, // case-insensitive match on disk, if any
          });
        }
      }
    }
  }

  if (problems.length === 0) {
    console.log("✓ asset-case check passed: all /assets references resolve with exact case.");
    process.exit(0);
  }

  console.error(`\n✗ asset-case check failed: ${problems.length} broken /assets reference(s).`);
  console.error("  These resolve on case-insensitive dev machines but 404 on the production server.\n");
  for (const p of problems) {
    console.error(`  ${p.ref}`);
    if (p.actual) {
      console.error(`      → did you mean: /${p.actual.split(path.sep).join("/")}  (case mismatch)`);
    } else {
      console.error(`      → no file of any casing found under public/`);
    }
    console.error(`      referenced in: ${p.file}\n`);
  }
  console.error("Fix by matching the reference to the exact on-disk filename (case-sensitive).");
  process.exit(1);
}

main();
