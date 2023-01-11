import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className="container-fluid">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
            <li className="nav-item"><Link to="/products" className="nav-link px-2 text-muted">Products</Link></li>
            <li className="nav-item"><Link to="/aboutus" className="nav-link px-2 text-muted">About</Link></li>
            <li className="nav-item"><Link to="/faq" className="nav-link px-2 text-muted">FAQ</Link></li>
            <li className="nav-item"><Link to="contact" className="nav-link px-2 text-muted">Contact</Link></li>
          </ul>
          <p className="text-center text-muted">&copy; 2022 Online Auction System</p>
        </footer>
      </div>
    </>
  )
}

export default Footer