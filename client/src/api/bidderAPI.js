import { BIDDERAPI, SELLERAPI } from "../config"

// bid the product
export const bidProducts = (product_image, product_name, product_price, product_description, bidder, bidder_price, product_id) => {
    const product = { product_image, product_name, product_price, product_description, bidder, bidder_price, product_id }
    return fetch(`${BIDDERAPI}/bidproduct`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

// view only bidder products
export const viewBidderProducts = id => {
    return fetch(`${BIDDERAPI}/viewbidderproducts/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// view bidders
export const viewBidders = id => {
    return fetch(`${BIDDERAPI}/seller/viewbidder/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// find maximum price
export const maximumPrice = id => {
    return fetch(`http://localhost:5000/api/bidder/findmaxprice/${id}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}