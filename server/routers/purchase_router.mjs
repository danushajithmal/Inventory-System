//purchase router.mjs

import express from "express";
import { addPurchase, deletePurchase, showPurchase, updatePurchase } from "../controllers/purchase_con.mjs";


const router = express.Router();

router.post('/addPurchase', addPurchase);
router.get('/showPurchase', showPurchase);
router.delete('/deletePurchase/:id', deletePurchase);
router.put('/updatePurchase/:id', updatePurchase);

export default router;