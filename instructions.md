# Single CRUD API app (Node JS, Express, MongoDB)

- [Single CRUD API app (Node JS, Express, MongoDB)](#single-crud-api-app-node-js-express-mongodb)
  - [Installation / Configuration](#installation--configuration)
    - [JSON Viewer](#json-viewer)
    - [index.js](#indexjs)
    - [Express](#express)
    - [nodemon](#nodemon)
    - [MongoDB and Mongoose](#mongodb-and-mongoose)
  - [Models](#models)
  - [MVC Structure](#mvc-structure)

## Installation / Configuration

### JSON Viewer
- Install JSON Viewer plugin in Google Chrome

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

- In MongoDB Compass, create a new database named "productsDB" with "products" collection

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
mongoose.connect("mongodb://localhost:27017/productsDB")
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

- Configure middleware to send JSON directly to MongoDB through Rapid API Client (VSCode extension)
``` javascript
const app = express()
app.use(express.json())
```

- In RapidAPI Client, create a new <u>POST</u> endpoint : http://localhost:3000/api/products and add JSON value (JSON tab in Body part) and send it !
``` json
[{
  "name": "pancake",
  "quantity": 2,
  "price": 3.99
},
{
  "name": "tomato",
  "quantity": 5,
  "price": 1.99
}]
```

- Create a new <u>GET</u> endpoint : **​http://localhost:3000/api/products** and update index.js
``` javascript
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
```
- GET product **http://localhost:3000/api/product/id** and update index.js
``` javascript
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
```
- UPDATE a particular product **http://localhost:3000/api/product/id** (and create an endpoint in RapidAPI Client)
``` javascript
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
```
- DELETE a particular product **http://localhost:3000/api/product/:id**
``` javascript
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
```

- Add middleware to post data in RapidAPI Client through URL Form encoded
``` javascript
const app = express()
// middleware to manage JSON products
app.use(express.json())
app.use(express.urlencoded({extended: false}))
```

## MVC Structure

- Optimize routes API well structured : create a "routes" folder (root) and "product.route.js" inside it, a "controllers" folder with "product.controller.js" inside it.

..index.js
``` javascript
const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const productRoute = require('./routes/product.route.js')

const app = express()

// middleware to manage JSON products
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api/products", productRoute);

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
```

..product.route.js
``` javascript
const express = require('express');
const Product = require('../models/product.model.js')
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js')

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
```

..product.controller.js
``` javascript
const Product = require('../models/product.model.js')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
}

const updateProduct = async (req, res) => {
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
}

const deleteProduct = async (req, res) => {
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
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
```























