import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategories } from '../../../api/categoryAPI'
import { editProduct, productDetails } from '../../../api/productAPI'
import { isAuthenticated } from '../../../api/userAPI'
import { IMAGE } from '../../../config'
import SellerSidebar from '../../layout/SellerSidebar'


const EditProduct = () => {
    const [product, setProduct] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        product_image: '',
        category: '',
        error: '',
    })
    const { id } = useParams()
    const { token } = isAuthenticated()
    // const file_ref = useRef()
    const select_ref = useRef()



    const [categories, setCategories] = useState([])
    const [success, setSuccess] = useState(false)
    // destructure product
    const { product_name, product_price, product_description, error } = product


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
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
            .catch(err => console.log(err))
    }, [success, id])

    const handleChange = name => e => {
        setProduct({ ...product, [name]: e.target.value })

    }

    const clickUpdate = e => {
        e.preventDefault()
        editProduct(id, product, token)
            .then(data => {
                if (data.error) {
                    setProduct({ ...product, error: data.error })
                }
                else {
                    setProduct({ ...product, product_name: '', product_price: '', product_description: '' })
                    setSuccess(true)
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
            return <div className='alert alert-success'>Product updated successfully.</div>
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
                                Edit Product:
                            </h4>
                            <Link to="/seller/viewproduct" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-2 mb-4' />
                        </div>
                        <div className='d-flex p-5'>
                            <img src={`${IMAGE}/${product.product_image}`} alt={product.product_name} style={{ height: "200px" }} />
                            <div className='p-3 border-start border-3 border-red'>
                                <h4>Product Name: {product.product_name}</h4>
                                <h4>Price: Rs.{product.product_price}</h4>
                                <h4>Category: {product.category.category_name}</h4>
                                <p className='text-truncate fs-5'>Description: {product.product_description}</p>
                            </div>
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
                        {
                            !success &&
                            <form className='shadow-lg p-5 w-75 '>
                                <div className='form-floating'>
                                    <input type={'text'} className='form-control' id='product_name' onChange={handleChange('product_name')} value={product_name} placeholder="Product Name" />
                                    <label htmlFor='product_name'>Product Name</label>
                                </div><br />

                                <div className='form-floating'>
                                    <input type={'text'} className='form-control' id='product_price' onChange={handleChange('product_price')} value={product_price} placeholder="Product Price" />
                                    <label htmlFor='product_price'>Product Price:</label>
                                </div><br />

                                <div className='form-floating'>
                                    <input type={'text'} className='form-control' id='product_description' onChange={handleChange('product_description')} value={product_description} placeholder="Product Description" />
                                    <label htmlFor='product_description'>Product Description:</label>
                                </div><br />

                                {/* <label htmlFor='product_image'>Product Image</label>
                                <input type={'file'} className='form-control mb-2' id='product_image' onChange={handleChange('product_image')} ref={file_ref}/> */}

                                <div className='form-floating'>
                                    <select id='category' className='form-control' onChange={handleChange('category')} ref={select_ref} placeholder="Category">
                                        <option>Choose Category</option>
                                        {
                                            categories.map((category, i) => {
                                                return <option key={i} value={category._id}>{category.category_name}</option>
                                            })
                                        }
                                    </select>
                                    <label htmlFor='category'>Category</label>
                                </div><br />
                                <button className='btn btn-info' onClick={clickUpdate}>Edit Product</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProduct