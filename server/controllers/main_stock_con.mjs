import mainStock from "../models/main_stock.mjs";
import mongoose from "mongoose";

//add product
export const addStock = async(req, res) => {
    try{
        const { product_id, product_name, available_quantity, } = req.body;

        const newStock = new mainStock({
            product_id, product_name, available_quantity,
        });

        const savedStock = await newStock.save();

        res.status(201).json({ message: "Stock added successfully", stock: savedStock });
    } catch (error) {
        res.status(500).json({ message: "Failed to add new Stock", details: error.message });
    }
};

//fetch products
export const showStock = async(req, res) => {
    try {
        const stock = await mainStock.find();

        if(stock.length === 0){
            return res.status(404).json({ message: "No Stock"});
        }

        res.status(201).json(stock);
        
    } catch (error) {
        console.error("Error fetching stock", error);
        res.status(500).json({ message: "Error fetching stock" });
    }
};

//fetch a product
export const showProductById = async (req, res) => {
    const productid = req.params.id; 

    try {
        const product = await mainStock.findById(productid);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ message: "Error fetching product" });
    }
};

//product delete
export const deleteProduct = async (req, res) => {
    try {
        const productid = req.params.id;

        const deletedProduct = await mainStock.findByIdAndRemove(productid);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct});

    } catch (error) {
        res.status(500).json({ error: "Failed to delete product", detailes: error.message });
    }
};

//product update
export const updateProduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const { product_id, product_name, available_quantity, } = req.body;

        if(!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(400).json({ message: "Invalid product id format" });
        }

        const update = { product_id, product_name, available_quantity, };

        const updatedProduct = await mainStock.findByIdAndUpdate(productid, update, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product update successfully", product: updatedProduct });

        } catch (error) {
            res.status(500).json({ error: "Failed to update product", details: error.message });
    }
};