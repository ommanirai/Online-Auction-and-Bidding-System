import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userList } from '../../../api/userAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const SellerView = () => {
    const [seller, setSeller] = useState([])
    // const [error, setError] = useState('')
    useEffect(() => {
        userList()
            .then(data => {
                if (data.error) {
                    // setError(data.error)
                    console.log(data.error)
                }
                else {
                    setSeller(data)
                }
            })
    },[])

    // const showError = () => {
    //     if (error) {
    //         return <div className='alert alert-danger'>{error}</div>
    //     }
    // }
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
                                List of All Sellers:
                            </h4>
                            <Link to="/admin/dashboard" className='btn btn-primary'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-1 mb-4' />
                        </div>
                        <div className='container my-3 w-75'>
                            {
                                seller.length > 0 ?
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
                                                seller.map((seller, i) => {
                                                    return <tr key={i}>
                                                        {
                                                            seller.role === 1 &&
                                                            <>
                                                                <td>{seller.name}</td>
                                                                <td>{seller.email}</td>
                                                                <td>{seller.phone}</td>
                                                                <td>{seller.address}</td>
                                                                <td>Seller</td>
                                                                <td>
                                                                    <div className='btn-group'>
                                                                        <Link to={`/admin/sellerdetails/${seller._id}`} className='btn btn-warning'><i className='bi bi-pencil-square' /></Link>

                                                                        <Link to={`/admin/deleteseller/${seller._id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
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
                                    <div className='alert alert-secondary fs-4'>There is no seller available</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerView