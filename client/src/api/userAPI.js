import { API } from "../config"

// Register User
export const addUser = (name, email, password, phone, address, role) => {
    const user = { name, email, password, phone, address ,role } // object form ma
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // req.body
        body: JSON.stringify(user)

    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// Confirm Email/User
export const confirmUser = (token) => {
    return fetch(`${API}/confirmuser/${token}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// Forget Password
export const forgetPassword = (email) => {
    return fetch(`${API}/forgetpassword`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// Reset Password
export const resetPassword = (token, password) => {
    return fetch(`${API}/resetpassword/${token}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })

    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// Change Password
export const updatePassword = (id, password, new_password) => {
    const password_then = { password, new_password }
    return fetch(`${API}/changepassword/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(password_then)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// Sign In
export const signIn = (email, password) => {
    const user = { email, password }
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// Authenticate
export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}

// to check if logged in or not
export const isAuthenticated = () => {
    return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false
}

// Sign Out
export const signOut = (callback) => {
    localStorage.removeItem('jwt')
    callback()
}

// Resend Verification
export const resendVerification = (email) => {
    return fetch(`${API}/resendverification`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify({ email })
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// User List
export const userList = () => {
    return fetch(`${API}/userlist`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// User Details
export const detailOfUser = (id) => {
    return fetch(`${API}/userdetails/${id}`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// Make Admin
export const makeAdmin = (id, role) => {
    const user = { role: role }
    return fetch(`${API}/updateuser/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// to update user
export const editUser = (id, name, phone, address) => {
    const user = { name, phone, address }
    return fetch(`${API}/updateuser/${id}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// to delete user
export const deleteUser = (id) => {
    return fetch(`${API}/deleteuser/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}