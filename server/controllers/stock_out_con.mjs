import StockOut from "../models/stock_out.mjs";
import mongoose from "mongoose";

//add stockOut
export const addstockOut = async(req, res) => {
    try{
        const { release_id, product_id, released_quantity, from, to, status, } = req.body;

        const released_date = new Date();

        const newstockOut = new StockOut({
            release_id, product_id, released_quantity, from, to, status, released_date,
        });

        const savedstockOut = await newstockOut.save();

        res.status(201).json({ message: "added stock release successfully", stockOut: savedstockOut });
    } catch (error) {
        res.status(500).json({ message: "Failed to add new stock release", details: error.message });
    }
};

//fetch StockOuts
export const showstockOut = async(req, res) => {
    try {
        const stockOuts = await StockOut.find();

        if(stockOuts.length === 0){
            return res.status(404).json({ message: "No stock releases to show"});
        }

        res.status(201).json(stockOuts);
        
    } catch (error) {
        console.error("Error fetching stock releases", error);
        res.status(500).json({ message: "Error fetching stock releases" });
    }
};

//StockOut delete
export const deletestockOut = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedstockOut = await StockOut.findByIdAndRemove(id);

        if (!deletedstockOut) {
            return res.status(404).json({ message: "stock release not found" });
        }

        res.status(200).json({ message: "stock release deleted successfully", stockOut: deletedstockOut});

    } catch (error) {
        res.status(500).json({ error: "Failed to delete stock release", details: error.message });
    }
};

//StockOut update
export const updatestockOut = async (req, res) => {
    try {
        const id = req.params.id;
        const { release_id, product_id, released_quantity, from, to, status, released_date, } = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid stock release id format" });
        }

        const update = { release_id, product_id, released_quantity, from, to, status, released_date, };

        const updatedstockOut = await StockOut.findByIdAndUpdate(id, update, { new: true });

        if (!updatedstockOut) {
            return res.status(404).json({ message: "stock release not found" });
        }

        res.status(200).json({ message: "stock release updated successfully", stockOut: updatedstockOut });

        } catch (error) {
            res.status(500).json({ error: "Failed to update stock release", details: error.message });
    }
};