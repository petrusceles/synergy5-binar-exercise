const http = require('http');
const path = require("path");
const fs = require("fs");
const PUBLIC_DIRECTORY = path.join(__dirname, 'public')
const {users} = require("./db/users.json")
const {transactions} = require("./db/transactions.json")
const {products} = require("./db/products.json")

const getHTML = (fileName) => {
  const htmlFileIndex = path.join(PUBLIC_DIRECTORY, fileName);
  const htmlIndex = fs.readFileSync(htmlFileIndex, 'utf8');

  return htmlIndex
}


const serverMethod = (req,res) => {
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
    case "/login":
      const htmlLogin = getHTML('login.html')
      res.setHeader('Content-Type','text/html')
      res.writeHead(200)
      res.end(htmlLogin)
      return;
    case "/pages.js":
      const fileName = "public/pages.js"
      fs.readFile(fileName, (err,data) => {
        if (err) {
          res.writeHead(404, {"Content-Type": "text/plain"});
          res.write("error ya, filenya gak nemu");
          res.end();
        } else {
          res.setHeader('Content-Type', "text/javascript")
          res.writeHead(200)
          res.end(data)
        }
      })
      return;
    case "/gambar.png":
      const image = "public/gambar.png"

    case "/users":
      const usersJSON = JSON.stringify(users);
      resJSON(usersJSON,res)
      return;
    case "/transactions":
      const transactionsJSON = JSON.stringify(transactions);
      resJSON(transactionsJSON,res)
      return;
    case "/products":
      const productsJSON = JSON.stringify(products);
      resJSON(productsJSON,res)
      return;
    default:
      break;
  }
}

const resJSON = (dataJSON,res) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(dataJSON);
}


const server = http.createServer(serverMethod)
server.listen(7000,'127.0.0.1', () => {
    console.log('jalan ygy')
})