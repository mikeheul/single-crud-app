const express = require('express')
const Product = require('./models/product.model.js');
const mongoose = require('mongoose');
require('dotenv').config();
const productRoute = require('./routes/product.route.js');

const app = express()

app.use(express.static(__dirname + '/public'))

// middlewares
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', __dirname + '/views');

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

