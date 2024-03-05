const express = require('express')
const Product = require('./models/product.model.js')
const mongoose = require('mongoose');
require('dotenv').config()
const connectToDB = require('./models/db.js')
const productRoute = require('./routes/product.route.js')

const app = express()

// middleware to manage JSON products
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api/products", productRoute);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to display the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

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

