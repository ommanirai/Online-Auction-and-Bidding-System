import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deletesCategory, getCategory } from '../../../api/categoryAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const DeleteCategory = () => {
    const [category, setCategory] = useState('')
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
                    setCategory(data.category_name)
                }
            })
    })

    const deleteCategory = (e) =>{
        e.preventDefault()
        deletesCategory(id)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
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
                                Delete Category:
                            </h4>
                            <Link to="/admin/viewcategory" className='btn btn-primary'>Go Back</Link>
                        </div>

                        <div className='w-75'>
                            <hr className='mt-1 mb-4' />
                            {showError()}
                            {showSuccess()}
                        </div>

                        <div className='category-details mx-auto'>
                            <h5>Category Name: {category}</h5>
                        </div>
                        {
                            !success &&
                            <>
                                <p className='fs-5 mt-3'>Are you sure you want to delete this category?</p>
                                <button className='btn btn-danger' onClick={deleteCategory}>Delete Category</button>
                            </>
                        }



                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteCategory