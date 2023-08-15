

import Express from "express";
import { addStock, deleteProduct, showProductById, showStock, updateProduct } from "../controllers/main_stock_con.mjs";

const router = Express.Router();

router.post('/addStock', addStock);
router.get('/showStock', showStock);
router.get('/showProduct/:id', showProductById);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/updateProduct/:id', updateProduct);

export default router;