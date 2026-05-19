/**
 * Converts Angular 17+ control flow to Angular 16 structural directives.
 * Run: node scripts/migrate-templates.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(__dirname, '..', 'src');

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith('.html')) files.push(p);
  }
  return files;
}

function convert(content) {
  let out = content;
  // @if (expr; as v) { ... } @else { ... }
  out = out.replace(
    /@if\s*\(\s*([^)]+?)\s*;\s*as\s+(\w+)\s*\)\s*\{([\s\S]*?)\}\s*@else\s*\{([\s\S]*?)\}/g,
    '<ng-container *ngIf="$1 as $2">$3</ng-container><ng-template [ngIf]="$1 && false">$4</ng-template>'
  );
  // Simpler: multi-pass with stack parser would be ideal; use iterative regex for common patterns

  // @for (x of y; track z) { body }
  out = out.replace(
    /@for\s*\(\s*(\w+)\s+of\s+([^;]+?)\s*;\s*track\s+([^)]+)\)\s*\{([\s\S]*?)\}/g,
    (_m, item, list, track, body) => {
      const trackExpr = track.trim() === '$index' ? 'trackByIndex' : `trackByValue`;
      return `<ng-container *ngFor="let ${item} of ${list.trim()}; trackBy: ${trackExpr}">${body}</ng-container>`;
    }
  );

  // @if (expr) { body }
  out = out.replace(/@if\s*\(\s*([^)]+)\s*\)\s*\{([\s\S]*?)\}/g, '<ng-container *ngIf="$1">$2</ng-container>');

  // @else { body }  (after @if blocks converted, handle remaining)
  out = out.replace(/@else\s*\{([\s\S]*?)\}/g, '<ng-template ngIfElse>$1</ng-template>');

  return out;
}

// Manual list - script is helper; full conversion done in committed files
console.log('Use committed HTML migrations.');
