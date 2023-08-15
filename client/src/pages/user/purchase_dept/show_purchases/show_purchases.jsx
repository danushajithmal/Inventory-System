import React, { useEffect, useState } from "react";
import axios from "axios";


function ShowPurchases() {

    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/purchases/showPurchase')
            .then((response) => {
                setPurchases(response.data);
            })
            .catch((error) => {
                console.error('Error fetching purchases', error)
                alert("Error fetching purchases");
            })
    })

    return (
        <>
            <div className="container">
                <table className="fl-table">
                    <tr>
                        <th>Purchase ID</th>
                        <th>Product ID</th>
                        <th>Purchased Quantity(kg)</th>
                        <th>Cost</th>
                        <th>Date</th>
                    </tr>
                    <tbody>
                        {purchases.map((item, index) => (
                            <tr key={index}>
                                <td>{item.purchase_id}</td>
                                <td>{item.product_id}</td>
                                <td>{item.purchased_quantity}</td>
                                <td>{item.total_cost}</td>
                                <td>{item.purchased_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowPurchases