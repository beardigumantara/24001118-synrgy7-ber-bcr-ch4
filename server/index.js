const http = require('http');
const {PORT = 8000} = process.env;

const fs = require('fs');
const path = require('path');
const PUBLIC_DIR = path.join(__dirname, '/../public');

function getHTML(htmlFileName) {
 const htmlPath = path.join(PUBLIC_DIR, htmlFileName);
 return fs.readFileSync(htmlPath, 'utf8');
}

function onRequest(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(getHTML('index.html'));
  } else if (req.url === "/cars") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(getHTML('cars.html'));
  } else if (req.url.match("\.css$")) {
    const cssPath = path.join(PUBLIC_DIR, req.url);
    const fileStream = fs.createReadStream(cssPath, "utf-8");
    res.writeHead(200, {'Content-Type': 'text/css'});
    fileStream.pipe(res);
  } else if (req.url.match("\.png$")) {
    const imgPath = path.join(PUBLIC_DIR, req.url);
    const fileStream = fs.createReadStream(imgPath);
    res.writeHead(200, {'Content-Type': 'image/png'});
    fileStream.pipe(res);
  } else if (req.url.match("\.jpg$")) {
    const imgPath = path.join(PUBLIC_DIR, req.url);
    const fileStream = fs.createReadStream(imgPath);
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    fileStream.pipe(res);
  }else if (req.url.match("\.js$")) {
    const scriptPath = path.join(PUBLIC_DIR, req.url);
    const fileStream = fs.createReadStream(scriptPath);
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fileStream.pipe(res);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(getHTML('404.html | page not found'));
  }
}

const server = http.createServer(onRequest);

server.listen(PORT,'localhost', () => {
  console.log('Server is running on http://localhost:%d', PORT);
});
