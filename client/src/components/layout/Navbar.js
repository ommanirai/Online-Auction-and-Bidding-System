import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { isAuthenticated, signOut } from '../../api/userAPI'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = isAuthenticated()

    const signout = (e) => {
        e.preventDefault()
        signOut(navigate('/'))
    }
    return (
        <>
            <div className='row bg-dark'>
                <div className='col-md-8 text-center p-3 text-white'>
                    <Link to="/" className="navbar-brand fs-3 fw-bold">Online Auction & Bidding System</Link>
                    <p>A Complete Solution For Managing Online Auctions, Selling Products and Bids</p>
                </div>
                <div className='col-md-4 d-flex justify-content-evenly mt-4 mb-4'>
                    {/* <Link to="/register"><i className="bi bi-person-plus fs-3 text-white"></i></Link>
                    <Link to="/signin"><i className="bi bi-box-arrow-in-right fs-3 text-white"></i></Link> */}

                    {
                        !user &&
                        <>
                            <Link to="/register"><i className="bi bi-person-plus fs-3 text-white"></i></Link>
                            <Link to="/signin"><i className="bi bi-box-arrow-in-right fs-3 text-white"></i></Link>
                        </>
                    }
                    {
                        user && user.role === 0 &&
                        <>
                            <Link to="/bidder/profile"><i className="bi bi-person-circle  fs-3 text-white"></i>  </Link>
                        </>
                    }
                    {
                        user && user.role === 1 &&
                        <>
                            <Link to="/seller/profile"><i className="bi bi-person-circle  fs-3 text-white"></i>  </Link>
                        </>
                    }
                    {
                        user && user.role === 2 &&
                        <>
                            <Link to="/admin/dashboard"><i className="bi bi-boombox-fill  fs-3 text-white"></i>  </Link>
                        </>
                    }
                    {
                        user &&
                        <Link to="#" onClick={signout}><i className="bi bi-box-arrow-in-left fs-3 text-white"></i></Link>
                    }
                </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-secondary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                                <Link to="/" className="nav-link active text-white fs-5 text-decoration-none" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item ">
                                <Link to={`/products`} className="nav-link active text-white fs-5 text-decoration-none" aria-current="page">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/aboutus" className="nav-link text-white fs-5 text-decoration-none" >About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/faq" className="nav-link text-white fs-5 text-decoration-none">FAQ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link text-white fs-5 text-decoration-none">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar