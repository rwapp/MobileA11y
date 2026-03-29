#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function parseArg(name, fallback = '') {
  const idx = process.argv.indexOf(name);
  if (idx === -1 || idx + 1 >= process.argv.length) return fallback;
  return process.argv[idx + 1];
}

const currentDir = path.resolve(parseArg('--current', 'public'));
const baselineRaw = parseArg('--baseline', '');
const baselineDir = baselineRaw ? path.resolve(baselineRaw) : '';

if (!baselineDir) {
  console.log('[compare-route-inventory] No baseline directory provided. Skipping route-removal check.');
  process.exit(0);
}

if (!fs.existsSync(currentDir)) {
  console.error(`[compare-route-inventory] Missing current directory: ${currentDir}`);
  process.exit(1);
}

if (!fs.existsSync(baselineDir)) {
  console.error(`[compare-route-inventory] Missing baseline directory: ${baselineDir}`);
  process.exit(1);
}

const currentRoutes = collectRoutes(currentDir);
const baselineRoutes = collectRoutes(baselineDir);

const removed = [...baselineRoutes].filter((r) => !currentRoutes.has(r)).sort();

if (removed.length > 0) {
  console.error(`[compare-route-inventory] Found ${removed.length} removed routes compared to baseline:`);
  for (const route of removed.slice(0, 200)) {
    console.error(`- ${route}`);
  }
  if (removed.length > 200) {
    console.error(`... and ${removed.length - 200} more`);
  }
  process.exit(1);
}

console.log(`[compare-route-inventory] OK: no removed routes. current=${currentRoutes.size}, baseline=${baselineRoutes.size}`);

function collectRoutes(root) {
  const files = walkFiles(root);
  const routes = new Set();

  for (const file of files) {
    const rel = `/${path.relative(root, file).split(path.sep).join('/')}`;
    if (rel.endsWith('/index.html')) {
      routes.add(rel.slice(0, -'index.html'.length));
      continue;
    }

    if (rel.endsWith('.html')) {
      routes.add(rel);
      routes.add(rel.slice(0, -'.html'.length));
      continue;
    }

    if (rel.endsWith('.xml')) {
      routes.add(rel);
    }
  }

  return routes;
}

function walkFiles(dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath));
    } else if (entry.isFile()) {
      result.push(fullPath);
    }
  }
  return result;
}
