
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    product_id : String,
    product_name : String,
    available_quantity : String,
});

const productionStock = mongoose.model('productionstocks', userSchema);

export default productionStock;