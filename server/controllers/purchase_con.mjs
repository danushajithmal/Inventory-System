import purchases from "../models/purchase.mjs";
import mongoose from "mongoose";

//add purchase
export const addPurchase = async(req, res) => {
    try{
        const { purchase_id, product_id, purchased_quantity, total_cost } = req.body;

        const purchased_date = new Date();

        const newPurchase = new purchases({
            purchase_id, product_id, purchased_quantity,total_cost, purchased_date
        });

        const savedPurchase = await newPurchase.save();

        res.status(201).json({ message: "Purchase added successfully", Purchase: savedPurchase });
    } catch (error) {
        res.status(500).json({ message: "Failed to add new Purchase", details: error.message });
    }
};

//fetch purchase
export const showPurchase = async(req, res) => {
    try {
        const allpurchases = await purchases.find();

        if(allpurchases.length === 0){
            return res.status(404).json({ message: "No Purchases"});
        }

        res.status(201).json(allpurchases);
        
    } catch (error) {
        console.error("Error fetching perchases", error);
        res.status(500).json({ message: "Error fetching purchases" });
    }
};

//perchase delete
export const deletePurchase = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedPurchase = await purchases.findByIdAndRemove(id);

        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.status(200).json({ message: "Purchase deleted successfully", Purchase: deletedPurchase});

    } catch (error) {
        res.status(500).json({ error: "Failed to delete purchase", detailes: error.message });
    }
};

//purchase update
export const updatePurchase = async (req, res) => {
    try {
        const id = req.params.id;
        const { purchase_id, product_id, purchased_quantity, total_cost, purchased_date, } = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid purchase id format" });
        }

        const update = { purchase_id, product_id, purchased_quantity, total_cost, purchased_date, };

        const updatedPurchase = await purchases.findByIdAndUpdate(id, update, { new: true });

        if (!updatedPurchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        res.status(200).json({ message: "Purchase update successfully", Purchase: updatedPurchase });

        } catch (error) {
            res.status(500).json({ error: "Failed to update purchase", details: error.message });
    }
};