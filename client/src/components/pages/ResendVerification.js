import React, { useState } from 'react'
import { resendVerification } from '../../api/userAPI'

const ResendVerification = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const resendVerificationSubmit = (e) => {
        setError('')
        setSuccess('')
        e.preventDefault() // to prevent from the continuous submit action of button
        resendVerification(email)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
                else {
                    setSuccess(data.message)
                }
            })
            .catch(err => console.log(err))
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
            {showError()}
            {showSuccess()}
            {
                !success &&
                <form className='w-50 my-5 p-5 mx-auto shadow-lg'>
                    <label htmlFor='text'>Email</label>
                    <input type={'email'} id='email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
                    <button className='btn btn-primary mt-2 form-control' onClick={resendVerificationSubmit}>Resend Verification Link</button>
                </form>
            }
        </>
    )
}

export default ResendVerification