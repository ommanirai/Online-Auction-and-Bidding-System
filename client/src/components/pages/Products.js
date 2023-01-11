import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { viewBidderProducts } from '../../api/bidderAPI'
import { getProducts } from '../../api/productAPI'
import { isAuthenticated } from '../../api/userAPI'
import { IMAGE } from '../../config'

const Products = () => {
    const [products, setProduct] = useState([])
    const [bidded_product, setBiddedProduct] = useState([])

    var time = new Date().toLocaleTimeString();

    const { user } = isAuthenticated()

    useEffect(() => {
        getProducts()
            .then(data => {
                // console.log(data)
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
        // viewBidderProducts(user._id)
        //     .then(data => {
        //         if (data.error) {
        //             console.log(data.error)
        //         }
        //         else {
        //             setBiddedProduct(data)
        //         }
        //     })

    }, [])
    return (
        <>
            <div className='row p-5'>
                <div className='row col-md-3'></div>
                <div className='row col-md-6 text-center'>
                    <h1 className="fw-light">Auction & Bid The Products Online</h1>
                    <p className="lead">A Complete Solution For Managing Online Auctions, Selling Products and Bids</p>
                    <div className='product-processing'>
                        <Link to="/register" className="btn btn-lg btn-primary mx-2 my-3">Auction Your Products</Link>
                        <Link to="/register" className="btn btn-lg btn-secondary mx-2 my-3">Bid Products</Link>
                    </div>
                </div>
                <div className='row col-md-3'></div>
            </div>
            <div className="album bg-light">
                {
                    products.length > 0 ?

                        <div className='py-4 px-5'>
                            <div className="row row-cols-md-4 g-4">
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
                                                                {
                                                                    (user && user.role == 0) ?
                                                                        <Link to={`/bidder/bidproduct/${product._id}`} type="button" className="btn btn-lg btn-outline-info">Bid This Product</Link>
                                                                        :
                                                                        <Link to={'/register'} type="button" className="btn btn-lg btn-outline-info">Bid This Product</Link>
                                                                }
                                                            </div>
                                                            {/* <small className="text-muted btn btn-lg btn-outline-info">{time}</small> */}
                                                        </div>
                                                        {/* <button type="button" className="btn btn-sm btn-outline-secondary">تعديل</button> */}
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
        </>
    )
}

export default Products