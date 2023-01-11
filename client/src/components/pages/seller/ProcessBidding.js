import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { goForBidding, productDetails } from '../../../api/productAPI'
import { IMAGE } from '../../../config'
import SellerSidebar from '../../layout/SellerSidebar'

const ProcessBidding = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [success, setSuccess] = useState('')

    useEffect(() => {
        productDetails(id)
            .then(data => {
                // console.log(data)
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
    }, [id])

    const applybidding = () => {
        goForBidding(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setSuccess(data.message)
                }
            })
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
                        <SellerSidebar />
                    </div>
                    <div className='col-md-9 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                Process for Bidding:
                            </h4>
                            <Link to="/seller/viewproduct" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='my-2' />
                            {
                                showSuccess()
                            }
                        </div>

                        <div className='products d-flex'>
                            <div className='product-image py-3'>
                                <img src={`${IMAGE}/${product.product_image}`} alt={product.product_name} style={{ height: "200px" }} />
                            </div>
                            <div className='product-details py-3 px-5'>
                                <h5 >Product Name:{product.product_name}</h5>
                                <h5>Product Minimum Price: {product.product_price}</h5>
                                {/* <h5>Category:{product.category.category_name}</h5> */}
                                <p className='fs-5'>Product Description:{product.product_description}</p>
                                {
                                    !success &&
                                    <button className='btn btn-info my-3' onClick={applybidding}>Apply for Bidding</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessBidding