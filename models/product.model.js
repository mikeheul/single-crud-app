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

// Define a virtual property to calculate total value
ProductSchema.virtual('totalValue').get(function() {
    return this.price * this.quantity;
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
