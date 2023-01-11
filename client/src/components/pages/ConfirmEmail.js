import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { confirmUser } from '../../api/userAPI'

const ConfirmEmail = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // const params =useParams()
    // const token = params.token

    const { token } = useParams()

    useEffect(() => {
        confirmUser(token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess(data.message)
                    setError('')
                }
            })
    }, [ token, success, error ])
    // token change, success change, error change vayo vane page reload huna paryo

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
        </>
    )
}

export default ConfirmEmail