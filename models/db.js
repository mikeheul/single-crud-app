// const express = require('express')
// const mongoose = require('mongoose');
// const app = express()

// require('dotenv').config()

// const dbURL = process.env.DB_URL

// const connectToDB = () => {
//     try {
//         mongoose.connect(dbURL, {
//             autoIndex: true
//         })
//         console.log('Connected to database !');
//         app.listen(3000, () => {
//             console.log("Server is running on port 3000");
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }
// module.exports = connectToDB;