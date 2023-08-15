
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    product_id : String,
    product_name : String,
    available_quantity : String,
});

const mainStock = mongoose.model('Mainstock', userSchema);

export default mainStock;