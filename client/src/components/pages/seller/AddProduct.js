import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../../api/categoryAPI'
import { addProduct } from '../../../api/productAPI'
import { isAuthenticated } from '../../../api/userAPI'
import SellerSidebar from '../../layout/SellerSidebar'


const AddProduct = () => {
    const { user } = isAuthenticated()
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        product_name: '',
        product_price: '',
        product_description: '',
        product_image: '',
        category: '',
        error: '',
        user: '',
        success: false,
        formData: '' // to add the product image
    })
    // destructure product
    const { product_name, product_price, product_description, product_image, category, error, success, formData } = product

    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                    setProduct({ ...product, formData: new FormData }) // initialize form data
                }
            })
            .catch(err => console.log(err))
    }, [])

    // store value
    const handleChange = name => e => {
        if (name === 'product_image') {
            formData.set(name, e.target.files[0])
            setProduct({ ...product, [name]: e.target.files[0] })

        }
        else {
            formData.set(name, e.target.value)
            setProduct({ ...product, [name]: e.target.value })
        }

    }

    const handleSubmit = e => {
        e.preventDefault()
        setProduct({ ...product, user: user._id })
        formData.set('user', user._id)
        // console.log(product)
        addProduct(formData)
            .then(data => {
                if (data.error) {
                    setProduct({ ...product, error: data.error })
                }
                else {
                    setProduct({ ...product, success: true, product_name: '', product_price: '', product_description: '' })
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
            return <div className='alert alert-success'>Product added successfully.</div>
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
                                Add Product:
                            </h4>
                            <Link to="/seller/profile" className='btn btn-info'>Go Back</Link>
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
                        <form className='shadow-lg p-5 w-75'>
                            <div className='form-floating'>
                                <input type='text' className='form-control' id='product_name' onChange={handleChange('product_name')} value={product_name} placeholder="Product Name" />
                                <label htmlFor='product_name'>Product Name</label>
                            </div><br />

                            <div className='form-floating'>
                                <input type={'text'} className='form-control' id='product_price' onChange={handleChange('product_price')} value={product_price} placeholder="Product Price" />
                                <label htmlFor='product_price'>Product Price</label>
                            </div><br />

                            <div className='form-floating'>
                                <input type={'text'} className='form-control ' id='product_description' onChange={handleChange('product_description')} value={product_description} placeholder="Product Description" />
                                <label htmlFor='product_description'>Product Description</label>
                            </div><br />

                            <div className='form-floating'>
                                <input type={'file'} className='form-control' id='product_image' onChange={handleChange('product_image')} placeholder="Product Image" />
                                <label htmlFor='product_image'>Product Image</label>
                            </div><br />

                            <div className='form-floating'>
                                <select id='category' className='form-control ' onChange={handleChange('category')} value={category} placeholder="Category">
                                    <option>Choose Category</option>
                                    {
                                        categories.map((category, i) => {
                                            return <option key={i} value={category._id}>{category.category_name}</option>
                                        })
                                    }
                                </select>
                                <label htmlFor='category'>Category</label>
                            </div><br />

                            <button className='btn btn-info mt-3' onClick={handleSubmit}>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct