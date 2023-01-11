import React from 'react'
import AdminSidebar from '../../layout/AdminSidebar'

const AdminDashboard = () => {
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row ms-0'>
                    <div className='col-md-6 ps-0'>
                        <AdminSidebar />
                    </div>
                    <div className='col-md-6 pt-5 fs-3 text-primary'>
                        Welcome to Admin Dashboard.
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard