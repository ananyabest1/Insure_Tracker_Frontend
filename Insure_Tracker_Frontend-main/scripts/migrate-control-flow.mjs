/**
 * Angular 17+ control flow -> Angular 16 structural directives.
 * Compatible with Node 18.13+ (no Node 20+ APIs).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function findMatchingBrace(s, start) {
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function convertSwitch(content) {
  const re = /@switch\s*\(\s*([^)]+)\s*\)\s*\{/g;
  let m;
  let result = content;
  const replacements = [];
  while ((m = re.exec(content)) !== null) {
    const expr = m[1].trim();
    const open = m.index + m[0].length - 1;
    const close = findMatchingBrace(content, open);
    if (close < 0) continue;
    const inner = content.slice(open + 1, close);
    let converted = `<ng-container [ngSwitch]="${expr}">`;
    const caseRe = /@case\s*\(\s*([^)]+)\s*\)\s*\{/g;
    let last = 0;
    let cm;
    const parts = [];
    while ((cm = caseRe.exec(inner)) !== null) {
      if (cm.index > last) {
        const between = inner.slice(last, cm.index);
        if (between.trim()) parts.push({ type: 'raw', text: between });
      }
      const caseOpen = cm.index + cm[0].length - 1;
      const caseClose = findMatchingBrace(inner, caseOpen);
      parts.push({ type: 'case', expr: cm[1].trim(), body: inner.slice(caseOpen + 1, caseClose) });
      last = caseClose + 1;
    }
    const defRe = /@default\s*\{/;
    const defM = defRe.exec(inner.slice(last));
    if (defM) {
      const defStart = last + defM.index + defM[0].length - 1;
      const defClose = findMatchingBrace(inner, defStart);
      parts.push({ type: 'default', body: inner.slice(defStart + 1, defClose) });
    }
    for (const p of parts) {
      if (p.type === 'case') {
        converted += `<ng-container *ngSwitchCase="${p.expr}">${convertAll(p.body)}</ng-container>`;
      } else if (p.type === 'default') {
        converted += `<ng-container *ngSwitchDefault>${convertAll(p.body)}</ng-container>`;
      }
    }
    converted += `</ng-container>`;
    replacements.push({ start: m.index, end: close + 1, text: converted });
  }
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    result = result.slice(0, r.start) + r.text + result.slice(r.end);
  }
  return result;
}

function convertFor(content) {
  const re = /@for\s*\(\s*(\w+)\s+of\s+([^;]+);\s*track\s+([^;)]+)(?:;\s*let\s+(\w+)\s*=\s*\$index)?\s*\)\s*\{/g;
  let result = content;
  const replacements = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    const item = m[1];
    const list = m[2].trim();
    const track = m[3].trim();
    const indexVar = m[4];
    const open = m.index + m[0].length - 1;
    const close = findMatchingBrace(content, open);
    if (close < 0) continue;
    const body = content.slice(open + 1, close);
    const trackBy = track === '$index' ? 'trackByIndex' : 'trackByIdentity';
    let ngFor = `*ngFor="let ${item} of ${list}; trackBy: ${trackBy}"`;
    if (indexVar) {
      ngFor = `*ngFor="let ${item} of ${list}; let ${indexVar} = index; trackBy: ${trackBy}"`;
    }
    const converted = `<ng-container ${ngFor}>${convertAll(body)}</ng-container>`;
    replacements.push({ start: m.index, end: close + 1, text: converted });
  }
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    result = result.slice(0, r.start) + r.text + result.slice(r.end);
  }
  return result;
}

function convertIf(content) {
  let result = content;
  let changed = true;
  while (changed) {
    changed = false;
    const re = /@if\s*\(\s*([^)]+)\s*\)\s*\{/;
    const m = re.exec(result);
    if (!m) break;
    const expr = m[1].trim();
    const open = m.index + m[0].length - 1;
    const close = findMatchingBrace(result, open);
    if (close < 0) break;
    let end = close + 1;
    let elseBlock = '';
    const after = result.slice(end).trimStart();
    if (after.startsWith('@else')) {
      const elseOpen = end + result.slice(end).indexOf('{');
      const elseClose = findMatchingBrace(result, elseOpen);
      if (elseClose >= 0) {
        elseBlock = result.slice(elseOpen + 1, elseClose);
        end = elseClose + 1;
      }
    }
    const body = result.slice(open + 1, close);
    let converted;
    if (elseBlock) {
      converted = `<ng-container *ngIf="${expr}; else __else${m.index}">${convertAll(body)}</ng-container><ng-template #__else${m.index}>${convertAll(elseBlock)}</ng-template>`;
    } else if (expr.includes(' as ')) {
      converted = `<ng-container *ngIf="${expr}">${convertAll(body)}</ng-container>`;
    } else {
      converted = `<ng-container *ngIf="${expr}">${convertAll(body)}</ng-container>`;
    }
    result = result.slice(0, m.index) + converted + result.slice(end);
    changed = true;
  }
  return result;
}

function convertAll(content) {
  let s = content;
  for (let i = 0; i < 20; i++) {
    const prev = s;
    s = convertSwitch(s);
    s = convertFor(s);
    s = convertIf(s);
    if (s === prev) break;
  }
  return s;
}

const files = walk(root).filter((f) => fs.readFileSync(f, 'utf8').includes('@if') || fs.readFileSync(f, 'utf8').includes('@for') || fs.readFileSync(f, 'utf8').includes('@switch'));
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const out = convertAll(raw);
  if (out !== raw) {
    fs.writeFileSync(f, out, 'utf8');
    console.log('Converted:', path.relative(root, f));
  }
}

console.log('Done. Files:', files.length);
