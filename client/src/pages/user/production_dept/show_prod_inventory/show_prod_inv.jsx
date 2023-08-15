import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowProdInv() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/prod_stocks/showStock')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products', error)
                alert("Error fetching products");
            })
    })

    return (
        <>
            <div className="container">
                <table className="fl-table">
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Available Quantity(kg)</th>
                    </tr>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product_id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.available_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowProdInv