// node scan/build.js -> scan/luma-scan.html (single file: inlines the shared demo engine and the LUMA address layer)
const fs = require('fs'), path = require('path'), d = __dirname, inl = f => fs.readFileSync(path.join(d, f), 'utf8').replace(/<\/script/gi, '<\\/script');
let h = fs.readFileSync(path.join(d, 'src/app.html'), 'utf8');
h = h.replace('/*%DEMO%*/', () => '').replace('/*%ADDR%*/', () => inl('../wallet/src/addr.js')).replace('/*%TOUR%*/', () => '').replace('/*%CONFIG%*/', () => process.env.LUMA_SCAN_CONFIG ? 'window.LUMA_SCAN_CONFIG=' + process.env.LUMA_SCAN_CONFIG + ';' : '');
fs.writeFileSync(path.join(d, 'luma-scan.html'), h); console.log('wrote luma-scan.html', (h.length / 1024).toFixed(0) + ' KB');
