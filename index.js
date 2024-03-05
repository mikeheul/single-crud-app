const express = require('express')
const Product = require('./models/product.model.js')
const mongoose = require('mongoose');
require('dotenv').config()
const connectToDB = require('./models/db.js')
const productRoute = require('./routes/product.route.js')

const app = express()

// middleware to manage JSON products
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api/products", productRoute);

const dbURL = process.env.DB_URL

mongoose.connect(dbURL)
.then(() => {
    console.log("Connected to database !");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
})
.catch(() => {
    console.log("Connection failed !")
})

