import React, { useState } from 'react';
import axios from 'axios';

function ManageSales() {

    const [fetchedSale, setAvailableSale] = useState('');
    const [saleSearchId, setSaleSearchId] = useState('');
    const [defaultId, setDefaultID] = useState('');

    const [isalesId, setInsertSalesId] = useState('');
    const [iproductId, setInsertProductId] = useState('');
    const [isoldQuantity, setInsertSoldQuantity] = useState('');
    const [itotalIncome, setInserttotalIncome] = useState('');

    const [usalesId, setUpdateSalesId] = useState('');
    const [uproductId, setUpdateProductId] = useState('');
    const [usoldQuantity, setUpdateSoldQuantity] = useState('');
    const [utotalIncome, setUpdatetotalIncome] = useState('');
    


    const SearchSale = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sales/showSales');
            const fetchedSales = response.data; 
    
            const isAvailable = fetchedSales.some(sale => sale.sales_id === saleSearchId);
            if (isAvailable) {
                console.log("Available");
    
                // Find the available sale
                const availableSale = fetchedSales.find(sale => sale.sales_id === saleSearchId);
                setAvailableSale(availableSale);
                console.log("Sale Details:", availableSale);

                const default_id = availableSale._id;
                setDefaultID(default_id);

                setUpdateSalesId(availableSale.sales_id);
                setUpdateProductId(availableSale.product_id);
                setUpdateSoldQuantity(availableSale.sold_quantity);
                setUpdatetotalIncome(availableSale.total_income);

            } else {
                console.log("Sale not available");
            }
        } catch (error) {
            console.error('Error fetching Sales', error);
            alert('Error fetching Sales');
        }
    };

    const handleInsert = async () => {
        try {
            window.confirm("Are you sure?");
            const response = await axios.post('http://localhost:5000/sales/addSale', {
                sales_id: isalesId,
                product_id: iproductId,
                sold_quantity: isoldQuantity,
                total_income: itotalIncome
            });

            if (response) {
                console.log("Inserted Successfully");
                alert("Sale Inserted Successfully");
            }

        } catch (error) {
            console.log("Insert Failed");
        }
    };

    const handleUpdate = async () => {

        if (!defaultId) {
            alert("Please select a sale to update.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/sales/updateSale/${defaultId}`, {
                sales_id: usalesId,
                product_id: uproductId,
                sold_quantity: usoldQuantity,
                total_income: utotalIncome,
            });

            if (response) {
                console.log("Updated Successfully");
            }

        } catch (error) {
            console.log("Update Failed",error);
        }
    };

    const handleDelete = async () => {
        if (!defaultId) {
            alert("Please select a sale to delete");
            return;
        }
        try {
            window.confirm("Are you Sure?");
            const response = await axios.delete(`http://localhost:5000/sales/deleteSale/${defaultId}`);
            alert("Sale deleted successfully");
            
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className='col-lg-12 text-center'>
                        Search Sale By ID:
                        <input
                            type="text"
                            placeholder="Enter Sales ID"
                            required
                            value={saleSearchId}
                            onChange={(e) => setSaleSearchId(e.target.value)} />
                        <button onClick={SearchSale}>Search</button>                      
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-4'>
                        <h2>Insert New Sale</h2>
                        <form onSubmit={handleInsert}>
                            <input
                                type="text"
                                required
                                placeholder="Sales ID"
                                value={isalesId}
                                onChange={(e) => setInsertSalesId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Product ID"
                                value={iproductId}
                                onChange={(e) => setInsertProductId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Soldd Quantity"
                                value={isoldQuantity}
                                onChange={(e) => setInsertSoldQuantity(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Income"
                                value={itotalIncome}
                                onChange={(e) => setInserttotalIncome(e.target.value)} /> <br />
                            <button type='submit'>Insert</button>
                        </form>

                    </div>

                    <div className='col-lg-4'>
                        <h2>Update Product</h2>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                required
                                placeholder="Sales ID"
                                value={usalesId}
                                onChange={(e) => setUpdateSalesId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Product ID"
                                value={uproductId}
                                onChange={(e) => setUpdateProductId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Sold Quantity"
                                value={usoldQuantity}
                                onChange={(e) => setUpdateSoldQuantity(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Income"
                                value={utotalIncome}
                                onChange={(e) => setUpdatetotalIncome(e.target.value)} /> <br />
                            <button type='submit'>Update</button>
                        </form>
                        
                    </div>

                    <div className='col-lg-4'>
                        <h2>Delete Product</h2>
                        
                        <button onClick={handleDelete}>Delete</button>
                    </div>

                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Sale Details</h2>
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Sales ID</th>
                                        <th>Product ID</th>
                                        <th>Sold Quantity</th>
                                        <th>Total Income</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{fetchedSale.sales_id}</td>
                                        <td>{fetchedSale.product_id}</td>
                                        <td>{fetchedSale.sold_quantity}</td>
                                        <td>{fetchedSale.total_income}</td>
                                        <td>{fetchedSale.sold_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>


        </>
    );
};

export default ManageSales;
