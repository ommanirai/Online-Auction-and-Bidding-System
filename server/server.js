// use "type": "module" in package.json to use import method
// import express from 'express'
// import mongoose from 'mongoose';

const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const morgan = require('morgan')
// const dotenv = require("dotenv").config()
const bodyParser = require("body-parser") // any information that comes from the body of the frontend/ frontend request to the backend right the body parser helps us pass that information or that data and convert it to an object that we can easilly access in the backend
const cors = require("cors") // to connect backend and frontend
const cookieParser = require('cookie-parser')

const userRoute = require("./routes/userRoute")
const bidderRoute = require("./routes/bidderRoute")
const categoryRoute = require("./routes/categoryRoute")
const productRoute = require("./routes/productRoute")

const port = process.env.PORT || 8000
const app = express()


// Connect to DB and start server
// await mongoose
// .connect(
//     "mongodb+srv://user:user1234@cluster0.uqvkhti.mongodb.net/mydatabase?retryWrites=true&w=majority"
// );
// console.log('mongoDB connection is successfull')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('mongoDB connection is successfull'))
    .catch((err) => console.error(err))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

// Routes Middleware
app.use("/api/user", userRoute)
app.use("/api/bidder", bidderRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

app.use('/public/uploads', express.static('public/uploads'))


app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})