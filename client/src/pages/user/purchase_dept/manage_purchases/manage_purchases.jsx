import React, { useState } from 'react';
import axios from 'axios';

function ManagePurchases() {

    const [fetchedPurchase, setAvailablePurchase] = useState('');
    const [purchaseSearchId, setPurchaseSearchId] = useState('');
    const [defaultId, setDefaultID] = useState('');

    const [ipurchaseId, setInsertPurchaseId] = useState('');
    const [iproductId, setInsertProductId] = useState('');
    const [ipurchasedQuantity, setInsertPurchasedQuantity] = useState('');
    const [itotalCost, setInserttotalCost] = useState('');

    const [upurchaseId, setUpdatePurchaseId] = useState('');
    const [uproductId, setUpdateProductId] = useState('');
    const [upurchasedQuantity, setUpdatePurchasedQuantity] = useState('');
    const [utotalCost, setUpdatetotalCost] = useState('');
    


    const SearchPurchase = async () => {
        try {
            const response = await axios.get('http://localhost:5000/purchases/showPurchase');
            const fetchedPurchases = response.data; 
    
            const isAvailable = fetchedPurchases.some(purchase => purchase.purchase_id === purchaseSearchId);
            if (isAvailable) {
                console.log("Available");
    
                // Find the available Purchase
                const availablePurchase = fetchedPurchases.find(purchase => purchase.purchase_id === purchaseSearchId);
                setAvailablePurchase(availablePurchase);
                console.log("Sale Details:", availablePurchase);

                const default_id = availablePurchase._id;
                setDefaultID(default_id);

                setUpdatePurchaseId(availablePurchase.purchase_id);
                setUpdateProductId(availablePurchase.product_id);
                setUpdatePurchasedQuantity(availablePurchase.purchased_quantity);
                setUpdatetotalCost(availablePurchase.total_cost);

            } else {
                console.log("Purchase not available");
            }
        } catch (error) {
            console.error('Error fetching Purchases', error);
            alert('Error fetching Purchases');
        }
    };

    const handleInsert = async () => {
        try {
            window.confirm("Are you sure?");
            const response = await axios.post('http://localhost:5000/purchases/addPurchase', {
                purchase_id: ipurchaseId,
                product_id: iproductId,
                purchased_quantity: ipurchasedQuantity,
                total_cost: itotalCost,
            });

            if (response) {
                console.log("Inserted Successfully");
                alert("Purchase Inserted Successfully");
            }

        } catch (error) {
            console.log("Insert Failed");
        }
    };

    const handleUpdate = async () => {

        if (!defaultId) {
            alert("Please select a Purchase to update.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/purchases/updatePurchase/${defaultId}`, {
                purchase_id: upurchaseId,
                product_id: uproductId,
                purchased_quantity: upurchasedQuantity,
                total_cost: utotalCost,
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
            alert("Please select a purchase to delete");
            return;
        }
        try {
            window.confirm("Are you Sure?");
            const response = await axios.delete(`http://localhost:5000/purchases/deletePurchase/${defaultId}`);
            alert("Purchase deleted successfully");
            
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className='col-lg-12 text-center'>
                        Search Purchase By ID:
                        <input
                            type="text"
                            placeholder="Enter purchase ID"
                            required
                            value={purchaseSearchId}
                            onChange={(e) => setPurchaseSearchId(e.target.value)} />
                        <button onClick={SearchPurchase}>Search</button>                      
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-4'>
                        <h2>Insert New Purchase</h2>
                        <form onSubmit={handleInsert}>
                            <input
                                type="text"
                                required
                                placeholder="Purchase ID"
                                value={ipurchaseId}
                                onChange={(e) => setInsertPurchaseId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Product ID"
                                value={iproductId}
                                onChange={(e) => setInsertProductId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Purchased Quantity"
                                value={ipurchasedQuantity}
                                onChange={(e) => setInsertPurchasedQuantity(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Cost"
                                value={itotalCost}
                                onChange={(e) => setInserttotalCost(e.target.value)} /> <br />
                            <button type='submit'>Insert</button>
                        </form>

                    </div>

                    <div className='col-lg-4'>
                        <h2>Update Purchase</h2>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                required
                                placeholder="Purchase ID"
                                value={upurchaseId}
                                onChange={(e) => setUpdatePurchaseId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Product ID"
                                value={uproductId}
                                onChange={(e) => setUpdateProductId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Purchased Quantity"
                                value={upurchasedQuantity}
                                onChange={(e) => setUpdatePurchasedQuantity(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Cost"
                                value={utotalCost}
                                onChange={(e) => setUpdatetotalCost(e.target.value)} /> <br />
                            <button type='submit'>Update</button>
                        </form>
                        
                    </div>

                    <div className='col-lg-4'>
                        <h2>Delete Purchase</h2>
                        
                        <button onClick={handleDelete}>Delete</button>
                    </div>

                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Purchase Details</h2>
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>Purchase ID</th>
                                        <th>Product ID</th>
                                        <th>Purchased Quantity</th>
                                        <th>Total Cost</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{fetchedPurchase.purchase_id}</td>
                                        <td>{fetchedPurchase.product_id}</td>
                                        <td>{fetchedPurchase.purchased_quantity}</td>
                                        <td>{fetchedPurchase.total_cost}</td>
                                        <td>{fetchedPurchase.purchased_date}</td>
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

export default ManagePurchases;
