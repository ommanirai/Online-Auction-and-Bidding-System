import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteProduct, productDetails } from '../../../api/productAPI'
import { isAuthenticated } from '../../../api/userAPI'
import { IMAGE } from '../../../config'
import AdminSidebar from '../../layout/AdminSidebar'

const DeleteProductByAdmin = () => {
    // const [category, setCategory] = useState('')
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { id } = useParams()
    const { token } = isAuthenticated()

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
    })

    const deleteCategory = (e) => {
        e.preventDefault()
        deleteProduct(id, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(data.message)
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
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                Delete Product:
                            </h4>
                            <Link to="/admin/products" className='btn btn-primary'>Go Back</Link>
                        </div>

                        <div className='w-75 '>
                            <hr className='mb-2 mt-2' />
                            {
                                showError()
                            }
                            {
                                showSuccess()
                            }
                        </div>

                        <div className='d-flex mt-2'>
                            <div className='image'>
                                <img src={`${IMAGE}/${product.product_image}`} alt={product.product_name} style={{ height: "250px" }} />
                            </div>
                            <div className='product-details ps-5'>
                                <h5 className='mt-1'>Product Name: {product.product_name}</h5>
                                {/* <h5 className='mt-1'>Product Category: {product.category.category_name}</h5> */}
                                <h5 className='mt-1'>Product Minimum Price: {product.product_price}</h5>
                                <p className='mt-1'> Product Description: {product.product_description}</p>
                                {
                                    !success &&
                                    <>
                                        <p className='fs-5 mt-3'>Are you sure you want to delete this product?</p>
                                        <button className='btn btn-danger mt-1' onClick={deleteCategory}>Delete Product</button>
                                    </>
                                }
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteProductByAdmin