import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../api/userAPI'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { token } = useParams()

    const resetPasswordSubmit = (e) => {
        setError('')
        setSuccess('')
        e.preventDefault() // to prevent from the continuous submit action of button
        resetPassword(token, password)
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
                    <label htmlFor='password'>New Password</label>
                    <input type={'password'} id='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='btn btn-primary mt-2 form-control' onClick={resetPasswordSubmit}>Confirm Reset Password</button>
                </form>
            }
        </>
    )
}

export default ResetPassword