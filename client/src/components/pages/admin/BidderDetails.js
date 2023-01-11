import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { detailOfUser } from '../../../api/userAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const BidderDetails = () => {
    const [seller, setSeller] = useState({})
    const { id } = useParams()

    useEffect(() => {
        detailOfUser(id)
            .then(data => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setSeller(data)
                }
            })
    }, [id])
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
                                Bidder Details:
                            </h4>
                            <Link to="/admin/listofbidder" className='btn btn-primary'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-1 mb-4' />
                        </div>
                        <div className='admin-details mx-auto'>
                            <h5 className='mb-2'>Email: {seller.email} </h5>
                            <h5 className='mb-2'>Username: {seller.name}</h5>
                            <h5 className='mb-2'>Phone: {seller.phone}</h5>
                            <h5 className='mb-2'>Address: {seller.address}</h5>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BidderDetails