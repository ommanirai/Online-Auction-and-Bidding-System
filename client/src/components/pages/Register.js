import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addUser } from '../../api/userAPI'

const Registration = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [photo, setPhoto] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [role, setRole] = useState('')

  const register = e => {
    e.preventDefault()
    addUser(name, email, password, phone, address, role)
      .then(data => {
        if (data.error) {
          setError(data.error)
          setSuccess('')
        }
        else {
          setSuccess("New User Created.")
          setError('')
          setName('')
          setEmail('')
          setPassword('')
          // setPhoto('')
          setPhone('')
          setAddress('')
        }
      })
  }

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }

  const showSuccess = () => {
    if (success) {
      return <div className='alert alert-success'>{success}</div>
    }
  }

  return (
    <>
      <main className="form-signin w-50 m-auto mx-auto p-5  mt-5 shadow-lg">
        {
          showError()
        }
        {
          showSuccess()
        }
        <form>
          <div className='text-center'>
            <i className="bi bi-person-plus fs-1 text-secondary"></i>
            {/* <img className="mb-4" src="./mobile_img/image1.jpg" alt="" width="72" height="57" /> */}
          </div>
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating">
            <input type="text" className="form-control" id="floatingfirstname" placeholder="Username" onChange={e => setName(e.target.value)} value={name} />
            <label htmlFor="floatingfirstname">Username</label>
          </div><br />

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} value={email} />
            {/* <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => return setEmail(e.target.value)} value={email}/> */}
            <label htmlFor="floatingInput">Email</label>
          </div><br />

          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            <label htmlFor="floatingPassword">Password</label>
          </div><br />

          <div className="form-floating">
            <select onChange={e=> setRole(e.target.value)} className="form-control">
              <option>Choose Role</option>
              <option value={1}>Seller</option>
              <option value={0}>Bidder</option>
            </select>
            <label htmlFor="floatingPassword">Register as</label>
          </div><br />

          {/* <div className="form-floating">
            <input type="file" className="form-control" id="floatingPhoto" placeholder="photo" onChange={e => setPhoto(e.target.files[0])} value={photo} />
            <label htmlFor="floatingPhoto">Photo</label>
          </div><br /> */}

          <div className="form-floating">
            <input type="Number" className="form-control" id="floatingPhone" placeholder="Confirm phone" onChange={e => setPhone(e.target.value)} value={phone} />
            <label htmlFor="floatingPhone">Phone</label>
          </div><br />

          <div className="form-floating">
            <input type="bio" className="form-control" id="floatingAddress" placeholder="Bio" onChange={e => setAddress(e.target.value)} value={address} />
            <label htmlFor="floatingAddress">Address</label>
          </div>

          <div className="checkbox mb-3 mt-3">
            <label>
              <input type="checkbox" value="remember-me" /> I accept the terms and conditions.
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary mb-3" type="submit" onClick={register}>Register</button>
          {/* onClick={register(e)} */}

          Already have an account? <Link to="/signin">Sign in</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
        </form>
      </main>
    </>
  )
}

export default Registration