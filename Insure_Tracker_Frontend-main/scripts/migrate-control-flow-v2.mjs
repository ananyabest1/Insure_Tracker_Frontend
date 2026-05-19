import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function findMatchingBrace(s, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function convertIf(content) {
  let result = content;
  let searchFrom = 0;
  while (true) {
    const m = result.indexOf('@if (', searchFrom);
    if (m < 0) break;
    const exprStart = m + 5;
    let depth = 0;
    let exprEnd = -1;
    for (let i = exprStart; i < result.length; i++) {
      const ch = result[i];
      if (ch === '(') depth++;
      else if (ch === ')') {
        if (depth === 0) {
          exprEnd = i;
          break;
        }
        depth--;
      }
    }
    if (exprEnd < 0) {
      searchFrom = m + 1;
      continue;
    }
    const expr = result.slice(exprStart, exprEnd).trim();
    let braceStart = exprEnd + 1;
    while (result[braceStart] === ' ' || result[braceStart] === '\n' || result[braceStart] === '\r') braceStart++;
    if (result[braceStart] !== '{') {
      searchFrom = m + 1;
      continue;
    }
    const bodyEnd = findMatchingBrace(result, braceStart);
    if (bodyEnd < 0) break;
    const body = result.slice(braceStart + 1, bodyEnd);
    let end = bodyEnd + 1;
    let elseBlock = '';
    const rest = result.slice(end).replace(/^\s+/, '');
    if (rest.startsWith('@else')) {
      const elseBrace = end + result.slice(end).indexOf('{');
      const elseEnd = findMatchingBrace(result, elseBrace);
      if (elseEnd >= 0) {
        elseBlock = result.slice(elseBrace + 1, elseEnd);
        end = elseEnd + 1;
      }
    }
    const id = m;
    let converted;
    if (elseBlock) {
      converted =
        `<ng-container *ngIf="${expr}; else _e${id}">${convertAll(body)}</ng-container>` +
        `<ng-template #_e${id}>${convertAll(elseBlock)}</ng-template>`;
    } else {
      converted = `<ng-container *ngIf="${expr}">${convertAll(body)}</ng-container>`;
    }
    result = result.slice(0, m) + converted + result.slice(end);
    searchFrom = m + converted.length;
  }
  return result;
}

function convertSwitch(content) {
  let result = content;
  let searchFrom = 0;
  while (true) {
    const m = result.indexOf('@switch (', searchFrom);
    if (m < 0) break;
    const exprStart = m + 9;
    let depth = 0;
    let exprEnd = -1;
    for (let i = exprStart; i < result.length; i++) {
      const ch = result[i];
      if (ch === '(') depth++;
      else if (ch === ')') {
        if (depth === 0) {
          exprEnd = i;
          break;
        }
        depth--;
      }
    }
    if (exprEnd < 0) break;
    const expr = result.slice(exprStart, exprEnd).trim();
    let braceStart = exprEnd + 1;
    while (' \n\r'.includes(result[braceStart])) braceStart++;
    const bodyEnd = findMatchingBrace(result, braceStart);
    if (bodyEnd < 0) break;
    const inner = result.slice(braceStart + 1, bodyEnd);
    let converted = `<ng-container [ngSwitch]="${expr}">`;
    const caseRe = /@case\s*\(\s*([^)]+)\s*\)\s*\{/g;
    let cm;
    let last = 0;
    while ((cm = caseRe.exec(inner)) !== null) {
      const caseBrace = cm.index + cm[0].length - 1;
      const caseEnd = findMatchingBrace(inner, caseBrace);
      converted += `<ng-container *ngSwitchCase="${cm[1].trim()}">${convertAll(inner.slice(caseBrace + 1, caseEnd))}</ng-container>`;
      last = caseEnd + 1;
    }
    const defM = /@default\s*\{/.exec(inner.slice(last));
    if (defM) {
      const defBrace = last + defM.index + defM[0].length - 1;
      const defEnd = findMatchingBrace(inner, defBrace);
      converted += `<ng-container *ngSwitchDefault>${convertAll(inner.slice(defBrace + 1, defEnd))}</ng-container>`;
    }
    converted += '</ng-container>';
    result = result.slice(0, m) + converted + result.slice(bodyEnd + 1);
    searchFrom = m + converted.length;
  }
  return result;
}

function convertAll(content) {
  let s = content;
  for (let i = 0; i < 30; i++) {
    const prev = s;
    s = convertSwitch(s);
    s = convertIf(s);
    if (s === prev) break;
  }
  return s;
}

const files = process.argv.slice(2);
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const out = convertAll(raw);
  if (out !== raw) {
    fs.writeFileSync(f, out, 'utf8');
    console.log('OK', f);
  }
}
