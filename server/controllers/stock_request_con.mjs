import StockRequest from "../models/stock_request.mjs";
import mongoose from "mongoose";

//add request
export const addRequest = async(req, res) => {
    try{
        const { request_id, product_id, requested_quantity, from, to, status,} = req.body;

        const requested_date = new Date();

        const newRequest = new StockRequest({
            request_id, product_id, requested_quantity, from, to, status, requested_date,
        });

        const savedRequest = await newRequest.save();

        res.status(201).json({ message: "Request added successfully", stock: savedRequest });
    } catch (error) {
        res.status(500).json({ message: "Failed to add new Request", details: error.message });
    }
};

//fetch Requests
export const showRequest = async(req, res) => {
    try {
        const Requests = await StockRequest.find();

        if(Requests.length === 0){
            return res.status(404).json({ message: "No Requests"});
        }

        res.status(201).json(Requests);
        
    } catch (error) {
        console.error("Error fetching Requests", error);
        res.status(500).json({ message: "Error fetching Requests" });
    }
};

//Request delete
export const deleteRequest = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedRequest = await StockRequest.findByIdAndRemove(id);

        if (!deletedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: "Request deleted successfully", Request: deletedRequest});

    } catch (error) {
        res.status(500).json({ error: "Failed to delete Request", details: error.message });
    }
};

//Request update
export const updateRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const { request_id, product_id, requested_quantity, from, to, status, requested_date, } = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Request id format" });
        }

        const update = { request_id, product_id, requested_quantity, from, to, status, requested_date, };

        const updatedRequest = await StockRequest.findByIdAndUpdate(id, update, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json({ message: "Request update successfully", Request: updatedRequest });

        } catch (error) {
            res.status(500).json({ error: "Failed to update Request", details: error.message });
    }
};