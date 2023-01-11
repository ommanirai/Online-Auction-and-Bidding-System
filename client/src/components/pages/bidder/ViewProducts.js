import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../../api/productAPI'
import { isAuthenticated } from '../../../api/userAPI'
import { IMAGE } from '../../../config'
import BidderSidebar from '../../layout/BidderSidebar'

const ViewProducts = () => {
    const [products, setProduct] = useState([])

    var time = new Date().toLocaleTimeString();

    useEffect(() => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
    }, [time])
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
                                All Products:
                            </h4>
                            <Link to="/bidder/profile" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='my-2' />
                        </div>
                        <div className="album bg-light ">
                            {
                                products.length > 0 ?

                                    <div className='p-3'>
                                        <div className="row row-cols-md-4 g-4 pt-3">
                                            {
                                                products.map((product, i) => {
                                                    return <div className="col mb-3">
                                                        {
                                                            product.bid === true &&

                                                            <div className="card">
                                                                <img src={`${IMAGE}/${product.product_image}`} className="card-img-top mx-auto mt-4" alt={`${IMAGE}/${product.product_image}`} style={{ height: "250px", width: "250px" }} />
                                                                <div className="card-body text-center">
                                                                    <h5 className="card-title">Product Name: {product.product_name}</h5>
                                                                    <h5>Product Category: {product.category.category_name}</h5>
                                                                    <h5>Product Minimum Price: {product.product_price}</h5>
                                                                    <p className="card-text text-truncate">Product Description: {product.product_description}</p>
                                                                    <div className="d-flex justify-content-evenly my-3">
                                                                        <div className="btn-group">
                                                                            <Link to={`/bidder/bidproduct/${product._id}`} type="button" className="btn btn-lg btn-outline-info">Bid This Product</Link>
                                                                        </div>
                                                                        {/* <small className="text-muted btn btn-lg btn-outline-info">{time}</small> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className='text-secondary text-center fs-3 p-5'>There is no product available for bidding.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProducts