
import Express from "express";
import { addstockOut, deletestockOut, showstockOut, updatestockOut } from "../controllers/stock_out_con.mjs";


const router = Express.Router();

router.post('/addstockOut', addstockOut);
router.get('/showstockOut', showstockOut);
router.delete('/deletestockOut/:id', deletestockOut);
router.put('/updatestockOut/:id', updatestockOut);

export default router;