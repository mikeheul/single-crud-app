const express = require('express')
const mongoose = require('mongoose');
const app = express()

// GET route
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
})

mongoose.connect("mongodb://localhost:27017/ticketDB")
.then(() => {
    console.log("Connected to database !");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
})
.catch(() => {
    console.log("Connection failed !")
})