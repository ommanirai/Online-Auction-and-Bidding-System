import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../../api/categoryAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const ViewCategory = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategory(data)
                }
            })
    },[])
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
                                View Category:
                            </h4>
                            <Link to="/admin/dashboard" className='btn btn-primary'>Go Back</Link>
                        </div>

                        <div className='w-75'>
                            <hr className='mt-2 mb-4' />
                        </div>
                        <div className='container my-3 w-75'>
                            {
                                category.length > 0 ?
                                    <table className='table table-bordered table-hover text-center'>
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Category Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                category.map((category, i) => {
                                                    return <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{category.category_name}</td>
                                                        <td>
                                                            <div className='btn-group'>
                                                                <Link to={`/admin/editcategory/${category._id}`} className='btn btn-warning'><i className='bi bi-pencil-square' /></Link>

                                                                <Link to={`/admin/deletecategory/${category._id}`} className='btn btn-danger'><i className='bi bi-trash' /></Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className='alert alert-secondary fs-4'>There is no category available</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewCategory