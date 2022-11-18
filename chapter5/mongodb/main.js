const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodbURI = "mongodb+srv://mongodbrafid:mongodbrafid@cluster0.nwfnj6l.mongodb.net/?retryWrites=true&w=majority"

const { Schema } = mongoose

mongoose.connect(mongodbURI)
  .then(res => console.log("connected to db"))
  .catch(err => console.log(err));

app.use(express.json());

const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
})

const Product = mongoose.model('Products', productSchema);

const getProductsHandler = (req, res) => {
  Product.find({}, (err, result) => {
    return res.json({
      status: "OK",
      message: "Success retrieving data",
      data: result
    });
  });
}

const createProductHandler = (req, res) => {
  const { name, price, stock } = req.body;

  const product = new Product({
    name,
    price,
    stock
  });

  product.save().then((result) => {
    return res.status(201).json({
      status: "CREATED",
      message: "Product created successfully",
      data: result
    })
  });
}

app.get("/api/products", getProductsHandler)
app.post("/api/products", createProductHandler)

app.listen(1000, () => {
  console.log("Server running at http://127.0.0.1:1000")
})