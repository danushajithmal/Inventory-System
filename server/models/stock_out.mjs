
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    release_id : String,
    product_id : String,
    released_quantity : String,
    from : String,
    to : String,
    status : Boolean,
    released_date : Date,
});

const StockOut = mongoose.model('Stockout', userSchema);

export default StockOut;