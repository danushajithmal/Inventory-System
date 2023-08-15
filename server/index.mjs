//index.mjs

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usersrouter from './routers/users_router.mjs'
import mainStockRouter from './routers/main_stock_router.mjs';
import purchasesRouter from './routers/purchase_router.mjs';
import stockrequestRouter from './routers/stock_request_router.mjs';
import stockoutRouter from './routers/stock_out_router.mjs';
import salesRouter from './routers/sales_router.mjs'
import productionstockRouter from './routers/production_stock_router.mjs';
import producedstockRouter from './routers/produced_stock_router.mjs'


dotenv.config();

const app = express();

const PORT = 5000;
const URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());

// Connect to MONGODB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// users Router
app.use('/users', usersrouter);
// mainstock Router
app.use('/mainstocks', mainStockRouter);
// purchases Router
app.use('/purchases', purchasesRouter);
// stockrequest Router
app.use('/stockrequests', stockrequestRouter);
// stockout Router
app.use('/stockouts', stockoutRouter);
// sales Router
app.use('/sales', salesRouter);
// productionstock Router
app.use('/prod_stocks', productionstockRouter);
// produced stock Router
app.use('/manu_stocks', producedstockRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});