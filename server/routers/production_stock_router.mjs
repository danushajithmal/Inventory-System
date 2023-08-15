
import Express from "express";
import { addStock, deleteProduct, showStock, updateProduct } from "../controllers/production_stock_con.mjs";

const router = Express.Router();

router.post('/addStock', addStock);
router.get('/showStock', showStock);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/updateProduct/:id', updateProduct);

export default router;