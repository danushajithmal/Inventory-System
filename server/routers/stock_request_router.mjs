import express from "express";
import { addRequest, deleteRequest, showRequest, updateRequest } from "../controllers/stock_request_con.mjs";


const router = express.Router();

router.post('/addRequest', addRequest);
router.get('/showRequest', showRequest);
router.delete('/deleteRequest/:id', deleteRequest);
router.put('/updateRequest/:id', updateRequest);

export default router;