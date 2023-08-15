
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    request_id : String,
    product_id : String,
    requested_quantity : String,
    from : String,
    to : String,
    status : Boolean,
    requested_date : Date
});

const StockRequest = mongoose.model('Stockrequest', userSchema);

export default StockRequest;