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
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  const homeHtml = fs.readFileSync('home.html', 'utf-8');
  res.write(homeHtml);
});

server.listen(4201);
