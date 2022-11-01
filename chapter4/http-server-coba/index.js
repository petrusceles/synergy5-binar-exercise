const http = require('http');
const path = require("path");
const fs = require("fs");
const PUBLIC_DIRECTORY = path.join(__dirname, 'public')

const getHTML = (fileName) => {
  const htmlFileIndex = path.join(PUBLIC_DIRECTORY, fileName);
  const htmlIndex = fs.readFileSync(htmlFileIndex, 'utf8');

  return htmlIndex
}

const iniServer = (req,res) => {
    switch (req.url) {
        case "/":
            const htmlIndex = getHTML('index.html')
            res.setHeader('Content-Type','text/html')
            res.writeHead(200)
            res.end(htmlIndex)
            return;
        case "/about":
            const htmlAbout = getHTML('about.html')
            res.setHeader('Content-Type','text/html')
            res.writeHead(200)
            res.end(htmlAbout)
            return;
        default:
            return;
    }
}

const server = http.createServer(iniServer)
server.listen(7000,'127.0.0.1', () => {
    console.log('jalan ygy')
})