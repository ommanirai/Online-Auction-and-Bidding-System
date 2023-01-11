import { CATEGORYAPI } from "../config"

export const getCategories = () => {
    return fetch(`${CATEGORYAPI}/viewCategory`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


export const addCategory = (category_name) => {
    return fetch(`${CATEGORYAPI}/addcategory`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ category_name })

    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const getCategory = (id) => {
    return fetch(`${CATEGORYAPI}/findcategory/${id}`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}


// update category
export const updateCategory = (id, new_category) => {
    return fetch(`${CATEGORYAPI}/updatecategory/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ new_category })

    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

// delete category
export const deletesCategory = (id) => {
    return fetch(`${CATEGORYAPI}/deletecategory/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}