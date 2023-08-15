import React, { useEffect, useState } from "react";
import axios from "axios";


function ShowSales() {

    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/sales/showsales')
            .then((response) => {
                setSales(response.data);
            })
            .catch((error) => {
                console.error('Error fetching sales', error)
                alert("Error fetching sales");
            })
    })

    return (
        <>
            <div className="container">
                <table className="fl-table">
                    <tr>
                        <th>Sales ID</th>
                        <th>Product ID</th>
                        <th>Sold Quantity(kg)</th>
                        <th>Income</th>
                        <th>Date</th>
                    </tr>
                    <tbody>
                        {sales.map((item, index) => (
                            <tr key={index}>
                                <td>{item.sales_id}</td>
                                <td>{item.product_id}</td>
                                <td>{item.sold_quantity}</td>
                                <td>{item.total_income}</td>
                                <td>{item.sold_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowSales