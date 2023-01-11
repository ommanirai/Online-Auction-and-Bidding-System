import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { viewBidders } from '../../../api/bidderAPI'
import { IMAGE } from '../../../config'
import BidderSidebar from '../../layout/BidderSidebar'

const BidderViewBidder = () => {
    const [bidders, setBidders] = useState([])
    const { id } = useParams()

    useEffect(() => {
        viewBidders(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setBidders(data)
                    console.log(data)
                }
            })
    }, [])

    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row ms-0'>
                    <div className='col-md-2 ps-0'>
                        <BidderSidebar />
                    </div>
                    <div className='col-md-10 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                View Bidder List:
                            </h4>
                            <Link to="/bidder/profile" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='my-2' />
                        </div>

                        <div className='w-100 pe-5 pt-3'>
                            {
                                bidders.length > 0 ?
                                    <table className='table table-hover table-bordered text-center'>
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Bidder Name</th>
                                                <th>Bidder Phone</th>
                                                <th>Bidder Address</th>
                                                <th>Product Image</th>
                                                <th>Product name</th>
                                                <th>Product Price</th>
                                                <th>Bidder Price</th>
                                                <th>Product Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bidders.map((bidder, i) => {
                                                    return <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{bidder.bidder.name}</td>
                                                        <td>{bidder.bidder.phone}</td>
                                                        <td>{bidder.bidder.address}</td>
                                                        <td>
                                                            <img src={`${IMAGE}/${bidder.product_image}`} alt={bidder.product_name} style={{ height: "100px" }} />
                                                        </td>
                                                        <td >{bidder.product_name}</td>
                                                        <td>{bidder.product_price}</td>
                                                        <td>{bidder.bidder_price}</td>
                                                        <td>{bidder.product_description}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className='alert alert-secondary fs-5'>There is no bidder available for this product.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BidderViewBidder