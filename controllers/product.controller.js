const Product = require('../models/product.model.js')

const displayProducts = async (req, res) => {
    try {
        // sort products by price DESC
        const products = await Product.find({}).sort( { price: -1 } )
        res.render('index', { products });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProductsAPI = async (req, res) => {
    try {
        // sort products by price DESC
        const products = await Product.find({}).sort( { price: -1 } )
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const displayProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        
        res.render('product', { product });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProductAPI = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createProductAPI = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).send(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
}

const updateProductAPI = async (req, res) => {
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

const deleteProductAPI = async (req, res) => {
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

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body)
        
        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        res.redirect('/api/products/displayProducts');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getProductsAPI,
    getProductAPI,
    createProductAPI,
    updateProductAPI,
    deleteProductAPI,
    deleteProduct,
    displayProducts,
    displayProduct
}