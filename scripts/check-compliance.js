#!/usr/bin/env node
/**
 * Compliance + structure guard for served public HTML pages.
 *
 * For every served public .html (see EXCLUDE below), asserts ALL of:
 *   1. Visible "Equal Housing Lender"        (ld+json blocks stripped first)
 *   2. Visible "NMLS #2822744"               (Chad Evers)
 *   3. Visible "NMLS #2769672"               (Focus Home Mortgage Inc.)
 *   4. Closed/balanced structure: exactly one </html> and one </body>,
 *      and <main>/<section>/<footer> opening counts == closing counts.
 *      (Catches mid-tag truncations like commit 0dab8d3, which left
 *       about.html ending at "</sec" with no footer/body/html.)
 *
 * Exits 0 if all pages pass, 1 with a per-file reason for each failure.
 *
 * Used by .githooks/pre-commit and .github/workflows/compliance.yml.
 * Run manually: `npm run check:compliance` (or `node scripts/check-compliance.js`).
 */
'use strict';
const fs = require('fs');
const path = require('path');

// Non-public files that legitimately do NOT carry the public compliance footer.
// Paths are repo-root-relative, forward-slash. Add new ones here as needed.
const EXCLUDE = [
  '404.html',
  'admin.html',
  'admin/seo/index.html',
  'admin_v6_backup_2026-04-17.html',
  'hubspot-email-sequence.html',
];

// Directories never walked.
const SKIP_DIRS = new Set(['.git', '.claude', 'node_modules']);

const ROOT = path.resolve(__dirname, '..');

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function relPosix(abs) {
  return path.relative(ROOT, abs).split(path.sep).join('/');
}

// Strip <script type="application/ld+json">...</script> so JSON-LD metadata
// never counts as a "visible" occurrence.
function stripLdJson(html) {
  return html.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    ''
  );
}

function count(html, re) {
  const m = html.match(re);
  return m ? m.length : 0;
}

function checkFile(abs) {
  const raw = fs.readFileSync(abs, 'utf8');
  const visible = stripLdJson(raw);
  const reasons = [];

  if (!visible.includes('Equal Housing Lender')) {
    reasons.push('missing visible "Equal Housing Lender"');
  }
  if (!visible.includes('NMLS #2822744')) {
    reasons.push('missing visible "NMLS #2822744" (Chad Evers)');
  }
  if (!visible.includes('NMLS #2769672')) {
    reasons.push('missing visible "NMLS #2769672" (Focus Home Mortgage Inc.)');
  }

  // Structure / truncation checks (run on raw HTML).
  const closeHtml = count(raw, /<\/html>/gi);
  const closeBody = count(raw, /<\/body>/gi);
  if (closeHtml !== 1) reasons.push(`expected exactly one </html>, found ${closeHtml}`);
  if (closeBody !== 1) reasons.push(`expected exactly one </body>, found ${closeBody}`);

  for (const tag of ['main', 'section', 'footer']) {
    const open = count(raw, new RegExp(`<${tag}[\\s/>]`, 'gi'));
    const close = count(raw, new RegExp(`</${tag}\\s*>`, 'gi'));
    if (open !== close) {
      reasons.push(`<${tag}> not balanced (open ${open}, close ${close})`);
    }
  }

  return reasons;
}

function main() {
  const excludeSet = new Set(EXCLUDE);
  const files = walk(ROOT, [])
    .map((abs) => ({ abs, rel: relPosix(abs) }))
    .filter(({ rel }) => !excludeSet.has(rel))
    .sort((a, b) => a.rel.localeCompare(b.rel));

  const failures = [];
  for (const { abs, rel } of files) {
    const reasons = checkFile(abs);
    if (reasons.length) failures.push({ rel, reasons });
  }

  console.log(`compliance guard: scanned ${files.length} served public page(s); ${EXCLUDE.length} excluded.`);

  if (failures.length === 0) {
    console.log('PASS — all pages carry visible EHL + dual NMLS and are structurally closed.');
    process.exit(0);
  }

  console.error(`\nFAIL — ${failures.length} page(s) violate the compliance/structure guard:\n`);
  for (const { rel, reasons } of failures) {
    console.error(`  ✗ ${rel}`);
    for (const r of reasons) console.error(`      - ${r}`);
  }
  console.error('\nEvery served public page must render a visible "Equal Housing Lender",');
  console.error('both NMLS numbers, and a fully-closed document. Fix the page(s) above,');
  console.error('or (if a file is genuinely non-public) add it to EXCLUDE in scripts/check-compliance.js.');
  process.exit(1);
}

main();
