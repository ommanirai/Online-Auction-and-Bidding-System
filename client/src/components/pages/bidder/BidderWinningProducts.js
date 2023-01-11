import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { viewBidders } from '../../../api/bidderAPI'
import BidderSidebar from '../../layout/BidderSidebar'

const BidderwinningProducts = () => {
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
                    // console.log(data)
                }
            })
    }, [])

    // const winner_bidder = bidders.filter(bidder=>{
    //     return Math.max(bidder.bidder_price)
    // })
    
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row ms-0'>
                    <div className='col-md-3 ps-0'>
                        <BidderSidebar />
                    </div>
                    <div className='col-md-9 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                Your Winning Products:
                            </h4>
                            <Link to="/bidder/profile" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-2 mb-4' />
                        </div>

                        <div className='winner'>
                           {
                            
                           }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BidderwinningProducts