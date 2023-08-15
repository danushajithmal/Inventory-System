import React, { useState } from 'react';
import axios from 'axios';

function ManageProdInventory() {

    const [fetchedProduct, setAvailableProduct] = useState('');
    const [productSearchId, setProductSearchId] = useState('');
    const [defaultId, setDefaultID] = useState('');

    const [iproductId, setInsertProductId] = useState('');
    const [iproductName, setInsertProductName] = useState('');
    const [iproductQuantity, setInsertProductQuantity] = useState('');

    const [uproductId, setUpdateProductId] = useState('');
    const [uproductName, setUpdateProductName] = useState('');
    const [uproductQuantity, setUpdateProductQuantity] = useState('');
    


    const SearchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:5000/prod_stocks/showStock');
            const fetchedProducts = response.data; // Assuming setFetchedProducts is a state setter
    
            const isAvailable = fetchedProducts.some(product => product.product_id === productSearchId);
            if (isAvailable) {
                console.log("Available");
    
                // Find the available product
                const availableProduct = fetchedProducts.find(product => product.product_id === productSearchId);
                setAvailableProduct(availableProduct);
                console.log("Product Details:", availableProduct);

                const default_id = availableProduct._id;
                setDefaultID(default_id);

                setUpdateProductId(availableProduct.product_id);
                setUpdateProductName(availableProduct.product_name);
                setUpdateProductQuantity(availableProduct.available_quantity);

            } else {
                console.log("Product not available");
            }
        } catch (error) {
            console.error('Error fetching products', error);
            alert('Error fetching products');
        }
    };

    const handleInsert = async () => {
        try {
            window.confirm("Are you sure?");
            const response = await axios.post('http://localhost:5000/prod_stocks/addStock', {
                product_id: iproductId,
                product_name: iproductName,
                available_quantity: iproductQuantity,
            });

            if (response) {
                console.log("Inserted Successfully");
                alert("Product Inserted Successfully");
            }

        } catch (error) {
            console.log("Insert Failed");
        }
    };

    const handleUpdate = async () => {

        if (!defaultId) {
            alert("Please select a product to update.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/prod_stocks/updateStock/${defaultId}`, {
                product_id: uproductId,
                product_name: uproductName,
                available_quantity: uproductQuantity,
            });

            if (response) {
                console.log("Updated Successfully");
                alert("Updated Successfully")
            }

        } catch (error) {
            console.log("Update Failed",error);
        }
    };

    const handleDelete = async () => {
        if (!defaultId) {
            alert("Please select a product to delete");
            return;
        }
        try {
            window.confirm("Are you Sure?");
            const response = await axios.delete(`http://localhost:5000/prod_stocks/deletetock/${defaultId}`);
            alert("product deleted successfully");
            
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className='col-lg-12 text-center'>
                        Search Product By ID:
                        <input
                            type="text"
                            required
                            placeholder="Enter Product ID"
                            value={productSearchId}
                            onChange={(e) => setProductSearchId(e.target.value)} />
                        <button onClick={SearchProduct} type='Submit'>Search</button> 
                                            
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-4'>
                        <h2>Insert New Product</h2>
                        <form onSubmit={handleInsert}>
                            <input
                                type="text"
                                required
                                placeholder="Product ID"
                                value={iproductId}
                                onChange={(e) => setInsertProductId(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Product Name"
                                value={iproductName}
                                onChange={(e) => setInsertProductName(e.target.value)} /> <br />
                            <input
                                type="text"
                                required
                                placeholder="Quantity"
                                value={iproductQuantity}
                                onChange={(e) => setInsertProductQuantity(e.target.value)} /> <br />
                            <button type='Submit'>Insert</button>
                        </form>

                    </div>

                    <div className='col-lg-4'>
                        <h2>Update Product</h2>
                        <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            required
                            placeholder="Product ID"
                            value={uproductId}
                            onChange={(e) => setUpdateProductId(e.target.value)} /> <br />
                        <input
                            type="text"
                            required
                            placeholder="Product Name"
                            value={uproductName}
                            onChange={(e) => setUpdateProductName(e.target.value)} /> <br />
                        <input
                            type="text"
                            required
                            placeholder="Quantity"
                            value={uproductQuantity}
                            onChange={(e) => setUpdateProductQuantity(e.target.value)} /> <br />
                        <button type='Submit'>Update</button>
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
                            <h2>Product Details</h2>
                            <table className="fl-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Available Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{fetchedProduct.product_id}</td>
                                        <td>{fetchedProduct.product_name}</td>
                                        <td>{fetchedProduct.available_quantity}</td>
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

export default ManageProdInventory;
