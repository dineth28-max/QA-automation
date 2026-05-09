import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 6666;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.join(__dirname, 'dist');

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' ) reqPath = '/index.html';
  const filePath = path.join(base, reqPath);
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // fallback to index.html for single-page app
      const indexPath = path.join(base, 'index.html');
      fs.readFile(indexPath, (err2, data2) => {
        if (err2) { res.statusCode = 404; res.end('Not found'); return; }
        res.setHeader('Content-Type', 'text/html');
        res.end(data2);
      });
      return;
    }
    const ext = path.extname(filePath);
    const type = mime[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', type);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(port, () => console.log(`Static server listening on port ${port}`));
