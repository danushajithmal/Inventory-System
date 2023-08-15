
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    sales_id : String,
    product_id : String,
    sold_quantity : String,
    total_income: String,
    sold_date: Date,
});

const sales = mongoose.model('sales', userSchema);

export default sales;