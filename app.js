const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit();
  res.setHeader('Content-Type', 'text/html');
  const homeHtml = fs.readFileSync('home.html', 'utf-8');
  res.write(homeHtml);
});

server.listen(4201);
