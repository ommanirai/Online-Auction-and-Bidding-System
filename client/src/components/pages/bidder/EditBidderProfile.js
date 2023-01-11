import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { detailOfUser, editUser } from '../../../api/userAPI'
import BidderSidebar from '../../layout/BidderSidebar'

const EditBidderProfile = () => {
    // const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const [user, setUser] = useState({})

    const { id } = useParams()

    const editProfile = (e) => {
        e.preventDefault()
        editUser(id, name, phone, address)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess('User Updated Successfully.')
                }
            })
    }

    useEffect(() => {
        detailOfUser(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setUser(data)
                }
            })
    })

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
                        <BidderSidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='w-75 my-3'>
                        </div>
                        <div className='d-flex justify-content-between pt-5 w-75'>
                            <h4>
                                Update Profile:
                            </h4>
                            <Link to="/bidder/profile" className='btn btn-info'>Go Back</Link>
                        </div>
                        <div className='w-75'>
                            <hr className='my-2' />
                        </div>

                        <div className='w-75 pt-3'>
                            {/* <img src={`${IMAGE}/${user.photo}`} style={{ height: "200px" }} /> */}
                            <div className='admin-details mx-auto'>
                                <h5>Email: {user.email}</h5>
                                <h5>Username: {user.name}</h5>
                                <h5>Phone Number: {user.phone}</h5>
                                <h5>Address: {user.address}</h5>
                            </div>
                        </div>

                        <div className='w-75'>
                            <hr className='my-5' />
                            {
                                showError()
                            }
                            {
                                showSuccess()
                            }
                        </div>
                        {
                            !success &&
                            <form className='shadow-lg p-5 w-75'>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingemail" placeholder="Username" value={user.email} disabled />
                                    <label htmlFor="floatingemail">Email</label>
                                </div><br />

                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingusername" placeholder="Username" onChange={e => setName(e.target.value)} value={name} />
                                    <label htmlFor="floatingusername">Username</label>
                                </div><br />

                                <div className="form-floating">
                                    <input type="number" className="form-control" id="floatingphone" placeholder="Phone" onChange={e => setPhone(e.target.value)} value={phone} />
                                    <label htmlFor="floatingphone">Phone</label>
                                </div><br />

                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingaddress" placeholder="Address" onChange={e => setAddress(e.target.value)} value={address} />
                                    <label htmlFor="floatingaddress">Address</label>
                                </div><br />

                                <button className="w-100 btn btn-lg btn-info mb-3" type="submit" onClick={editProfile}>Edit Profile</button>
                            </form>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBidderProfile