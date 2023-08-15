import React, { useState } from 'react';
import axios from 'axios';

function StockRequests() {

    const [fetchedRequest, setAvailableRequest] = useState('');
    const [requestSearchId, setRequestSearchId] = useState('');
    const [defaultId, setDefaultID] = useState('');

    const [irequestId, setInsertRequestId] = useState('');
    const [iproductId, setInsertProductId] = useState('');
    const [irequestedQuantity, setInsertRequestedQuantity] = useState('');
    const [irequestFrom, setInsertRequestFrom] = useState('');
    const [irequestTo, setInsertRequestTo] = useState('');

    const [urequestId, setUpdateRequestId] = useState();
    const [uproductId, setUpdateProductId] = useState('');
    const [urequestedQuantity, setUpdateRequestedQuantity] = useState('');
    const [urequestFrom, setUpdateRequestFrom] = useState('');
    const [urequestTo, setUpdateRequestTo] = useState('');

    const [allRequests, setAllRequests] = useState([]);

    const SearchRequest = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stockrequests/showRequest');
            const fetchedRequests = response.data;

            const isAvailable = fetchedRequests.some(request => request.request_id === requestSearchId);
            if (isAvailable) {
                console.log("Available");

                // Find the available product
                const availableRequest = fetchedRequests.find(request => request.request_id === requestSearchId);
                setAvailableRequest(availableRequest);
                console.log("Request Details:", availableRequest);

                const default_id = availableRequest._id;
                setDefaultID(default_id);

                setUpdateRequestId(availableRequest.request_id);
                setUpdateProductId(availableRequest.product_id);
                setUpdateRequestedQuantity(availableRequest.requested_quantity);
                setUpdateRequestFrom(availableRequest.from);
                setUpdateRequestTo(availableRequest.to);

            } else {
                console.log("Request is not available");
                alert("Request is not available")
            }
        } catch (error) {
            console.error('Error fetching Requests', error);
            alert('Error fetching Requests');
        }
    };

    const handleInsert = async () => {
        try {
            window.confirm("Are you sure?");
            const response = await axios.post('http://localhost:5000/stockrequests/addRequest', {
                request_id: irequestId,
                product_id: iproductId,
                requested_quantity: irequestedQuantity,
                from: irequestFrom,
                to: irequestTo,
            });

            if (response) {
                console.log("Inserted Successfully");
                alert("Request Inserted Successfully");
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
            const response = await axios.put(`http://localhost:5000/stockrequests/updateRequest/${defaultId}`, {
                request_id: urequestId,
                product_id: uproductId,
                requested_quantity: urequestedQuantity,
                from: urequestFrom,
                to: urequestTo,
            });

            if (response) {
                console.log("Updated Successfully");
                alert("Updated Successfully");
            }

        } catch (error) {
            console.log("Update Failed", error);
        }
    };

    const handleDelete = async () => {
        if (!defaultId) {
            alert("Please search a request to delete");
            return;
        }
        try {
            window.confirm("Are you Sure?");
            const response = await axios.delete(`http://localhost:5000/stockrequests/deleteRequest/${defaultId}`);
            alert("Request deleted successfully");

        } catch (error) {
            console.log(error);
        }
    };

    const handleShowAllRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stockrequests/showRequest');
            if (response) {
                setAllRequests(response.data);
                console.log(response.data);
            }
            else {
                console.log("Error Fetching")
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='container'>
                <h1>Send Stock Requests</h1>
                <div className="row">
                    <div className='col-lg-12 text-center'>
                        Search Request By ID:
                        <input
                            type="text"
                            placeholder="Enter Request ID"
                            value={requestSearchId}
                            onChange={(e) => setRequestSearchId(e.target.value)} />
                        <button onClick={SearchRequest}>Search</button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-4'>
                        <h2>Create New Request</h2>
                        <form onSubmit={handleInsert}>
                            Request ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Request ID"
                                value={irequestId}
                                onChange={(e) => setInsertRequestId(e.target.value)} /> <br />
                            Product ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Product ID"
                                value={iproductId}
                                onChange={(e) => setInsertProductId(e.target.value)} /> <br />
                            Requested Quantity: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Reqeusted Quantity"
                                value={irequestedQuantity}
                                onChange={(e) => setInsertRequestedQuantity(e.target.value)} /> <br />
                            From:<br />
                            <select
                                name='sender'
                                required
                                value={irequestFrom}
                                onChange={(e) => setInsertRequestFrom(e.target.value)} >
                                <option value=''>Select Recipient</option>
                                <option value='Inventory Manager'>Inventory Manager</option>
                                <option value='Purchase Manager'>Purchase Manager</option>
                                <option value='Sales Manager'>Sales Manager</option>
                                <option value='Production Manager'>Production Manager</option>
                            </select>
                            <br />
                            To:<br />
                            <select
                                type="reciever"
                                required
                                value={irequestTo}
                                onChange={(e) => setInsertRequestTo(e.target.value)} >
                                <option value=''>Select Recipient</option>
                                <option value='Inventory Manager'>Inventory Manager</option>
                                <option value='Purchase Manager'>Purchase Manager</option>
                                <option value='Sales Manager'>Sales Manager</option>
                                <option value='Production Manager'>Production Manager</option>
                            </select>
                            <br /><br />

                            <input type='submit' value='Add' />
                        </form>

                    </div>

                    <div className='col-lg-4'>
                        <h2>Update Request</h2>
                        <form onSubmit={handleUpdate}>
                            Request ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Request ID"
                                value={urequestId}
                                onChange={(e) => setUpdateRequestId(e.target.value)} /> <br />
                            Product ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Product ID"
                                value={uproductId}
                                onChange={(e) => setUpdateProductId(e.target.value)} /> <br />
                            Requested Quantity: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Reqeusted Quantity"
                                value={urequestedQuantity}
                                onChange={(e) => setUpdateRequestedQuantity(e.target.value)} /> <br />
                            From: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Recipient"
                                value={urequestFrom}
                                onChange={(e) => setUpdateRequestFrom(e.target.value)} /> <br />
                            To: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Reciever"
                                value={urequestTo}
                                onChange={(e) => setUpdateRequestTo(e.target.value)} /> <br />
                            <br/>

                            <input type='Submit' value='Update'/>

                        </form>
                    </div>

                    <div className='col-lg-4'>
                        <h2>Delete Request</h2>

                        <button onClick={handleDelete}>Delete</button>
                    </div>

                </div>


                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2>Request Details</h2>
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Product ID</th>
                                    <th>Requested Quantity</th>
                                    <th>From:</th>
                                    <th>To:</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fetchedRequest.request_id}</td>
                                    <td>{fetchedRequest.product_id}</td>
                                    <td>{fetchedRequest.requested_quantity}</td>
                                    <td>{fetchedRequest.from}</td>
                                    <td>{fetchedRequest.to}</td>
                                    <td>{fetchedRequest.requested_date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='container'>
                    <h1>Recieved Requests</h1>
                    <div className='row'>
                        <div className='col-lg-12 text-center'>
                            Click Below to Show all Recived Requests <br />
                            <button onClick={handleShowAllRequests}>Show</button>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-12 text-center'>
                            <table className='fl-table'>
                                <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Product ID</th>
                                        <th>Requested Quantity</th>
                                        <th>From:</th>
                                        <th>To:</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allRequests.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.request_id}</td>
                                            <td>{item.product_id}</td>
                                            <td>{item.requested_quantity}</td>
                                            <td>{item.from}</td>
                                            <td>{item.to}</td>
                                            <td>{item.requested_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div>

        </>
    );
};

export default StockRequests;
