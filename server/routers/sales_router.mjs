import express from "express";
import { addSale, deleteSale, showSale, updateSale } from "../controllers/sales_con.mjs";

const router = express.Router();

router.post('/addSale', addSale);
router.get('/showSales', showSale);
router.delete('/deleteSale/:id', deleteSale);
router.put('/updateSale/:id', updateSale);

export default router;