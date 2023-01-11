import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userList } from '../../../api/userAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const BidderView = () => {
    const [bidder, setBidder] = useState([])
    // const [error, setError] = useState('')
    useEffect(() => {
        userList()
            .then(data => {
                if (data.error) {
                    // setError(data.error)
                    console.log(data.error)
                }
                else {
                    setBidder(data)
                }
            })
    },[])
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row ms-0'>
                    <div className='col-md-3 ps-0'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                List of All Bidders:
                            </h4>
                            <Link to="/admin/dashboard" className='btn btn-primary'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-1 mb-4' />
                        </div>
                        <div className='container my-3 w-75'>
                            {
                                bidder.length > 0 ?
                                    <table className='table table-bordered table-hover text-center'>
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>User Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bidder.map((bidder, i) => {
                                                    return <tr>
                                                        {
                                                            bidder.role === 0 &&
                                                            <>
                                                                <td>{bidder.name}</td>
                                                                <td>{bidder.email}</td>
                                                                <td>{bidder.phone}</td>
                                                                <td>{bidder.address}</td>
                                                                <td>Bidder</td>
                                                                <td>
                                                                    <div className='btn-group'>
                                                                        <Link to={`/admin/bidderdetails/${bidder._id}`} className='btn btn-warning'><i className='bi bi-pencil-square' /></Link>

                                                                        <Link to={`/admin/deletebidder/${bidder._id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                                                                    </div>
                                                                </td>
                                                            </>
                                                        }
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className='alert alert-secondary fs-4'>There is no bidder available</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BidderView