const fs = require('fs');

const requestHandler = (req, res) => {
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
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  const homeHtml = fs.readFileSync('home.html', 'utf-8');
  res.write(homeHtml);
}

module.exports = {
    handler: requestHandler,
    someText: 'Some hardcoded code text'
};
