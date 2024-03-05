const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')

const app = express()
app.use(express.json())

// GET route
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).send(product)
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