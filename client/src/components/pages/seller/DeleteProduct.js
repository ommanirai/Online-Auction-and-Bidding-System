import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteProduct, productDetails } from '../../../api/productAPI'
import { IMAGE } from '../../../config'
import SellerSidebar from '../../layout/SellerSidebar'


const DeleteProduct = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {
        productDetails(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    setSuccess('')
                }
                else {
                    setProduct(data)
                    setError('')
                }
            })
    }, [])

    const clickDelete = e => {
        e.preventDefault()
        deleteProduct(id)
            .then(data => {
                if (data.error) {
                    setError(data.error)
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
    const showError = () => {
        if (error) {
            return <div className=' alert alert-danger'>{error}</div>
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
                                Delete Product:
                            </h4>
                            <Link to="/seller/viewproduct" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-2 mb-4' />
                            {
                                showError()
                            }
                            {
                                showSuccess()
                            } 
                        </div>
                        <div className='d-flex w-75 my-5'>
                            <img src={`${IMAGE}/${product.product_image}`} style={{ height: "200px" }} />
                            <div className='p-3 border-start border-3 border-red w-75'>
                                <h4>Product Name:{product.product_name}</h4>
                                <h4>Product Price: Rs.{product.product_price}</h4>
                                <p className='text-truncate fs-5'>Description: {product.product_description}</p>
                            </div>
                        </div>
                        {
                            !success &&
                            <>
                                <p className='fs-4'>Are you sure you want to delete this product?</p>
                                <button className='btn btn-danger' onClick={clickDelete}>Delete Product</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteProduct