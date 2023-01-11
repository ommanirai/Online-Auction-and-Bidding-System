import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { updatePassword } from '../../../api/userAPI'
import AdminSidebar from '../../layout/AdminSidebar'

const ChangeAdminPassword = () => {
    const [password, setPassword] = useState('')
    const [new_password, setNewpassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const { id } = useParams()

    const passwordUpdate = (e) => {
        e.preventDefault()
        updatePassword(id, password, new_password)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess(data.message)
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
                                Change Password:
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
                                <input type={'password'} id='password' className='form-control' onChange={e => setPassword(e.target.value)} value={password} placeholder="Old Password"/>
                                <label htmlFor='password'>Old Password</label>
                                </div><br/>

                                <div className='form-floating'>
                                <input type={'password'} id='newpassword' className='form-control' onChange={e => setNewpassword(e.target.value)} value={new_password} placeholder="New Password" />
                                <label htmlFor='newpassword'>New Password</label>
                                </div><br/>

                                <button className='btn btn-primary mt-2' onClick={passwordUpdate}>Update Password</button>
                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeAdminPassword