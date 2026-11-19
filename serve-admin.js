// LUMA Scan, admin edition: serves luma-scan.html on this machine with the LOCAL nodes and LOCAL control panels preset,
// so the Nodes / network-monitor tab works with no setup. Plain Node, no packages. Listens on 127.0.0.1 only.
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = +process.env.SCAN_PORT || 8095;
const CFG = { default: process.env.SCAN_NET || 'main',
  main: { ws: 'ws://127.0.0.1:6006', panel: 'http://127.0.0.1:8090' },
  test: { ws: 'ws://127.0.0.1:6106', panel: 'http://127.0.0.1:8091' } };
const FILE = path.join(__dirname, 'luma-scan.html');
http.createServer((req, res) => {
  if (!/^\/(index\.html)?(\?.*)?$/.test(req.url)) { res.writeHead(404); return res.end('not found'); }
  let h = fs.readFileSync(FILE, 'utf8');
  h = h.replace(/<script>window\.LUMA_SCAN_CONFIG=[^\n]*?<\/script>/, () => `<script>window.LUMA_SCAN_CONFIG=${JSON.stringify(CFG)};</script>`);
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }); res.end(h);
}).listen(PORT, '127.0.0.1', () => console.log('LUMA Scan (admin) on http://127.0.0.1:' + PORT));
