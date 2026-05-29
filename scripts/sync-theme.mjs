import fs from 'fs';
import path from 'path';

const root = 'src';
const replacements = [
  ['#2563eb', 'var(--brand-primary)'],
  ['#1d4ed8', 'var(--brand-primary-dark)'],
  ['#3b82f6', 'var(--brand-primary-light)'],
  ['#2196f3', 'var(--brand-primary)'],
  ['#1976d2', 'var(--brand-primary-dark)'],
  ['#60a5fa', 'var(--brand-primary-light)'],
  ['focus:ring-blue-500', 'focus:ring-brand-primary'],
  ['focus:border-blue-500', 'focus:border-brand-primary'],
  ['ring-blue-500', 'ring-brand-primary'],
  ['border-blue-500', 'border-brand-primary'],
  ['text-blue-600', 'text-brand-primary'],
  ['text-blue-700', 'text-brand-primary-dark'],
  ['text-blue-800', 'text-brand-primary-dark'],
  ['text-blue-500', 'text-brand-primary'],
  ['bg-blue-50', 'bg-brand-surface-alt'],
  ['bg-blue-100', 'bg-brand-surface-alt'],
  ['bg-blue-500', 'bg-brand-primary'],
  ['bg-blue-600', 'bg-brand-primary'],
  ['bg-blue-700', 'bg-brand-primary-dark'],
  ['hover:bg-blue-50', 'hover:bg-brand-surface-alt'],
  ['hover:bg-blue-100', 'hover:bg-brand-surface-alt'],
  ['hover:bg-blue-600', 'hover:bg-brand-primary-dark'],
  ['hover:bg-blue-700', 'hover:bg-brand-primary-dark'],
  ['hover:text-blue-600', 'hover:text-brand-primary'],
  ['hover:text-blue-700', 'hover:text-brand-primary-dark'],
  ['border-blue-200', 'border-brand-border'],
  ['border-blue-300', 'border-brand-border'],
  ['from-blue-600', 'from-brand-primary'],
  ['to-blue-700', 'to-brand-primary-dark'],
  ['from-blue-500', 'from-brand-primary'],
  ['to-blue-600', 'to-brand-primary-dark'],
];

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (/\.(tsx?|css|md)$/.test(ent.name)) files.push(p);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  let s = fs.readFileSync(file, 'utf8');
  let next = s;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  if (next !== s) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', file);
  }
}
console.log('theme sync done, files changed:', changed);
