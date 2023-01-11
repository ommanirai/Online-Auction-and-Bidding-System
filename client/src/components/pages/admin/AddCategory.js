import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addCategory } from '../../../api/categoryAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const AddCategory = () => {
    const [category_name, setCategory] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addCategory(category_name)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess('Category Successfully added')
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
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9 pt-5'>
                        <div className='d-flex justify-content-between w-75'>
                            <h4>
                                Add Category:
                            </h4>
                            <Link to="/admin/dashboard" className='btn btn-primary'>Go Back</Link>
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
                                <input type={'text'} className='form-control' id='product_name' onChange={e => setCategory(e.target.value)} value={category_name} placeholder="Category Name" />
                                <label htmlFor='product_name'>Category Name</label>
                            </div>
                            <button className='btn btn-primary mt-3' onClick={handleSubmit} >Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory