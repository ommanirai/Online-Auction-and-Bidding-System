import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signOut } from '../../api/userAPI'

const AdminSidebar = () => {
    const { user } = isAuthenticated()
    const navigate = useNavigate()

    const signout = (e) => {
        e.preventDefault()
        signOut(navigate('/'))
    }
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ "width": "280px", "minHeight": "60vh" }} >
                <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <i className='bi bi-speedometer2 me-3 fs-4' />
                    <span className="fs-4">Admin Dashboard</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-white" aria-current="page">
                            <i className="bi bi-house me-3 fs-4" />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/listofseller" className="nav-link text-white"><i className='bi bi-person-circle me-3 fs-4' />
                            Seller List
                        </Link>

                    </li>
                    <li>
                        <Link to="/admin/listofbidder" className="nav-link text-white">
                            <i className='bi bi-person-circle me-3 fs-4' />
                            Bidder List
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/addcategory" className="nav-link text-white">
                            <i className='bi bi-table me-3 fs-4' />
                            Add Category
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/viewcategory" className="nav-link text-white">
                            <i className='bi bi-table me-3 fs-4' />
                            View Category
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className="nav-link text-white">
                            <i className='bi bi-table me-3 fs-4' />
                            Products
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>{user.name}</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to={`/admin/profile/${user._id}`}>Profile</Link></li>
                        <li><Link className="dropdown-item" to={`/admin/editprofile/${user._id}`}>Edit Profile</Link></li>
                        <li><Link className="dropdown-item" to={`/admin/changepassword/${user._id}`}>Change Password</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#" onClick={signout}>Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar