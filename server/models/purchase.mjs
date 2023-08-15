

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    purchase_id : String,
    product_id : String,
    purchased_quantity : String,
    total_cost: String,
    purchased_date: Date,
});

const purchases = mongoose.model('Purchase', userSchema);

export default purchases;