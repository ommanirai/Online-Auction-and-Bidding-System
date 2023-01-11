import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategory, updateCategory } from '../../../api/categoryAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const EditCategory = () => {
    const [old_category, setOldCategory] = useState('')
    const [new_category, setNewCategory] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { id } = useParams()


    useEffect(() => {
        getCategory(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setOldCategory(data.category_name)
                }
            })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        updateCategory(id, new_category)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess('Category Edited Successfully')
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
                                Update Category:
                            </h4>
                            <Link to="/admin/viewcategory" className='btn btn-primary'>Go Back</Link>
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
                                <input type={'text'} className='form-control' id='product_name' value={old_category}  placeholder='Old Category Name' disabled />
                                <label htmlFor='product_name'>Old Category Name</label>
                            </div><br />
                            <div className='form-floating'>
                                <input type={'text'} className='form-control' id='product_name' onChange={e => setNewCategory(e.target.value)} value={new_category} placeholder="New Category Name"/>
                                <label htmlFor='product_name'>New Category Name</label>
                            </div><br />
                            <button className='btn btn-primary mt-3' onClick={handleSubmit} >Edit Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCategory