const express = require("express")
const { registerUser, confirmUser, resendConfirmation, forgetPassword, resetPassword, changePassword, signin, userList, userDetails, updateUser, deleteUser } = require("../controllers/userController")
const { userCheck, validation, resetPasswordCheck, changePasswordCheck, updateUserCheck } = require("../validation")
const router = express.Router()


router.post("/register", userCheck, validation, registerUser)
router.get('/confirmuser/:token', confirmUser)
router.post('/resendverification', resendConfirmation)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword', resetPasswordCheck, validation, resetPassword)
router.post('/changepassword/:id', changePasswordCheck, validation, changePassword)
router.post('/signin', signin)
router.get('/userlist', userList)
router.get('/userdetails/:id', userDetails)
router.put('/updateuser/:id', updateUserCheck, validation, updateUser)
router.delete('/deleteuser/:id', deleteUser)

module.exports = router