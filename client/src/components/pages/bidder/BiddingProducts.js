import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { viewBidderProducts } from '../../../api/bidderAPI'
import { isAuthenticated } from '../../../api/userAPI'
import { IMAGE } from '../../../config'
import BidderSidebar from '../../layout/BidderSidebar'

const BiddingProducts = () => {
  const [products, setProducts] = useState([])
  const { user } = isAuthenticated() 

  useEffect(() => {
    viewBidderProducts(user._id)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setProducts(data)
        }
      })
  })
  return (
    <>
      <div className='container-fluid p-0'>
        <div className='row ms-0'>
          <div className='col-md-2 ps-0'>
            <BidderSidebar />
          </div>
          <div className='col-md-10 pt-5'>
            <div className='d-flex justify-content-between w-75'>
              <h4>
                Your Bidding Products:
              </h4>
              <Link to="/bidder/profile" className='btn btn-info'>Go Back</Link>
            </div>
            <div className='w-75'>
              <hr className='mt-2 mb-4' />
            </div>
            <div className='w-100 pe-5'>
              {
                products.length > 0 ?
                  <table className='table table-hover table-bordered text-center'>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Product Image</th>
                        <th>Product name</th>
                        <th>Product Price</th>
                        <th>Your Price</th>
                        <th>Product Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map((product, i) => {
                          return <tr>
                            <td>{i + 1}</td>
                            <td>
                              <img src={`${IMAGE}/${product.product_image}`} alt={product.product_name} style={{ height: "100px" }} />
                            </td>
                            <td >{product.product_name}</td>
                            <td>{product.product_price}</td>
                            <td>{product.bidder_price}</td>
                            <td>{product.product_description}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                  :
                  <div className='alert alert-secondary fs-5'>You Didn't bid the products.</div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BiddingProducts