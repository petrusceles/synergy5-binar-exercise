const express = require('express');
const dbConn = require("./configs/db_connection")

// Upload to Local
// const upload = require("./helpers/fileUpload");

// Upload to Cloud
const upload = require("./helpers/fileUploadCloudinary");
const cloudinary = require("./configs/cloudinary");

const app = express();

app.use(express.json());

const getProductsHandler = (req, res) => {
  // const maxPrice = req.query.max_price;
  // const minPrice = req.query.min_price;

  dbConn.query("select * from products").then(function (products) {
    res.json({
      status: "OK",
      message: "Success retrieving data",
      data: products.rows
    });

    return
  });

  // res.json(products.filter(product => product.price < maxPrice && product.price > minPrice));
}

const createProductHandler = (req, res) => {
  const { name, price } = req.body;

  // Validasi payload
  if (!name || !price) {
    res.status(400).send({
      status: "BAD_REQUEST",
      message: "Name and Price cannot be empty",
      data: null
    });

    return;
  }

  // Upload file to cloudinary
  const fileToUpload = req.file;

  const fileBase64 = fileToUpload.buffer.toString("base64");
  const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, (err, result) => {
    if (err) {

      res.status(400).send(`Gagal mengupload file ke cloudinary: ${err.message}`);

      return
    }

    // req.body.id = products[products.length - 1].id + 1;
    // req.body.picture = result.url;

    // products.push(req.body)

    dbConn.query("insert into products (name, price, stock, image) values ($1, $2, $3, $4)",
      [req.body.name, req.body.price, req.body.stock, result.url])
      .then(function () {
        res.status(201).json("Berhasil insert data ke database");

        return
      }).catch(err => {
        res.status(500).json("Gagal insert data ke database");

        return
      });
  });
}

const getProductDetailHandler = (req, res) => {
  // id -> nge get data ke database sesuai dengan id yang dikirim user
  const { id } = req.params;

  // const filteredProduct = products.filter(product => product.id === parseInt(id));

  // if (filteredProduct.length === 0) res.status(404).send("Product not found");
  // else res.send(filteredProduct[0]);

  dbConn.query("select * from products where id = $1", [id]).then(function (products) {
    if (products.rows.length !== 0)
      res.json({
        status: "OK",
        message: "Success retrieving data",
        data: products.rows[0]
      });
    else res.status(404).json({
      status: "NOT_FOUND",
      message: "Product not found",
      data: null
    });

    return
  })
}

const updateProductHandler = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  // const filteredProducts = products.filter(product => product.id === parseInt(id));

  // if (filteredProducts.length === 0) {
  //   res.status(404).send("Product not found");

  //   return
  // }

  // const updatedProducts = products.map(product => {
  //   if (product.id === parseInt(id)) {
  //     product.name = name;
  //     product.price = price;
  //   }

  //   return product;
  // })

  dbConn.query("update products set name = $1, price = $2, stock = $3 where id = $4",
    [name, price, stock, id])
    .then(function () {
      res.status(200).json({
        status: "OK",
        message: "Success updating product",
        data: {
          id, name, price, stock
        }
      });

      return
    }).catch(err => {
      res.status(500).json({
        status: "INTERNAL_SERVER_ERROR",
        message: err.message,
        data: null
      });

      return
    });
}

const deleteProductByIDHandler = (req, res) => {
  // id -> nge get data ke database sesuai dengan id yang dikirim user
  const id = req.param("id");
  // const filteredProduct = products.filter(product => product.id !== parseInt(id));

  // if (filteredProduct.length === products.length) res.status(404).send("Product not found");
  // else res.json(filteredProduct);

  dbConn.query("select * from products where id = $1", [id]).then(function (products) {
    if (products.rows.length !== 0) {
      dbConn.query("delete from products where id = $1", [id]).then(function (products) {
        res.json({
          status: "OK",
          message: "Success deleting product",
          data: {
            id
          }
        });
      })
    }
    else res.status(404).json({
      status: "NOT_FOUND",
      message: "Product not found",
      data: null
    });

    return
  })
}

const isAdmin = (req, res, next) => {
  if (req.query.role === 'admin') {
    next();

    return
  }

  res.status(401).send("Anda bukan admin");

  return
}

app.get("/api/products", getProductsHandler)
app.post("/api/products", isAdmin, upload.single("picture"), createProductHandler)
app.get("/api/products/:id", getProductDetailHandler)
app.put("/api/products/:id", updateProductHandler)
app.delete("/api/products/:id", deleteProductByIDHandler)

app.listen(1000, () => {
  console.log("Server running at http://127.0.0.1:1000")
})