import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteUser, detailOfUser } from '../../../api/userAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const DeleteBidder = () => {
    const [bidder, setBidder] = useState({})
    const { id } = useParams()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        detailOfUser(id)
            .then(data => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    setSuccess('')
                }
                else {
                    setBidder(data)
                    setError('')
                }
            })
    }, [])

    const deleteSeller = (e) => {
        e.preventDefault()
        deleteUser(id)
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
                                Delete Bidder:
                            </h4>
                            <Link to="/admin/listofbidder" className='btn btn-primary'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='mt-1 mb-4' />
                        {showError()}
                        {showSuccess()}
                        </div>
                        <div className='admin-details mx-auto'>
                            <h5 className='mb-2'>Email: {bidder.email} </h5>
                            <h5 className='mb-2'>Username: {bidder.name}</h5>
                            <h5 className='mb-2'>Phone: {bidder.phone}</h5>
                            <h5 className='mb-2'>Address: {bidder.address}</h5>
                        </div>
                        {
                            !success &&
                            <>
                                <h4>Are you sure you want to delete this seller?</h4>
                                <button className='btn btn-danger mt-3' onClick={deleteSeller}>Delete seller</button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteBidder