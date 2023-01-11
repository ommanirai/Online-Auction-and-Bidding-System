import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signOut } from '../../api/userAPI'

const SellerSidebar = () => {
    const { user } = isAuthenticated()
    const navigate = useNavigate()

    const signout = (e) => {
        e.preventDefault()
        signOut(navigate('/'))
    }


    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ "width": "280px", "minHeight": "60vh" }} >
                <Link to="/seller/profile" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <i className='bi bi-speedometer2 me-3 fs-5' />
                    <span className="fs-4">Seller Profile</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item fs-5">
                        <Link to="/seller/addproduct" className="nav-link text-white" aria-current="page">
                            <i className="bi bi-house me-3" />
                            Add Product
                        </Link>
                    </li>
                    <li className="nav-item fs-5">
                        <Link to="/seller/viewproduct" className="nav-link text-white" aria-current="page">
                            <i className="bi bi-house me-3" />
                            Your Product
                        </Link>
                    </li>
                    <li className="nav-item fs-5">
                        <Link to="/seller/productinbid " className="nav-link text-white" aria-current="page">
                            <i className="bi bi-house me-3" />
                            Product in Bid
                        </Link>
                    </li>
                    {/* <li className="nav-item fs-5">
                        <Link to="/seller/viewbidder" className="nav-link text-white" aria-current="page">
                            <i className="bi bi-house me-3" />
                            Bidder
                        </Link>
                    </li> */}
                </ul>
                <hr />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>{user.name}</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to={`/seller/profile/${user._id}`}>Profile</Link></li>
                        <li><Link className="dropdown-item" to={`/seller/editprofile/${user._id}`}>Update Profile</Link></li>
                        <li><Link className="dropdown-item" to={`/seller/changepassword/${user._id}`}>Change Password</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#" onClick={signout}>Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SellerSidebar