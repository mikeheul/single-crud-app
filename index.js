const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')

const app = express()
// middleware to manage JSON products
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// GET route
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
})

// ** GET ALL PRODUCTS 
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ** GET A SPECIFIC PRODUCT 
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ** ADD A PRODUCT 
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
})

// ** UPDATE A PRODUCT 
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// ** DELETE A PRODUCT 
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body)
        
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb://localhost:27017/productsDB")
.then(() => {
    console.log("Connected to database !");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
})
.catch(() => {
    console.log("Connection failed !")
})