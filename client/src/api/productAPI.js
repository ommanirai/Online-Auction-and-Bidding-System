import { PRODUCTAPI } from "../config"

// to view products
export const getProducts = () => {
    return fetch(`${PRODUCTAPI}/viewproducts`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// to find the product details
export const productDetails = (id) => {
    return fetch(`${PRODUCTAPI}/productdetails/${id}`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// to add product
export const addProduct = (product) => {
    // console.log(product)
    return fetch(`${PRODUCTAPI}/addproduct`, {
        method: "POST",
        headers: {
            Accept: "application/json", // formData vako le Content-Type dina pardaina
        },
        body: product
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// to delete product
export const deleteProduct = (id, token) => {
    return fetch(`${PRODUCTAPI}/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(error => console.log(error))

}

// to edit product
export const editProduct = (id, product, token) => {
    return fetch(`${PRODUCTAPI}/updateproduct/${id}`, {
        method: "PUT",
        headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// to get filtered products
export const getFilteredProducts = (sortBy, order, limit, skip, filter) => {
    return fetch(`${PRODUCTAPI}/filteredProduct?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filter)
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// get related products
export const getRelatedProducts = id => {
    return fetch(`${PRODUCTAPI}/relatedProducts/${id}`, {

        method: "GET"
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

// go for bidding
export const goForBidding = id => {
    return fetch(`${PRODUCTAPI}/goforbidding/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// view only user products
export const viewMyProducts = id => {
    return fetch(`${PRODUCTAPI}/viewmyproducts/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}
