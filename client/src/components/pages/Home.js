import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* <div className='text-center fs-1 text-primary'>
        Home Page.
      </div> */}
      <div className='row bg-light p-5'>
        <div className='row col-md-2'></div>
        <div className='row col-md-8 text-center'>
          <h1 className="text-primary p-3 fs-1">Auction & Bid The Products Online</h1>
          <p className='lead fs-3 mb-3'>An online auction is an auction which is held over the internet. Online auctions come in many different formats, but most popularly they are ascending English auctions, descending Dutch auctions, first-price scaled-bid, Vickrey auctions, or sometimes even a combination of multiple auctions, taking elements of one and forging them with another.</p>
          <p className="lead fs-3">An online auction is similar to regular live auctions except that it is conducted entirely over the internet. In effect, the software system is taking the place of the auctioneer in controlling the bidding and closing of the lots being sold.</p>
          <p>
            <Link to="/register" className="btn btn-lg btn-primary mx-2 my-4">Auction Your Products</Link>
            <Link to="/register" className="btn btn-lg btn-secondary mx-2 my-4">Bid Products</Link>
          </p>
        </div>
        <div className='row col-md-2'></div>
      </div>
    </>
  )
}

export default Home