// node build.js  ->  index.html (single file; GitHub Pages serves it from the repo root)
// The node address lives in config.json. Change it, run this, commit, push.
const fs = require('fs'), path = require('path'), d = __dirname;
const inl = f => fs.readFileSync(path.join(d, f), 'utf8').replace(/<\/script/gi, '<\\/script');
const cfg = JSON.parse(fs.readFileSync(path.join(d, 'config.json'), 'utf8'));
let h = fs.readFileSync(path.join(d, 'src/app.html'), 'utf8');
h = h.replace('/*%DEMO%*/', () => '').replace('/*%ADDR%*/', () => inl('src/addr.js')).replace('/*%TOUR%*/', () => '')
     .replace('/*%CONFIG%*/', () => 'window.LUMA_SCAN_CONFIG=' + JSON.stringify(cfg) + ';');
fs.writeFileSync(path.join(d, 'index.html'), h);
console.log('wrote index.html', (h.length / 1024).toFixed(0) + ' KB');
