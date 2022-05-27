const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  // process.exit();
  res.setHeader('Content-Type', 'text/html');

  const url = req.url;
  const method = req.method;

  if (url === '/') {
    const messageHtml = fs.readFileSync('message.html', 'utf-8');
    res.write(messageHtml);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  const homeHtml = fs.readFileSync('home.html', 'utf-8');
  res.write(homeHtml);
});

server.listen(4201);
