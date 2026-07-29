// Adds a `./design-tokens/*` subpath export to the published package.json
// so consuming apps can `@use 'pkg:@underlayerdev/ui/design-tokens'` in Sass.
// ng-packagr doesn't know about this subpath (it only tracks JS/TS entry
// points), so it's patched in after `ng build ui` runs.
import { readFileSync, writeFileSync } from 'node:fs';

const pkgPath = 'dist/ui/package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

pkg.exports ??= {};
pkg.exports['./design-tokens/*'] = './design-tokens/*';

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Patched dist/ui/package.json with ./design-tokens/* export');
