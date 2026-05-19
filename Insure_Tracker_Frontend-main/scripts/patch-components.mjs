import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app');

const needsCommon = new Set();

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.component.html')) {
      const html = fs.readFileSync(p, 'utf8');
      if (/\*ngIf|\*ngFor|ngSwitch|\*ngSwitchCase/.test(html)) {
        const ts = p.replace('.html', '.ts');
        if (fs.existsSync(ts)) needsCommon.add(ts);
      }
    }
  }
}

walk(root);

const trackImport = `import { trackByIndex, trackByIdentity } from '../core/track-by';`;
const trackImportDeep = (depth) =>
  `import { trackByIndex, trackByIdentity } from '${'../'.repeat(depth)}core/track-by';`;

function depthFromCore(tsPath) {
  const rel = path.relative(path.join(root, '..'), tsPath).replace(/\\/g, '/');
  const parts = rel.split('/');
  return parts.length - 3; // src/app/... -> depth to core
}

for (const tsPath of needsCommon) {
  let s = fs.readFileSync(tsPath, 'utf8');
  if (s.includes('CommonModule')) continue;

  const depth = depthFromCore(tsPath);
  const ti = `import { trackByIndex, trackByIdentity } from '${'../'.repeat(depth)}core/track-by';`;

  if (!s.includes('@angular/common')) {
    s = s.replace(
      /from '@angular\/core';/,
      `from '@angular/core';\nimport { CommonModule } from '@angular/common';`
    );
    if (!s.includes("from '@angular/common'")) {
      s = `import { CommonModule } from '@angular/common';\n` + s;
    }
  } else if (!s.includes('CommonModule')) {
    s = s.replace(
      /import \{([^}]+)\} from '@angular\/common';/,
      (m, g) => {
        if (g.includes('CommonModule')) return m;
        return `import { CommonModule, ${g.trim()} } from '@angular/common';`;
      }
    );
  }

  if (!s.includes('trackByIndex')) {
    const coreLine = ti;
    s = s.replace(/^(import .+\n)+/m, (block) => block + coreLine + '\n');
  }

  s = s.replace(/imports:\s*\[([^\]]*)\]/, (m, inner) => {
    let parts = inner.split(',').map((x) => x.trim()).filter(Boolean);
    if (!parts.some((p) => p.includes('CommonModule'))) parts.unshift('CommonModule');
    return `imports: [${parts.join(', ')}]`;
  });

  if (!s.includes('trackByIndex = trackByIndex')) {
    s = s.replace(/export class (\w+) \{/, (m) =>
      m + '\n  readonly trackByIndex = trackByIndex;\n  readonly trackByIdentity = trackByIdentity;'
    );
  }

  fs.writeFileSync(tsPath, s, 'utf8');
  console.log('Patched', path.relative(root, tsPath));
}

console.log('Total:', needsCommon.size);
