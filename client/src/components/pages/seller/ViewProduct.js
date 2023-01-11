import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { viewMyProducts } from '../../../api/productAPI'
import SellerSidebar from '../../layout/SellerSidebar'
import { IMAGE } from '../../../config'
import { isAuthenticated } from '../../../api/userAPI'

const ViewProduct = () => {
    const [products, setProduct] = useState([])
    const { user } = isAuthenticated()

    useEffect(() => {
        viewMyProducts(user._id)
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
                                View Product:
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
                                                <th>Product Price</th>
                                                <th>Category</th>
                                                <th>Product Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((product, i) => {
                                                    return <tr>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <img src={`${IMAGE}/${product.product_image}`} alt={product.product_name} style={{ height: "100px" }} />
                                                        </td>
                                                        <td >{product.product_name}</td>
                                                        <td>{product.product_price}</td>
                                                        <td>{product.category.category_name}</td>
                                                        <td>{product.product_description}</td>
                                                        <td className='d-flex justify-content-evenly'>
                                                            <div className='btn-group '>
                                                                <Link to={`/seller/updateproduct/${product._id}`} className='btn btn-warning'><i className='bi bi-pencil-square' /></Link>

                                                                <Link to={`/seller/deleteproduct/${product._id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>

                                                            </div>
                                                            {
                                                                product.bid === false ?

                                                                    <div className='bid '>
                                                                        <Link to={`/seller/goforbidding/${product._id}`} className='btn btn-primary'>Go For Bidding</Link>
                                                                    </div>
                                                                    :
                                                                    <div className='bid '>
                                                                        <Link to="#" className='btn btn-info'>in Bidding</Link>
                                                                    </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className='alert alert-secondary fs-5'>There is no product available.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct