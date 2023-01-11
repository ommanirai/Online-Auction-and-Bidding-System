import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { maximumPrice, viewBidders } from '../../../api/bidderAPI'
import { IMAGE } from '../../../config'
import SellerSidebar from '../../layout/SellerSidebar'

const ViewBidder = () => {
    const [bidders, setBidders] = useState([])
    const { id } = useParams()
    const [winner,setWinner] = useState({})
    const navigate = useNavigate()

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

    const findBiddingWinner = (e) =>{
        e.preventDefault()
        maximumPrice(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data)
                setWinner(data)
                window.alert(`${data.bidder.name} won the bid with price ${data.bidder_price}`)
            }
        })
        

    }

    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row ms-0'>
                    <div className='col-md-2 ps-0'>
                        <SellerSidebar />
                    </div>
                    <div className='col-md-10 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                View Bidder List:
                            </h4>
                            <Link to="/seller/profile" className='btn btn-info'>Go Back</Link>
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
                        <div className='text-center mt-4'>
                            <button className='btn btn-lg btn-info' onClick={findBiddingWinner}>Finalize Bidding Winner</button>
                        </div>
                        {/* {
                        setTimeout(() => {
                            navigate("/bidder/winningproducts")
                        },                         60000)
                        } */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewBidder