import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../../api/productAPI'
import { IMAGE } from '../../../config'
import SellerSidebar from '../../layout/SellerSidebar'

const ProductInBid = () => {
    const [products, setProduct] = useState([])

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
    }, [])

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
                                Product In Bid:
                            </h4>
                            <Link to="/seller/profile" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-2 mb-4' />
                        </div>

                        <div className='w-100'>
                            {
                                products.length > 0 ?
                                    <table className='table table-hover table-bordered text-center'>
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Product Image</th>
                                                <th>Product name</th>
                                                <th>Product Minimum Price</th>
                                                <th>Category</th>
                                                <th>Product Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((product, i) => {
                                                    return <tr>
                                                        {
                                                            product.bid === true &&
                                                            <>
                                                                <td>{i + 1}</td>
                                                                <td>
                                                                    <img src={`${IMAGE}/${product.product_image}`} alt={product.product_name} style={{ height: "100px" }} />
                                                                </td>
                                                                <td >{product.product_name}</td>
                                                                <td>{product.product_price}</td>
                                                                <td>{product.category.category_name}</td>
                                                                <td>{product.product_description}</td>
                                                                <td >
                                                                    <Link to={`/seller/viewbidder/${product._id}`} className='btn btn-warning'>See Bidders</Link>
                                                                </td>
                                                            </>
                                                        }
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className='alert alert-secondary fs-5'>There is no product in bidding.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInBid