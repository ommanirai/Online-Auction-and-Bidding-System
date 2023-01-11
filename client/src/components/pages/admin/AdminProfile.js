import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { detailOfUser } from '../../../api/userAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const AdminProfile = () => {
    const [detailofuser, setDetailofuser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        detailOfUser(id)
            .then(data => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setDetailofuser(data)
                }
            })
    }, [id])
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
                                Your Profile:
                            </h4>
                            <Link to="/admin/dashboard" className='btn btn-primary'>Go Back</Link>
                        </div>

                        <div className='w-75'>
                            <hr className='my-2' />
                        </div>
                        <div className='admin-details mx-auto'>
                            <h5 className='mb-2'>Email: {detailofuser.email} </h5>
                            <h5 className='mb-2'>Username: {detailofuser.name}</h5>
                            <h5 className='mb-2'>Phone: {detailofuser.phone}</h5>
                            <h5 className='mb-2'>Address: {detailofuser.address}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfile