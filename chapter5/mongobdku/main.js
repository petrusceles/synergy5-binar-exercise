const express = require('express')
const app = express();

const mongoose = require('mongoose');
const { Schema } = mongoose

const mongoDbUri = 'mongodb+srv://mongodblearn:987poi123@cluster0.mrawfxe.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDbUri).then((res) => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

app.use(express.json());
const productSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
  })
const Product = mongoose.model('Products', productSchema);
const product = {
    create: async (req,res) => {
        try {
            const {name,price,stock} = req.body;
    
            if (!name || !price || !stock) {
                return res.status(400).json({
                    status:"BAD_REQUEST",
                    message:"all fields must not be empty",
                    data:{}
                })
            }
    
            const isProductExist = await Product.findOne({name}).exec();

            if (isProductExist) {
                return res.status(400).json({
                    status:"BAD_REQUEST",
                    message:`product with name ${name} is already exist`,
                    data:{}
                })
            }
            const product = new Product({
                name,price,stock
            })
    
            product.save().then((data) => {
                return res.status(201).json({
                    status:'OK',
                    message:"product created",
                    data
                })
            })
        } catch (err) {
            return res.status(500).json({
                status:"INTERNAL_SERVER_ERROR",
                message:err,
                data:{}
            })
        }
    },

    read: async (req,res) => {
        try {
            const products = await Product.find({})
            return res.status(200).json({
                status:'OK',
                message:"products retrieved",
                data:products
            })
        } catch (err) {
            return res.status(500).json({
                status:"INTERNAL_SERVER_ERROR",
                message:err,
                data:{}
            })
        }
    },

    readById: async (req,res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(400).json({
                    status:"BAD_REQUEST",
                    message:`product id should be provided`,
                    data:{}
                })
            }

            const product = await Product.findById(id)
            if (!product) {
                return res.status(404).json({
                    status:"NOT_FOUND",
                    message:`product with iod ${id} is not available`,
                    data:{}
                })
            }

            return res.status(200).json({
                status:"OK",
                message:`product found`,
                data:product
            })
        } catch (err) {
            return res.status(500).json({
                status:"INTERNAL_SERVER_ERROR",
                message:err,
                data:{}
            })
        }
    }, 
    update: async (req,res) => {
        try {
            const {id} = req.params;
            const {name,price,stock} = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(id, {name,price,stock},{returnDocument:'after'})
            if (!updatedProduct) {
                return res.status(404).json({
                    status:"NOT_FOUND",
                    message:`product with id ${id} is not available`,
                    data:{}
                })
            }

            return res.status(200).json({
                status:"OK",
                message:`product updated`,
                data:updatedProduct
            })
        } catch (err) {
            return res.status(500).json({
                status:"INTERNAL_SERVER_ERROR",
                message:err,
                data:{}
            })
        }
    },

    delete: async (req,res) => {
        try {
            const {id} = req.params;
            const deletedProduct = await Product.findByIdAndDelete(id)

            if (!deletedProduct) {
                return res.status(404).json({
                    status:"NOT_FOUND",
                    message:`product with id ${id} is not available`,
                    data:{}
                })
            }
            return res.status(200).json({
                status:"OK",
                message:`product deleted`,
                data:deletedProduct
            })
        } catch (err) {
            return res.status(500).json({
                status:"INTERNAL_SERVER_ERROR",
                message:err,
                data:{}
            })
        }
    }
}

const handler = (req,res) => {
    res.json({
        status:"OK"
    })
}

app.post('/api/product', product.create)
app.get('/api/product', product.read)
app.get('/api/product/:id', product.readById)
app.put('/api/product/:id', product.update)
app.delete('/api/product/:id', product.delete)

app.listen(7000, () => {
    console.log("Konek pak")
})
