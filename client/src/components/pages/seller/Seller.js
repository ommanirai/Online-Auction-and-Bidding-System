import React from 'react'
import SellerSidebar from '../../layout/SellerSidebar'

const Seller = () => {
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row ms-0'>
                    <div className='col-md-3 ps-0'>
                        <SellerSidebar />
                    </div>
                    <div className='col-md-9 pt-5'>
                        {/* <div className='d-flex justify-content-between w-75'> */}
                            <h4>
                                Welcome to Seller Section
                            </h4>
                            {/* <Link to="/seller/profile" className='btn btn-info'>Go Back</Link> */}
                        {/* </div> */}
                        {/* <div className='w-75'>
                            <hr className='my-2' />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Seller