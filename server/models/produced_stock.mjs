
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    product_id : String,
    product_name : String,
    produced_quantity : String,
});

const producedStock = mongoose.model('producedstocks', userSchema);

export default producedStock;