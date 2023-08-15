import sales from "../models/sales.mjs";
import mongoose from "mongoose";

//add Sale
export const addSale = async(req, res) => {
    try{
        const { sales_id, product_id, sold_quantity, total_income } = req.body;

        const sold_date = new Date();

        const newSale = new sales({
            sales_id, product_id, sold_quantity, total_income, sold_date,
        });

        const savedSale = await newSale.save();

        res.status(201).json({ message: "Sale added successfully", Purchase: savedSale });
    } catch (error) {
        res.status(500).json({ message: "Failed to add new Sale", details: error.message });
    }
};

//fetch Sales
export const showSale = async(req, res) => {
    try {
        const allSales = await sales.find();

        if(allSales.length === 0){
            return res.status(404).json({ message: "No Sales"});
        }

        res.status(201).json(allSales);
        
    } catch (error) {
        console.error("Error fetching Sales", error);
        res.status(500).json({ message: "Error fetching Sales" });
    }
};

//Sale delete
export const deleteSale = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedSale = await sales.findByIdAndRemove(id);

        if (!deletedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }

        res.status(200).json({ message: "Sale deleted successfully", Sale: deletedSale });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete Sale", detailes: error.message });
    }
};

//purchase update
export const updateSale = async (req, res) => {
    try {
        const id = req.params.id;
        const { sales_id, product_id, sold_quantity, total_income, sold_date, } = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Sales id format" });
        }

        const update = { sales_id, product_id, sold_quantity, total_income, sold_date, };

        const updatedSale= await sales.findByIdAndUpdate(id, update, { new: true });

        if (!updatedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }

        res.status(200).json({ message: "Sale update successfully", Sale: updatedSale });

        } catch (error) {
            res.status(500).json({ error: "Failed to update Sale", details: error.message });
    }
};