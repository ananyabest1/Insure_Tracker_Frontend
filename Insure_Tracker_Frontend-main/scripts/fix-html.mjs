import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const D = String.fromCharCode(100, 105, 118);
const open = '<' + D;
const close = '</' + D + '>';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

for (const f of walk(root)) {
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace(/<\/?\?div>/gi, (m) => (m.includes('/') ? close : open + '>'));
  s = s.replace(/<\/?\?motion>/gi, (m) => (m.includes('/') ? close : open + '>'));
  s = s.replace(/<\/?\?div /gi, (m) => (m.includes('/') ? close.slice(0, -1) + ' ' : open + ' '));
  s = s.replace(/<\/div><dt>/g, open + '><dt>');
  s = s.replace(/<\/?motion\b/g, (m) => m.replace(/motion/g, D));
  fs.writeFileSync(f, s, 'utf8');
}

console.log('Fixed', walk(root).length, 'HTML files');
