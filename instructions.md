# Single CRUD API app (Node JS, Express, MongoDB)

## Installation / Configuration

### index.js
- Create a new folder and command to create package.json file
``` properties
npm init -y
```

- Create a new "index.js" file
- For testing
``` javascript
console.log("Hello");
```

``` properties
node index.js
```

- Update package.json
``` json
{
  "name": "single-crud-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "node index.js" // 
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- It will run index.js
``` properties
npm run serve
```

### Express
- Install Express for backend
``` properties
npm i express
```

- Add a .gitignore file in root folder to ignore "node_modules" folder
```
node_modules
```

- Check if express dependencies are installed in package.json
``` json
"dependencies": {
    "express": "^4.18.3"
}
```

- On https://www.npmjs.com/package/express, copy / paste boilerplate in index.js
``` javascript
const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
```

- Add request and reponse get method on "/"
``` javascript
app.get('/', (req, res) => {
    res.send("Hello from Node API")
})
```

- In browser : http://localhost:3000 URL will display "Hello from Node API" message
- In VSCode with RapidAPI Client will display all details about this endpoint

### nodemon
- To refresh automatically after update : install nodemon package
``` properties
npm i nodemon -D
```

- And update package.json
``` json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "node index.js",
    "dev": "nodemon index.js"
},
```

- Now, in shell :
``` properties
npm run dev
```

### MongoDB and Mongoose
- Install MongoDB and Mongoose
``` properties
npm i mongodb
npm i mongoose
```

- Update index.js to test database connection
``` javascript
const express = require('express')
// require mongoose
const mongoose = require('mongoose');
const app = express()


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

// GET route
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
})

// Test database connection
mongoose.connect("mongodb://localhost:27017/ticketDB")
.then(() => {
    console.log("Connected to database !");
})
.catch(() => {
    console.log("Connection failed !")
})
```

- And optimize it ! Try first to connect database and after run server
``` javascript
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
```

## Models
- Create a new folder "models" in application root folder and a "product.model.js" file inside it to create Product schema 
``` javascript
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
        },
        quantity: {
            type: Number,
            required: [true, "Please enter product quantity"],
            default: 0
        },
        price: {
            type: Number,
            required: [true, "Please enter product price"],
            default: 0
        },
        image: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true // createdAt and updatedAt
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
```












