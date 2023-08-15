import React, { useState } from "react";
import axios from "axios";

function StockOut() {

    const [fetchedRelease, setAvailableRelease] = useState('');
    const [releaseSearchId, setReleaseSearchId] = useState('');
    const [defaultId, setDefaultID] = useState('');

    const [ireleaseId, setInsertReleaseId] = useState('');
    const [iproductId, setInsertProductId] = useState('');
    const [ireleasedQuantity, setInsertReleasedQuantity] = useState('');
    const [ireleaseFrom, setInsertReleaseFrom] = useState('');
    const [ireleaseTo, setInsertReleaseTo] = useState('');

    const [ureleaseId, setUpdateReleaseId] = useState('');
    const [uproductId, setUpdateProductId] = useState('');
    const [ureleasedQuantity, setUpdateReleasedQuantity] = useState('');
    const [ureleaseFrom, setUpdateReleaseFrom] = useState('');
    const [ureleaseTo, setUpdateReleaseTo] = useState('');

    const [allReleases, setAllReleases] = useState([]);

    const SearchRelease = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stockouts/showstockOut');
            const fetchedReleases = response.data;

            const isAvailable = fetchedReleases.some(release => release.release_id === releaseSearchId);
            if (isAvailable) {
                console.log("Available");

                // Find the available product
                const availableRelease = fetchedReleases.find(release => release.release_id === releaseSearchId);
                setAvailableRelease(availableRelease);
                console.log("Release Details:", availableRelease);

                const default_id = availableRelease._id;
                setDefaultID(default_id);

                setUpdateReleaseId(availableRelease.release_id);
                setUpdateProductId(availableRelease.product_id);
                setUpdateReleasedQuantity(availableRelease.released_quantity);
                setUpdateReleaseFrom(availableRelease.from);
                setUpdateReleaseTo(availableRelease.to);

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
            const response = await axios.post('http://localhost:5000/stockouts/addstockOut', {
                release_id: ireleaseId,
                product_id: iproductId,
                released_quantity: ireleasedQuantity,
                from: ireleaseFrom,
                to: ireleaseTo,
                status: true,
            });

            if (response) {
                console.log("Released Successfully");
                alert("Released Successfully");
            }

        } catch (error) {
            console.log("Release Failed");
        }
    }

    const handleUpdate = async () => {
        if (!defaultId) {
            alert("Please select a product to update.");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/stockouts/updatestockOut/${defaultId}`, {
                release_id: ureleaseId,
                product_id: uproductId,
                released_quantity: ureleasedQuantity,
                from: ureleaseFrom,
                to: ureleaseTo,
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
            alert("Please search a release to delete");
            return;
        }
        try {
            window.confirm("Are you Sure?");
            const response = await axios.delete(`http://localhost:5000/stockouts/deletestockOut/${defaultId}`);
            alert("Release deleted successfully");

        } catch (error) {
            console.log(error);
        }
    };

    const handleShowAllReleases = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stockouts/showstockOut');
            if (response) {
                setAllReleases(response.data);
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
            <div className="container">
            <h1>Release Stocks</h1>
                <div className="row">
                    <div className='col-lg-12 text-center'>
                        Search Request By ID:
                        <input
                            type="text"
                            placeholder="Enter Request ID"
                            value={releaseSearchId}
                            onChange={(e) => setReleaseSearchId(e.target.value)} />
                        <button onClick={SearchRelease}>Search</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <h2>Create New Stock Release</h2>
                        <form onSubmit={handleInsert}>
                            Release ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Release ID"
                                value={ireleaseId}
                                onChange={(e) => setInsertReleaseId(e.target.value)} /> <br />
                            Product ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Product ID"
                                value={iproductId}
                                onChange={(e) => setInsertProductId(e.target.value)} /> <br />
                            Release Quantity: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Releasing Quantity"
                                value={ireleasedQuantity}
                                onChange={(e) => setInsertReleasedQuantity(e.target.value)} /> <br />
                            From:<br />
                            <select
                                name='sender'
                                required
                                value={ireleaseFrom}
                                onChange={(e) => setInsertReleaseFrom(e.target.value)} >
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
                                value={ireleaseTo}
                                onChange={(e) => setInsertReleaseTo(e.target.value)} >
                                <option value=''>Select Recipient</option>
                                <option value='Inventory Manager'>Inventory Manager</option>
                                <option value='Purchase Manager'>Purchase Manager</option>
                                <option value='Sales Manager'>Sales Manager</option>
                                <option value='Production Manager'>Production Manager</option>
                            </select>
                            <br /><br />

                            <input type='submit' value='Release' />
                        </form>
                    </div>

                    <div className="col-lg-4">
                        <h2>Update Stock Release</h2>
                        <form onSubmit={handleUpdate}>
                            Release ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Release ID"
                                value={ureleaseId}
                                onChange={(e) => setUpdateReleaseId(e.target.value)} /> <br />
                            Product ID: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Product ID"
                                value={uproductId}
                                onChange={(e) => setUpdateProductId(e.target.value)} /> <br />
                            Release Quantity: <br />
                            <input
                                type="text"
                                required
                                placeholder="Enter Releasing Quantity"
                                value={ureleasedQuantity}
                                onChange={(e) => setUpdateReleasedQuantity(e.target.value)} /> <br />
                            From:<br />
                            <select
                                name='sender'
                                required
                                value={ureleaseFrom}
                                onChange={(e) => setUpdateReleaseFrom(e.target.value)} >
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
                                value={ureleaseTo}
                                onChange={(e) => setUpdateReleaseTo(e.target.value)} >
                                <option value=''>Select Recipient</option>
                                <option value='Inventory Manager'>Inventory Manager</option>
                                <option value='Purchase Manager'>Purchase Manager</option>
                                <option value='Sales Manager'>Sales Manager</option>
                                <option value='Production Manager'>Production Manager</option>
                            </select>
                            <br /><br />

                            <input type='Submit' value='Update' />
                        </form>
                    </div>

                    <div className='col-lg-4'>
                        <h2>Delete Release</h2>

                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2>Release Details</h2>
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Release ID</th>
                                    <th>Product ID</th>
                                    <th>Released Quantity</th>
                                    <th>From:</th>
                                    <th>To:</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fetchedRelease.release_id}</td>
                                    <td>{fetchedRelease.product_id}</td>
                                    <td>{fetchedRelease.released_quantity}</td>
                                    <td>{fetchedRelease.from}</td>
                                    <td>{fetchedRelease.to}</td>
                                    <td>{fetchedRelease.released_date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <h1>Released Stocks</h1>
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        Click Below to Show all Stock Outs <br />
                        <button onClick={handleShowAllReleases}>Show</button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <table className='fl-table'>
                            <thead>
                                <tr>
                                    <th>Release ID</th>
                                    <th>Product ID</th>
                                    <th>Released Quantity</th>
                                    <th>From:</th>
                                    <th>To:</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allReleases.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.release_id}</td>
                                        <td>{item.product_id}</td>
                                        <td>{item.released_quantity}</td>
                                        <td>{item.from}</td>
                                        <td>{item.to}</td>
                                        <td>{item.released_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>




                </div>
            </div>
        </>
    )
}

export default StockOut