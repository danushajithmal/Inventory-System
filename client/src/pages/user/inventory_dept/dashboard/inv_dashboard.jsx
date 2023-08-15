import React from "react";

import Card from "../../../../components/user/dash_card/dash_card";

import inv from '../../../../repository/users/inv.png'
import add from '../../../../repository/users/add.png'
import req from '../../../../repository/users/req.png'
import stockout from '../../../../repository/users/stockout.png'

function Inv_Dashboard() {

  return (
    <>
      <section className="container">

        <hr />

        <br /><br />

        <div class="d-flex flex-wrap justify-content-center">
          <Card
            href='/inv_showinv'
            imgSrc={inv}
            cardText="Show Inventory"
            bgColor=""
          />
          <Card
            href="/inv_manageinv"
            imgSrc={add}
            cardText="Manage Inventory"
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

export default Inv_Dashboard
