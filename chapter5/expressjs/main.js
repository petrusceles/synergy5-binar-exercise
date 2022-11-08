const express = require('express');

// Upload to Local
// const upload = require("./helpers/fileUpload");

// Upload to Cloud
const upload = require("./helpers/fileUploadCloudinary");
const cloudinary = require("./configs/cloudinary");

const app = express();

app.use(express.json());

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 100000,
  },
  {
    id: 2,
    name: "HP",
    price: 2000,
  },
  {
    id: 3,
    name: "Remot",
    price: 1000,
  }
]

const getProductsHandler = (req, res) => {
  const maxPrice = req.query.max_price;
  const minPrice = req.query.min_price;

  res.json(products.filter(product => product.price < maxPrice && product.price > minPrice));
}

const createProductHandler = (req, res) => {
  const { name, price } = req.body;

  // Validasi payload
  if (!name || !price) {
    res.status(400).send("Name and Price should not be empty");

    return;
  }

  // Upload file to cloudinary
  const fileToUpload = req.file;

  const fileBase64 = fileToUpload.buffer.toString("base64");
  const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;
  cloudinary.uploader.upload(file, (err, result) => {
    if (err) {
      res.status(400).send("Gagal mengupload file ke cloudinary");

      return
    }

    req.body.id = products[products.length - 1].id + 1;
    req.body.picture = result.url;

    products.push(req.body)

    res.status(201).send(products);

    return;
  });
}

const getProductDetailHandler = (req, res) => {
  // id -> nge get data ke database sesuai dengan id yang dikirim user
  const { id } = req.params;
  const filteredProduct = products.filter(product => product.id === parseInt(id));

  if (filteredProduct.length === 0) res.status(404).send("Product not found");
  else res.send(filteredProduct[0]);

  return
}

const updateProductHandler = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const filteredProducts = products.filter(product => product.id === parseInt(id));

  if (filteredProducts.length === 0) {
    res.status(404).send("Product not found");

    return
  }

  const updatedProducts = products.map(product => {
    if (product.id === parseInt(id)) {
      product.name = name;
      product.price = price;
    }

    return product;
  })

  res.json(updatedProducts);

  return
}

const deleteProductByIDHandler = (req, res) => {
  // id -> nge get data ke database sesuai dengan id yang dikirim user
  const id = req.param("id");
  const filteredProduct = products.filter(product => product.id !== parseInt(id));

  if (filteredProduct.length === products.length) res.status(404).send("Product not found");
  else res.json(filteredProduct);

  return
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