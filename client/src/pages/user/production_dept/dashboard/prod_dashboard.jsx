import React from "react";

import Card from "../../../../components/user/dash_card/dash_card";

import inv from '../../../../repository/users/inv.png'
import add from '../../../../repository/users/add.png'
import req from '../../../../repository/users/req.png'
import stockout from '../../../../repository/users/stockout.png'
import product from '../../../../repository/users/product.png'


function Prod_Dashboard() {
    return (
        <>
            <section className="container">

                <br /><br />

                <div class="d-flex flex-wrap justify-content-center">
                    <Card
                        href='/prod_showinv'
                        imgSrc={inv}
                        cardText="Show Production Inventory"
                        bgColor=""
                    />
                    <Card
                        href="/prod_prodinv"
                        imgSrc={add}
                        cardText="Manage Production Inventory"
                        bgColor=""
                    />
                    <Card
                        href="/prod_showmanuinv"
                        imgSrc={product}
                        cardText="Manufactured Products"
                        bgColor=""
                    />
                    <Card
                        href="/prod_managemanuinv"
                        imgSrc={add}
                        cardText="Manage Manufactured Items"
                        bgColor=""
                    />
                    <Card
                        href="/stock_requests"
                        imgSrc={req}
                        cardText="Stock Requests"
                        bgColor=""
                    />
                    <Card
                        href="/stock_outs"
                        imgSrc={stockout}
                        cardText="Stock Outs"
                        bgColor=""
                    />
                </div>
            </section>
        </>
    )
}

export default Prod_Dashboard
