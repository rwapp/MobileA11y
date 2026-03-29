#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function parseArg(name, fallback = '') {
  const idx = process.argv.indexOf(name);
  if (idx === -1 || idx + 1 >= process.argv.length) return fallback;
  return process.argv[idx + 1];
}

const publicDir = path.resolve(parseArg('--public', 'public'));
const sitePrefixRaw = parseArg('--site-prefix', '/');
const sitePrefix = normalizeSitePrefix(sitePrefixRaw);

if (!fs.existsSync(publicDir)) {
  console.error(`[verify-internal-links] Missing public directory: ${publicDir}`);
  process.exit(1);
}

const allFiles = walkFiles(publicDir);
const destinationSet = buildDestinationSet(allFiles, publicDir);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

const missing = [];

for (const htmlFile of htmlFiles) {
  const source = fs.readFileSync(htmlFile, 'utf8');
  const links = extractLinks(source);
  const pageRoute = routeFromOutputFile(htmlFile, publicDir);

  for (const rawLink of links) {
    const normalized = normalizeLink(rawLink, pageRoute, sitePrefix);
    if (!normalized) continue;

    if (!routeExists(normalized, destinationSet)) {
      missing.push({ file: path.relative(process.cwd(), htmlFile), link: rawLink, resolved: normalized });
    }
  }
}

if (missing.length > 0) {
  const uniq = dedupeMissing(missing);
  console.error(`[verify-internal-links] Found ${uniq.length} unresolved internal destinations:`);
  for (const m of uniq.slice(0, 200)) {
    console.error(`- ${m.file}: ${m.link} -> ${m.resolved}`);
  }
  if (uniq.length > 200) {
    console.error(`... and ${uniq.length - 200} more`);
  }
  process.exit(1);
}

console.log(`[verify-internal-links] OK: checked ${htmlFiles.length} HTML files, no unresolved internal href/src destinations.`);

function normalizeSitePrefix(prefix) {
  if (!prefix || prefix === '/') return '/';
  let out = prefix.trim();
  if (!out.startsWith('/')) out = `/${out}`;
  if (!out.endsWith('/')) out = `${out}/`;
  return out;
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

function buildDestinationSet(files, root) {
  const set = new Set();
  for (const file of files) {
    const rel = `/${path.relative(root, file).split(path.sep).join('/')}`;
    set.add(rel);

    if (rel.endsWith('/index.html')) {
      const base = rel.slice(0, -'index.html'.length);
      set.add(base);
      if (base !== '/') set.add(base.slice(0, -1));
    }

    if (rel.endsWith('.html') && !rel.endsWith('/index.html')) {
      set.add(rel.slice(0, -'.html'.length));
    }
  }
  return set;
}

function routeFromOutputFile(file, root) {
  const rel = `/${path.relative(root, file).split(path.sep).join('/')}`;
  if (rel.endsWith('/index.html')) return rel.slice(0, -'index.html'.length);
  return rel;
}

function extractLinks(html) {
  const links = [];
  const regex = /\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const value = match[2].trim();
    if (value.length > 0) links.push(value);
  }
  return links;
}

function normalizeLink(raw, pageRoute, sitePrefixValue) {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const noFragment = trimmed.split('#')[0].split('?')[0].trim();
  if (!noFragment) return null;

  if (
    noFragment.startsWith('//') ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(noFragment) ||
    noFragment.startsWith('javascript:') ||
    noFragment.startsWith('mailto:') ||
    noFragment.startsWith('tel:')
  ) {
    return null;
  }

  let local = noFragment;

  if (sitePrefixValue !== '/' && local === sitePrefixValue.slice(0, -1)) {
    local = '/';
  }

  if (sitePrefixValue !== '/' && local.startsWith(sitePrefixValue)) {
    local = `/${local.slice(sitePrefixValue.length)}`;
  }

  if (local.startsWith('/')) {
    return normalizePath(local);
  }

  const baseDir = pageRoute.endsWith('/') ? pageRoute : `${path.posix.dirname(pageRoute)}/`;
  return normalizePath(path.posix.join(baseDir, local));
}

function normalizePath(p) {
  const normalized = path.posix.normalize(p);
  if (!normalized.startsWith('/')) return `/${normalized}`;
  return normalized;
}

function routeExists(route, destinationSet) {
  if (destinationSet.has(route)) return true;

  if (!route.endsWith('/') && destinationSet.has(`${route}/`)) return true;
  if (route.endsWith('/') && destinationSet.has(route.slice(0, -1))) return true;

  if (!path.posix.extname(route)) {
    if (destinationSet.has(`${route}.html`)) return true;
    if (destinationSet.has(`${route}/index.html`)) return true;
  }

  return false;
}

function dedupeMissing(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = `${item.file}::${item.link}::${item.resolved}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}
