const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml' };
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(__dirname,'.' + (pathname.endsWith('/') ? pathname+'index.html' : pathname));
    if (!file.startsWith(__dirname + path.sep)) { res.writeHead(403).end(); return; }
    if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    const content = await fs.readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(8000,'127.0.0.1',() => console.log('UX Audit Lab: http://127.0.0.1:8000'));
