import React from "react";

import Card from "../../../../components/user/dash_card/dash_card";

import sales from '../../../../repository/users/sales.png'
import add from '../../../../repository/users/add.png'
import req from '../../../../repository/users/req.png'
import stockout from '../../../../repository/users/stockout.png'


function Sales_Dashboard() {
    return (
        <>
            <section className="container">

                <br /><br />

                <div class="d-flex flex-wrap justify-content-center">
                    <Card
                        href="sales_showsales"
                        imgSrc={sales}
                        cardText="Show Sales"
                        bgColor=""
                    />
                    <Card
                        href="sales_managesales"
                        imgSrc={add}
                        cardText="Manage Sales"
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

export default Sales_Dashboard
