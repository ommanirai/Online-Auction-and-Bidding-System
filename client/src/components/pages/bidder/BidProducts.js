import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { bidProducts } from '../../../api/bidderAPI'
import { productDetails } from '../../../api/productAPI'
import { isAuthenticated } from '../../../api/userAPI'
import { IMAGE } from '../../../config'
import BidderSidebar from '../../layout/BidderSidebar'

const BidProducts = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [bidder_price, setBidderPrice] = useState('')
    const { user } = isAuthenticated()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    useEffect(() => {
        productDetails(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
    }, [])

    const product_name = product.product_name
    const product_price = product.product_price
    const product_description = product.product_description
    const product_image = product.product_image
    const bidder = user._id
    const product_id = product._id


    const applyBid = (e) => {
        e.preventDefault()
        bidProducts(product_image, product_name, product_price, product_description, bidder, bidder_price, product_id)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess('You Bid This Product Successfully')
                    setError('')
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>{success}</div>
        }
    }


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
                                Bid This Product:
                            </h4>
                            <Link to="/bidder/profile" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='my-2' />
                            {
                                showError()
                            }
                            {
                                showSuccess()
                            }
                        </div>
                        <div className="d-flex w-75">
                            <img src={`${IMAGE}/${product.product_image}`} className="card-img-top mx-auto mt-4" alt={`${IMAGE}/${product.product_image}`} style={{ height: "250px", width: "250px" }} />
                            <div className="card-body ps-5 pt-3">
                                <h5 className="card-title">Product Name: {product.product_name}</h5>
                                <h5 className='my-2'>Product Minimum Price: {product.product_price}</h5>
                                <p className="card-text text-truncate">Product Description: {product.product_description}</p>
                                <form className='mt-4'>
                                    <div className='form-floating'>
                                        <input type='number' className='form-control' id='your_price' placeholder="Product Name" onChange={e => setBidderPrice(e.target.value)} value={bidder_price} />
                                        <label htmlFor='your_price'>Your Price For This Product</label>
                                    </div>
                                    {
                                        !success &&
                                        <button className='btn btn-lg btn-info mt-3' onClick={applyBid}>Apply Bid</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BidProducts