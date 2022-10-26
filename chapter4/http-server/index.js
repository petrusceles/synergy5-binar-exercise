const http = require('http');
const path = require("path");
const fs = require("fs");
const PUBLIC_DIRECTORY = path.join(__dirname, 'public')

const getHTML = (fileName) => {
  const htmlFileIndex = path.join(PUBLIC_DIRECTORY, fileName);
  const htmlIndex = fs.readFileSync(htmlFileIndex, 'utf8');

  return htmlIndex
}

const onRequest = (req, res) => {
  switch (req.url) {
    case "/":
      const htmlIndex = getHTML('index.html');

      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(htmlIndex);

      return
    case "/about":
      const htmlAbout = getHTML('about.html');

      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(htmlAbout);

      return
    case "/json":
      const person = {
        name: 'Aldi',
        age: 100
      }

      const personJSON = JSON.stringify(person); // object js ke json
      // JSON.parse(person) // json ke object js

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(personJSON);
  }
}

const server = http.createServer(onRequest)

server.listen(2000, '127.0.0.1', () => {
  console.log("Server sudah berjalan, silakan buka http://localhost:2000");
})