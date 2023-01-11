import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from 'react'
import Home from "./components/pages/Home"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import About from "./components/pages/About"
import Faq from "./components/pages/Faq"
import Contact from "./components/pages/Contact"
import Register from "./components/pages/Register"
import Signin from "./components/pages/Signin"
import AdminDashboard from "../src/components/pages/admin/AdminDashboard"
import SellerProfile from "./components/pages/seller/SellerProfile"
import BidderProfile from "./components/pages/bidder/BidderProfile"
import AdminProfile from "./components/pages/admin/AdminProfile"
import EditAdminProfile from "./components/pages/admin/EditAdminProfile"
import ChangeAdminPassword from "./components/pages/admin/ChangeAdminPassword"
import ChangeSellerPassword from "./components/pages/seller/ChangeSellerPassword"
import EditSellerProfile from "./components/pages/seller/EditSellerProfile"
import AddProduct from "./components/pages/seller/AddProduct"
import ViewProduct from "./components/pages/seller/ViewProduct"
import ProductInBid from "./components/pages/seller/ProductInBid"
import ViewBidder from "./components/pages/seller/ViewBidder"
import EditBidderProfile from "./components/pages/bidder/EditBidderProfile"
import ChangeBidderPassword from "./components/pages/bidder/ChangeBidderPassword"
import ViewProducts from "./components/pages/bidder/ViewProducts"
import BidProducts from "./components/pages/bidder/BidProducts"
import SellerView from "./components/pages/admin/SellerView"
import BidderView from "./components/pages/admin/BidderView"
import ProductView from "./components/pages/admin/ProductView"
import Seller from "./components/pages/seller/Seller"
import Bidder from "./components/pages/bidder/Bidder"
import SellerDetails from "./components/pages/admin/SellerDetails"
import DeleteSeller from "./components/pages/admin/DeleteSeller"
import BidderDetails from "./components/pages/admin/BidderDetails"
import DeleteBidder from "./components/pages/admin/DeleteBidder"
import AddCategory from "./components/pages/admin/AddCategory"
import ViewCategory from "./components/pages/admin/ViewCategory"
import EditCategory from "./components/pages/admin/EditCategory"
import DeleteCategory from "./components/pages/admin/DeleteCategory"
import EditProduct from "./components/pages/seller/EditProduct"
import DeleteProduct from "./components/pages/seller/DeleteProduct"
import ConfirmEmail from "./components/pages/ConfirmEmail"
import ForgetPassword from "./components/pages/ForgetPassword"
import ResetPassword from "./components/pages/ResetPassword"
import ResendVerification from "./components/pages/ResendVerification"
import Products from "./components/pages/Products"
import ProcessBidding from "./components/pages/seller/ProcessBidding"
import DeleteProductByAdmin from "./components/pages/admin/DeleteProductByAdmin"
import BiddingProducts from "./components/pages/bidder/BiddingProducts"
import BidderwinningProducts from "./components/pages/bidder/BidderWinningProducts"
import BidderProductInBid from "./components/pages/bidder/BidderProductInBid"
import BidderViewBidder from "./components/pages/bidder/BidderViewBidder"

const MyRoute = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aboutus" element={<About />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/products" element={<Products />} />

                    <Route path="/confirmuser/:token" element={<ConfirmEmail />} />
                    <Route path="/forgetpassword" element={<ForgetPassword />} />
                    <Route path="/resetPassword/:token" element={<ResetPassword />} />
                    <Route path="/resendverification" element={<ResendVerification />} />

                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/profile/:id" element={<AdminProfile />} />
                    <Route path="/admin/editprofile/:id" element={<EditAdminProfile />} />
                    <Route path="/admin/changepassword/:id" element={<ChangeAdminPassword />} />
                    <Route path="/admin/listofseller" element={<SellerView />} />
                    <Route path="/admin/listofbidder" element={<BidderView />} />
                    <Route path="/admin/products" element={<ProductView />} />
                    <Route path="/admin/sellerdetails/:id" element={<SellerDetails />} />
                    <Route path="/admin/deleteseller/:id" element={<DeleteSeller />} />
                    <Route path="/admin/bidderdetails/:id" element={<BidderDetails />} />
                    <Route path="/admin/deletebidder/:id" element={<DeleteBidder />} />
                    <Route path="/admin/addcategory" element={<AddCategory />} />
                    <Route path="/admin/viewcategory" element={<ViewCategory />} />
                    <Route path="/admin/editcategory/:id" element={<EditCategory />} />
                    <Route path="/admin/deletecategory/:id" element={<DeleteCategory />} />
                    <Route path="/admin/deleteproduct/:id" element={<DeleteProductByAdmin />} />

                    <Route path="/seller/profile" element={<Seller />} />
                    <Route path="/seller/profile/:id" element={<SellerProfile />} />
                    <Route path="/seller/changepassword/:id" element={<ChangeSellerPassword />} />
                    <Route path="/seller/editprofile/:id" element={<EditSellerProfile />} />
                    <Route path="/seller/addproduct" element={<AddProduct />} />
                    <Route path="/seller/viewproduct" element={<ViewProduct />} />
                    <Route path="/seller/productinbid" element={<ProductInBid />} />
                    <Route path="/seller/goforbidding/:id" element={<ProcessBidding />} />
                    <Route path="/seller/viewbidder/:id" element={<ViewBidder />} />
                    <Route path="/seller/updateproduct/:id" element={<EditProduct />} />
                    <Route path="/seller/deleteproduct/:id" element={<DeleteProduct />} />

                    <Route path="/bidder/profile" element={<Bidder />} />
                    <Route path="/bidder/profile/:id" element={<BidderProfile />} />
                    <Route path="/bidder/updateprofile/:id" element={<EditBidderProfile />} />
                    <Route path="/bidder/updatepassword/:id" element={<ChangeBidderPassword />} />
                    <Route path="/bidder/viewproducts" element={<ViewProducts />} />
                    <Route path="/bidder/bidproduct/:id" element={<BidProducts />} />
                    <Route path="/bidder/biddingproducts" element={<BiddingProducts />} />
                    <Route path="/bidder/winningproducts" element={<BidderwinningProducts />} />
                    <Route path="bidder/productinbid" element={<BidderProductInBid/>}/>
                    <Route path="/bidder/viewbidder/:id" element={<BidderViewBidder/>}/>

                </Routes>
                <Footer />
            </Router>
        </>
    )
}

export default MyRoute