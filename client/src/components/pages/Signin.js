import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, isAuthenticated, signIn } from '../../api/userAPI'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = isAuthenticated()

  const handleSignin = (e) => {
    e.preventDefault()
    setSuccess(false)
    setError('')
    signIn(email, password)
      .then(data => {
        if (data.error) {
          setError(data.error)
          // setSuccess(false)
        }
        else {
          setSuccess(true)
          // setError('')
          authenticate(data)
        }
      })
      .catch(error => console.log(error))
  }

  const showError = () => {
    if (error) {
      return <div className='alert alert-danger'>{error}</div>
    }
  }

  const redirect = () => {
    if (success) {
      if (user && user.role === 2) {
        return navigate('/admin/dashboard')
      }
      else if (user && user.role === 1) {
        return navigate('/seller/profile')
      }
      else {
        return navigate('/bidder/profile')
      }
    }
  }
  return (
    <>
      <main className="form-signin w-50 m-auto mx-auto p-5  mt-5 shadow-lg">
        <form>
          {
            showError()
          }
          {
            redirect()
          }
          <div className='text-center'>
            <i className="bi bi-box-arrow-in-right fs-1 text-secondary"></i>
          </div>
          <h1 className="h3 mb-3 fw-normal">Signin</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} value={email} />
            <label htmlFor="floatingInput">Email</label>
          </div><br />
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3 mt-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSignin}>Sign in</button>
          <div className='d-flex justify-content-between my-3'>
            <Link to='/forgetpassword'>Forgot Password</Link>
            <Link to='/resendverification'>Resend verification Link</Link>
          </div>
          Do not have an account? <Link to="/register">Register Here</Link>

          <p className="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
        </form>
      </main>
    </>
  )
}

export default Signin