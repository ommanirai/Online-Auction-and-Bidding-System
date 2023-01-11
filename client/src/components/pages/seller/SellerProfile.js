import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { detailOfUser } from '../../../api/userAPI'
import SellerSidebar from '../../layout/SellerSidebar'

const SellerProfile = () => {
  const [user, setUser] = useState({})
  // const { user } = isAuthenticated()
  const { id } = useParams()

  useEffect(() => {
    detailOfUser(id)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        setUser(data)
      })

  }, [id])
  return (
    <>
      <div className='container-fluid p-0'>
        <div className='row ms-0'>
          <div className='col-md-3 ps-0'>
            <SellerSidebar />
          </div>
          <div className='col-md-9 pt-5'>
            <div className='d-flex justify-content-between w-75'>
              <h4>
                Your Profile:
              </h4>
              <Link to="/seller/profile" className='btn btn-info'>Go Back</Link>
            </div>

            <div className='w-75'>
              <hr className='my-2' />
            </div>
            <div className='admin-details mx-auto'>
              <h5 className='mb-2'>Email: {user.email} </h5>
              <h5 className='mb-2'>Username: {user.name}</h5>
              <h5 className='mb-2'>Phone: {user.phone}</h5>
              <h5 className='mb-2'>Address: {user.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellerProfile